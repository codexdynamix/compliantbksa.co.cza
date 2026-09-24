# Hostinger Shared Hosting Deployment Guide
Compliant Bookkeeping SA (https://compliantbksa.co.za)

## Why was Hostinger creating a duplicate 'public_html' folder?
On Hostinger, when an FTP account is created for a website (e.g. `compliantbksa.co.za`), Hostinger's default FTP directory setting for that account is `/public_html`.
When an FTP client connects with those credentials, its starting root directory is ALREADY `public_html`.

If the deployment specifies `server-dir: ./public_html/`, FTP creates a folder named `public_html` INSIDE `public_html`, resulting in `public_html/public_html/`.
Because your live website is served by LiteSpeed/Apache from the top-level `public_html/`, it remained without updated files, causing a blank page or 403 Forbidden!

## How this is now fixed:
1. **GitHub Actions Workflow (`.github/workflows/deploy.yml`)**:
   `server-dir` is configured to default to `./`:
   ```yaml
   server-dir: ${{ secrets.HOSTINGER_SERVER_DIR || './' }}
   ```
   All files from `dist-hostinger/` now upload directly into your website's document root (`public_html/`).
2. **Instant, Blank-Screen-Proof Static HTML**:
   All 9 routes are pre-rendered into full semantic HTML with Tailwind styling and powered by `assets/site-client.js`.
   This eliminates hydration crashes and ensures the site renders immediately on any device with full SEO.
3. **Interactive Features**:
   - Mobile navigation hamburger menu (fully responsive)
   - FAQ accordion toggle
   - Contact consultation form with PHP delivery to `info@compliantbksa.co.za` and `accounting@compliantbksa.co.za`
   - Smooth anchor scrolling and WhatsApp floating dock

## Cleanup Step in Hostinger File Manager:
If you still see a folder named `public_html` INSIDE your main `public_html` directory on Hostinger:
1. Log into your Hostinger control panel (hPanel).
2. Go to **Websites** -> **Manage** -> **File Manager**.
3. Open `public_html`.
4. If there is a nested folder named `public_html` inside it, right-click and delete that nested folder.
5. Push your code to GitHub (or trigger workflow dispatch in GitHub Actions) to run the clean deployment.
