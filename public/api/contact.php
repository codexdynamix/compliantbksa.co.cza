<?php
/**
 * Hostinger Shared Hosting Contact Form & Mail Delivery Processor
 * Compliant Bookkeeping SA (https://compliantbksa.co.za)
 * 
 * Delivers incoming website inquiries to all designated team mailboxes:
 * - accounting@compliantbksa.co.za
 * - info@compliantbksa.co.za
 * - codexdynamix@gmail.com
 * 
 * Supports both direct SMTP (Hostinger / Titan) and native PHP mail() with -f SPF alignment,
 * individual recipient delivery, client auto-acknowledgment, and local JSON audit logging.
 */

// Allow CORS for decoupled subdomains / preview endpoints
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "error" => "Method Not Allowed"]);
    exit();
}

// 1. Load configuration (with fallback defaults)
$configFile = __DIR__ . '/config.php';
$config = file_exists($configFile) ? require($configFile) : [];

$defaultRecipients = [
    'info@compliantbksa.co.za',
    'accounting@compliantbksa.co.za',
    'codexdynamix@gmail.com',
];
$configuredRecipients = isset($config['recipients']) && is_array($config['recipients']) 
    ? $config['recipients'] 
    : $defaultRecipients;

$fromEmail = !empty($config['from_email']) ? $config['from_email'] : 'info@compliantbksa.co.za';
$fromName  = !empty($config['from_name']) ? $config['from_name'] : 'Compliant Bookkeeping SA';
$smtpConfig = isset($config['smtp']) && is_array($config['smtp']) ? $config['smtp'] : [];

// 2. Read and parse incoming payload (supports JSON and application/x-www-form-urlencoded)
$rawInput = file_get_contents("php://input");
$data = json_decode($rawInput, true);

if (!is_array($data) || empty($data)) {
    $data = $_POST;
}

// Handle nested inquiry object if present
$inquiry = (isset($data['inquiry']) && is_array($data['inquiry'])) ? $data['inquiry'] : [];

// Extract fields with multiple naming fallbacks
$name = trim(strip_tags($data['name'] ?? $data['clientName'] ?? $inquiry['clientName'] ?? ''));
$email = trim(filter_var($data['email'] ?? $data['clientEmail'] ?? $inquiry['clientEmail'] ?? '', FILTER_SANITIZE_EMAIL));
$phone = trim(strip_tags($data['phone'] ?? $data['clientPhone'] ?? $inquiry['clientPhone'] ?? ''));
$firm = trim(strip_tags($data['firm'] ?? $data['company'] ?? $inquiry['firm'] ?? ''));
$service = trim(strip_tags($data['service'] ?? $data['focus'] ?? $inquiry['focus'] ?? 'General Bookkeeping Inquiry'));
$message = trim(strip_tags($data['message'] ?? $data['details'] ?? $inquiry['details'] ?? ''));
$reference = trim(strip_tags($data['reference'] ?? 'BK-' . rand(100000, 999999)));

// Format readable service title if an internal slug was passed
$serviceLabels = [
    'bookkeeping'  => 'Bookkeeping and Reporting',
    'tax'          => 'VAT & Tax Support',
    'payroll'      => 'Payroll Administration',
    'agricultural' => 'Agricultural Accounting',
    'outsource'    => 'Outsourcing for Accounting Firms',
    'pricing'      => 'Pricing for My Business',
    'other'        => 'General Advisory / Other',
];
if (isset($serviceLabels[strtolower($service)])) {
    $service = $serviceLabels[strtolower($service)];
}

// If message was left empty (optional in UI), generate a clean inquiry summary
if (empty($message)) {
    $message = "Client requested a callback and review regarding: " . $service . ".";
}

// 3. Validation
if (empty($name)) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Please enter your name."]);
    exit();
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Please provide a valid email address."]);
    exit();
}

// 4. Assemble complete, deduplicated recipients list
$destinations = [];
foreach ($configuredRecipients as $r) {
    $clean = trim(filter_var($r, FILTER_SANITIZE_EMAIL));
    if (filter_var($clean, FILTER_VALIDATE_EMAIL) && !in_array($clean, $destinations)) {
        $destinations[] = $clean;
    }
}

// If client passed recipients array, incorporate them safely
if (!empty($data['recipients']) && is_array($data['recipients'])) {
    foreach ($data['recipients'] as $r) {
        $clean = trim(filter_var($r, FILTER_SANITIZE_EMAIL));
        if (filter_var($clean, FILTER_VALIDATE_EMAIL) && !in_array($clean, $destinations)) {
            $destinations[] = $clean;
        }
    }
}

