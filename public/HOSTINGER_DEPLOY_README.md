# Hostinger Deployment & Mail Delivery Guide
Compliant Bookkeeping SA (https://compliantbksa.co.za)

## 1. Automated GitHub Actions Deployment
The repository includes `.github/workflows/deploy.yml`.
Whenever you push to the `main` branch, GitHub Actions will:
1. Check out the repository.
2. Run `npm ci` to install dependencies.
3. Run `npm run build:hostinger` to compile production assets and prerender pages.
4. FTP upload the `dist-hostinger/` folder directly into Hostinger's `public_html/`.

Make sure your GitHub Repository Secrets are set:
- `HOSTINGER_HOST`: Your Hostinger FTP hostname (e.g. `ftp.compliantbksa.co.za` or Hostinger IP)
- `HOSTINGER_USERNAME`: Your Hostinger FTP username
- `HOSTINGER_PASSWORD`: Your Hostinger FTP password
- `HOSTINGER_SERVER_DIR` (optional): Defaults to `./public_html/`

---

## 2. Form Submissions & Email Delivery

### Destination Mailboxes:
Every submission from the website contact form is automatically dispatched to all three official destinations:
- **`accounting@compliantbksa.co.za`**
- **`info@compliantbksa.co.za`**
- **`codexdynamix@gmail.com`**

### Two Delivery Modes:
1. **Hostinger Native PHP `mail()` (Active by Default):**
   - Automatically configured with `-f info@compliantbksa.co.za` envelope sender.
   - Preserves SPF and DKIM validation so emails to Gmail (`codexdynamix@gmail.com`) and Titan Mail are not rejected or flagged as spam.
   - Dispatches individually to each recipient to prevent mail server dropouts.
   - Delivers both clean Plain Text and formatted HTML with direct Reply-To headers.

2. **Hostinger SMTP (Optional - Recommended for 100% Guaranteed Delivery):**
   If you wish to route through Hostinger's authenticated SMTP mail servers:
   - Open `api/config.php` in Hostinger File Manager.
   - Set `'enabled' => true` in the `'smtp'` block.
   - Enter the password for `info@compliantbksa.co.za`.
   - Hostinger host is `smtp.hostinger.com` on port `465` (SSL).

### Lead Backup & Audit Logs:
Even if a mail server has temporary downtime, no customer inquiry is ever lost:
- Inquiries are logged in `public_html/logs/inquiries.json` (machine-readable) and `public_html/logs/inquiries.log` (human-readable).
- The `logs/` directory contains an `.htaccess` file preventing public web access, keeping client contact details private and secure.
