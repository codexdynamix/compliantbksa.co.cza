<?php
/**
 * Email & Form Delivery Configuration
 * Compliant Bookkeeping SA (https://compliantbksa.co.za)
 */

return [
    // Primary delivery destinations for all website inquiries
    // Sent individually without CC to keep departments distinct
    'recipients' => [
        'info@compliantbksa.co.za',
        'accounting@compliantbksa.co.za',
        'codexdynamix@gmail.com',
    ],

    // Default sender identity for outgoing notices
    'from_email' => 'info@compliantbksa.co.za',
    'from_name'  => 'Compliant Bookkeeping SA',

    // Optional SMTP credentials for Hostinger Email (Titan / cPanel mail)
    // If enabled is true and password is supplied, the script connects via secure SMTP.
    // If left disabled (or password is empty), the script uses Hostinger's native PHP mail()
    // with envelope sender (-f) to pass SPF/DKIM verification.
    'smtp' => [
        'enabled'  => false,
        'host'     => 'smtp.hostinger.com',
        'port'     => 465, // 465 for SSL, 587 for TLS
        'secure'   => 'ssl', // 'ssl' or 'tls'
        'username' => 'info@compliantbksa.co.za',
        'password' => '', // Insert Hostinger email account password here if using SMTP
        'timeout'  => 12,
    ],

    // Client receipt on form displays on screen ("Thank you, we will be in touch")
    // Keep automated client email receipt disabled unless explicitly desired
    'send_client_receipt' => false,

    // Store a durable backup of every inquiry in logs/inquiries.json
    'log_submissions' => true,
];