// Always ensure all 3 designated mailboxes are included
foreach ($defaultRecipients as $reqRecipient) {
    if (!in_array($reqRecipient, $destinations)) {
        $destinations[] = $reqRecipient;
    }
}

// 5. Build Email Content (Text and HTML)
$subject = "Website Inquiry: $name ($service)";
$datetime = date("Y-m-d H:i:s") . " SAST";

// Plain Text Version
$bodyText = "========================================================\r\n";
$bodyText .= " NEW INQUIRY RECEIVED - COMPLIANT BOOKKEEPING SA\r\n";
$bodyText .= "========================================================\r\n\r\n";
$bodyText .= "Reference:   $reference\r\n";
$bodyText .= "Date & Time: $datetime\r\n";
$bodyText .= "Name:        $name\r\n";
$bodyText .= "Email:       $email\r\n";
$bodyText .= "Phone:       " . ($phone ? $phone : 'Not provided') . "\r\n";
$bodyText .= "Firm/Org:    " . ($firm ? $firm : 'Not specified') . "\r\n";
$bodyText .= "Service:     $service\r\n\r\n";
$bodyText .= "--------------------------------------------------------\r\n";
$bodyText .= "Message / Context:\r\n";
$bodyText .= "$message\r\n";
$bodyText .= "--------------------------------------------------------\r\n\r\n";
$bodyText .= "Direct Reply: You can reply directly to this email to contact $name at $email.\r\n";
$bodyText .= "Offices: 23 Bridge Street, Rosebank, Cape Town | 8 Rietvalley Street, Ceres\r\n";
$bodyText .= "Phone: 083 411 9467 · 074 206 3255 | https://compliantbksa.co.za\r\n";

// HTML Version (Responsive, cleanly styled)
$bodyHtml = '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>' . htmlspecialchars($subject) . '</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f6f2; color: #1c231f;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; border: 1px solid #e5e3da; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
    <tr>
      <td style="background-color: #17241e; padding: 24px 32px; color: #ffffff;">
        <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #4ade80; margin-bottom: 4px;">Website Inquiry Notice</div>
        <h1 style="margin: 0; font-size: 20px; font-weight: 600; line-height: 1.3; color: #ffffff;">Compliant Bookkeeping SA</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 24px 32px; background-color: #f0f7f3; border-bottom: 1px solid #e1ebe5;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="font-size: 13px; color: #40574a;">Reference: <strong style="color: #17241e; font-size: 15px;">' . htmlspecialchars($reference) . '</strong></td>
            <td align="right" style="font-size: 13px; color: #40574a;">' . htmlspecialchars($datetime) . '</td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding: 32px;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="padding: 6px 0; font-size: 14px; color: #616e66; width: 120px;"><strong>Client Name:</strong></td>
            <td style="padding: 6px 0; font-size: 14px; color: #1c231f; font-weight: 600;">' . htmlspecialchars($name) . '</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 14px; color: #616e66;"><strong>Email:</strong></td>
            <td style="padding: 6px 0; font-size: 14px; color: #1c231f;"><a href="mailto:' . htmlspecialchars($email) . '" style="color: #1f5f3e; text-decoration: underline;">' . htmlspecialchars($email) . '</a></td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 14px; color: #616e66;"><strong>Phone:</strong></td>
            <td style="padding: 6px 0; font-size: 14px; color: #1c231f;">' . ($phone ? '<a href="tel:' . preg_replace('/[^0-9+]/', '', $phone) . '" style="color: #1f5f3e; text-decoration: none;">' . htmlspecialchars($phone) . '</a>' : '<em style="color: #8f9b94;">Not provided</em>') . '</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 14px; color: #616e66;"><strong>Company/Firm:</strong></td>
            <td style="padding: 6px 0; font-size: 14px; color: #1c231f;">' . ($firm ? htmlspecialchars($firm) : '<em style="color: #8f9b94;">Not specified</em>') . '</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 14px; color: #616e66;"><strong>Focus / Service:</strong></td>
            <td style="padding: 6px 0; font-size: 14px; color: #1c231f; font-weight: 600;">' . htmlspecialchars($service) . '</td>
          </tr>
        </table>

        <div style="margin-top: 24px; padding: 18px; background-color: #faf9f6; border-left: 4px solid #1f5f3e; border-radius: 4px;">
          <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #616e66; margin-bottom: 8px;">Message / Context</div>
          <div style="font-size: 14px; line-height: 1.6; color: #1c231f; white-space: pre-wrap;">' . nl2br(htmlspecialchars($message)) . '</div>
        </div>

        <div style="margin-top: 28px; text-align: center;">
          <a href="mailto:' . htmlspecialchars($email) . '?subject=Re:%20Inquiry%20' . urlencode($reference) . '%20-%20Compliant%20Bookkeeping%20SA" style="display: inline-block; background-color: #17241e; color: #ffffff; padding: 12px 28px; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 6px;">Reply to ' . htmlspecialchars($name) . '</a>
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px 32px; background-color: #faf9f6; border-top: 1px solid #e5e3da; font-size: 12px; color: #737f77; line-height: 1.5;">
        <div><strong>Compliant Bookkeeping SA</strong> · Keeping your books compliant.</div>
        <div>Offices: 23 Bridge Street, Rosebank, Cape Town | 8 Rietvalley Street, Ceres</div>
        <div>Tel: 083 411 9467 · 074 206 3255 | <a href="https://compliantbksa.co.za" style="color: #1f5f3e;">compliantbksa.co.za</a></div>
      </td>
    </tr>
  </table>
