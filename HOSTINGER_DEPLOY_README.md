# Hostinger Shared Hosting Deployment Guide
Compliant Bookkeeping SA (https://compliantbksa.co.za)

## How to Deploy via GitHub Actions:
The repository includes `.github/workflows/deploy.yml`.
Whenever you push to the `main` branch, GitHub Actions will:
1. Check out the code
2. Run `npm ci`
3. Run `npm run build:hostinger`
4. FTP upload the `dist-hostinger/` folder directly into Hostinger's `public_html/`.

Make sure your GitHub Repository Secrets are set:
- `HOSTINGER_HOST`: Your Hostinger FTP hostname (e.g. `ftp.compliantbksa.co.za` or the Hostinger server IP)
- `HOSTINGER_USERNAME`: Your Hostinger FTP username
- `HOSTINGER_PASSWORD`: Your Hostinger FTP password
- `HOSTINGER_SERVER_DIR` (optional): Defaults to `./public_html/` or `./` depending on your FTP user root directory