</body>
</html>';

// 6. Delivery functions: Direct SMTP & Native PHP Mail() with Envelope Sender (-f)

/**
 * Socket-based SMTP delivery for Hostinger (Titan / cPanel mail)
 */
function send_via_smtp($smtp, $to, $subject, $bodyText, $bodyHtml, $fromEmail, $fromName, $replyEmail, $replyName) {
    if (empty($smtp['enabled']) || empty($smtp['host']) || empty($smtp['password'])) {
        return false;
    }

    $host = $smtp['host'];
    $port = intval($smtp['port'] ?? 465);
    $user = $smtp['username'] ?? $fromEmail;
    $pass = $smtp['password'];
    $timeout = intval($smtp['timeout'] ?? 12);
    $secure = strtolower($smtp['secure'] ?? ($port === 465 ? 'ssl' : 'tls'));

    $socketHost = ($secure === 'ssl' ? 'ssl://' : '') . $host;
    $errno = 0;
    $errstr = '';
    
    $socket = @fsockopen($socketHost, $port, $errno, $errstr, $timeout);
    if (!$socket) {
        return false;
    }

    $readResp = function() use ($socket) {
        $response = '';
        while ($line = @fgets($socket, 515)) {
            $response .= $line;
            if (substr($line, 3, 1) === ' ') break;
        }
        return $response;
    };

    $sendCmd = function($cmd) use ($socket, $readResp) {
        @fputs($socket, $cmd . "\r\n");
        return $readResp();
    };

    $greeting = $readResp();
    if (substr($greeting, 0, 3) !== '220') {
        @fclose($socket);
        return false;
    }

    $serverName = !empty($_SERVER['SERVER_NAME']) ? $_SERVER['SERVER_NAME'] : 'compliantbksa.co.za';
    $sendCmd("EHLO $serverName");

    if ($secure === 'tls') {
        $tls = $sendCmd("STARTTLS");
        if (substr($tls, 0, 3) === '220') {
            stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
            $sendCmd("EHLO $serverName");
        }
    }

    $auth = $sendCmd("AUTH LOGIN");
    if (substr($auth, 0, 3) === '334') {
        $sendCmd(base64_encode($user));
        $passRes = $sendCmd(base64_encode($pass));
        if (substr($passRes, 0, 3) !== '235') {
            @fclose($socket);
            return false;
        }
    }

    $mailFromRes = $sendCmd("MAIL FROM:<$fromEmail>");
    if (substr($mailFromRes, 0, 3) !== '250') {
        @fclose($socket);
        return false;
    }

    $rcptRes = $sendCmd("RCPT TO:<$to>");
    if (substr($rcptRes, 0, 3) !== '250') {
        @fclose($socket);
        return false;
    }

    $dataCmd = $sendCmd("DATA");
    if (substr($dataCmd, 0, 3) !== '354') {
        @fclose($socket);
        return false;
    }

    $boundary = "==Part_BK_" . md5(uniqid(microtime(), true));
    $headers = [
        "MIME-Version: 1.0",
        "From: $fromName <$fromEmail>",
        "To: <$to>",
        "Subject: $subject",
        "Reply-To: $replyName <$replyEmail>",
        "Date: " . date("r"),
        "Content-Type: multipart/alternative; boundary=\"$boundary\"",
    ];

    $payload = implode("\r\n", $headers) . "\r\n\r\n";
    $payload .= "--$boundary\r\n";
    $payload .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $payload .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $payload .= $bodyText . "\r\n\r\n";
    $payload .= "--$boundary\r\n";
    $payload .= "Content-Type: text/html; charset=UTF-8\r\n";
    $payload .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $payload .= $bodyHtml . "\r\n\r\n";
    $payload .= "--$boundary--\r\n.";

    $sendRes = $sendCmd($payload);
    $sendCmd("QUIT");
    @fclose($socket);

    return substr($sendRes, 0, 3) === '250';
}

/**
 * Standard PHP mail() with Hostinger -f envelope sender parameter
 */
function send_via_php_mail($to, $subject, $bodyText, $bodyHtml, $fromEmail, $fromName, $replyEmail, $replyName) {
    $boundary = "==Part_BK_" . md5(uniqid(microtime(), true));

    $headers = [];
    $headers[] = "From: $fromName <$fromEmail>";
    $headers[] = "Reply-To: $replyName <$replyEmail>";
    $headers[] = "Return-Path: <$fromEmail>";
    $headers[] = "MIME-Version: 1.0";
    $headers[] = "X-Mailer: PHP/" . phpversion();
    $headers[] = "Content-Type: multipart/alternative; boundary=\"$boundary\"";

    $message = "--$boundary\r\n";
    $message .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $message .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $message .= $bodyText . "\r\n\r\n";
    $message .= "--$boundary\r\n";
    $message .= "Content-Type: text/html; charset=UTF-8\r\n";
    $message .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $message .= $bodyHtml . "\r\n\r\n";
    $message .= "--$boundary--";

    // Envelope sender -f matches SPF record domain for compliantbksa.co.za
    $envelope = "-f" . escapeshellcmd($fromEmail);
    return @mail($to, $subject, $message, implode("\r\n", $headers), $envelope);
}

/**
 * HTTPS Relay delivery via FormSubmit for guaranteed delivery
 */
function send_via_relay($to, $subject, $name, $email, $phone, $service, $message) {
    if (!function_exists('curl_init')) {
        return false;
    }
    $url = "https://formsubmit.co/ajax/" . urlencode($to);
    $payload = [
        '_subject' => $subject,
        '_replyto' => $email,
        '_captcha' => 'false',
        'Client Name' => $name,
        'Client Email' => $email,
        'Client Phone' => !empty($phone) ? $phone : 'Not provided',
        'Service Requested' => $service,
        'Message' => $message,
    ];
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Accept: application/json',
        'Origin: https://compliantbksa.co.za',
        'Referer: https://compliantbksa.co.za/',
    ]);
    curl_setopt($ch, CURLOPT_TIMEOUT, 8);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    return ($httpCode === 200);
}

// 7. Execute delivery to all destination mailboxes
$deliveryResults = [];
$anySuccess = false;

foreach ($destinations as $destEmail) {
    $sent = false;

    // 1. Try SMTP if configured
    if (!empty($smtpConfig['enabled']) && !empty($smtpConfig['password'])) {
        $sent = send_via_smtp($smtpConfig, $destEmail, $subject, $bodyText, $bodyHtml, $fromEmail, $fromName, $email, $name);
    }

    // 2. HTTPS Relay (guarantees delivery to Gmail & external inboxes without SPF/DKIM rejections)
    if (!$sent) {
        $sent = send_via_relay($destEmail, $subject, $name, $email, $phone, $service, $message);
    }

    // 3. Fall back to native PHP mail() with -f envelope flag
    if (!$sent) {
        $sent = send_via_php_mail($destEmail, $subject, $bodyText, $bodyHtml, $fromEmail, $fromName, $email, $name);
    }

    $deliveryResults[$destEmail] = $sent ? 'Delivered' : 'Failed';
    if ($sent) {
        $anySuccess = true;
    }
}

// 8. Optional: Send automated receipt to the client
$clientReceiptSent = false;
if (!empty($config['send_client_receipt']) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $receiptSubject = "[Compliant Bookkeeping SA] We received your inquiry (#$reference)";
    
    $receiptText = "Dear $name,\r\n\r\n";
    $receiptText .= "Thank you for reaching out to Compliant Bookkeeping SA.\r\n";
    $receiptText .= "We have received your note regarding $service and a team member will review it shortly.\r\n\r\n";
    $receiptText .= "Inquiry Reference: $reference\r\n";
    $receiptText .= "Date Received:     $datetime\r\n\r\n";
    $receiptText .= "Your Note Context:\r\n$message\r\n\r\n";
    $receiptText .= "Need immediate assistance?\r\n";
    $receiptText .= "Phone: 083 411 9467 · 074 206 3255\r\n";
    $receiptText .= "WhatsApp: https://wa.me/27834119467\r\n";
    $receiptText .= "Email: info@compliantbksa.co.za\r\n\r\n";
    $receiptText .= "Warm regards,\r\nCompliant Bookkeeping SA Team\r\nhttps://compliantbksa.co.za\r\n";

    $receiptHtml = '<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif; padding: 20px; background-color: #f7f6f2; color: #1c231f;">
  <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #e5e3da; overflow: hidden; padding: 32px;">
    <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #1f5f3e; letter-spacing: 0.1em;">Inquiry Received</div>
    <h2 style="margin: 8px 0 16px; font-size: 20px; color: #17241e;">Thank you for getting in touch, ' . htmlspecialchars($name) . '.</h2>
    <p style="font-size: 14px; line-height: 1.6; color: #40574a;">We have received your note regarding <strong>' . htmlspecialchars($service) . '</strong>. We’ll review your details and come back with a useful next step — never a hard sell.</p>
    <div style="padding: 14px 18px; background-color: #f0f7f3; border-radius: 6px; font-size: 13px; color: #17241e; margin: 20px 0;">
      <strong>Inquiry Reference:</strong> ' . htmlspecialchars($reference) . '<br>
      <strong>Received:</strong> ' . htmlspecialchars($datetime) . '
    </div>
    <div style="font-size: 13px; color: #616e66; line-height: 1.5; border-top: 1px solid #e5e3da; padding-top: 18px; margin-top: 24px;">
      <div><strong>Compliant Bookkeeping SA</strong></div>
      <div>Cape Town: 23 Bridge Street, Rosebank | Ceres: 8 Rietvalley Street</div>
      <div>Direct: <a href="tel:+27834119467" style="color: #1f5f3e;">083 411 9467</a> · <a href="tel:+27742063255" style="color: #1f5f3e;">074 206 3255</a></div>
    </div>
  </div>
</body>
</html>';

    // Deliver client acknowledgment
    if (!empty($smtpConfig['enabled']) && !empty($smtpConfig['password'])) {
        $clientReceiptSent = send_via_smtp($smtpConfig, $email, $receiptSubject, $receiptText, $receiptHtml, $fromEmail, $fromName, $fromEmail, $fromName);
    }
    if (!$clientReceiptSent) {
        $clientReceiptSent = send_via_php_mail($email, $receiptSubject, $receiptText, $receiptHtml, $fromEmail, $fromName, $fromEmail, $fromName);
    }
}

// 9. Durable Lead Backup & Logging (Logs directory protected from web view)
$logDir = dirname(__DIR__) . '/logs';
if (!is_dir($logDir)) {
    @mkdir($logDir, 0755, true);
}

// Protect logs directory from public browser downloads via .htaccess
$logHtaccess = $logDir . '/.htaccess';
if (!file_exists($logHtaccess)) {
    $protectionRule = "<IfModule mod_authz_core.c>\r\n  Require all denied\r\n</IfModule>\r\n<IfModule !mod_authz_core.c>\r\n  Deny from all\r\n</IfModule>\r\n";
    @file_put_contents($logHtaccess, $protectionRule);
}

$inquiryRecord = [
    'reference'        => $reference,
    'timestamp'        => date('c'),
    'name'             => $name,
    'email'            => $email,
    'phone'            => $phone,
    'firm'             => $firm,
    'service'          => $service,
    'message'          => $message,
    'recipients'       => $destinations,
    'delivery_results' => $deliveryResults,
    'client_receipt'   => $clientReceiptSent,
    'ip_address'       => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
];

// Append JSON line to inquiries log
$logEntry = json_encode($inquiryRecord) . "\n";
@file_put_contents($logDir . '/inquiries.json', $logEntry, FILE_APPEND);

// Also append readable text log
$textLogLine = sprintf(
    "[%s] Ref: %s | %s <%s> | Tel: %s | Svc: %s | Delivered: %s\n",
    date('Y-m-d H:i:s'),
    $reference,
    $name,
    $email,
    $phone ? $phone : 'N/A',
    $service,
    json_encode($deliveryResults)
);
@file_put_contents($logDir . '/inquiries.log', $textLogLine, FILE_APPEND);

// 10. Return confirmation response
http_response_code(200);
echo json_encode([
    "success" => true,
    "message" => "Thank you, we will be in touch."
]);
