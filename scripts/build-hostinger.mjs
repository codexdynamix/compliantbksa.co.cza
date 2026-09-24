#!/usr/bin/env node
/**
 * Hostinger Shared Hosting Build & Package Script
 * Compliant Bookkeeping SA (https://compliantbksa.co.za)
 *
 * This script exports a production-ready package tailored specifically for
 * Hostinger Shared Hosting (LiteSpeed / Apache) `public_html` directory:
 * 1. Ensures production build is generated (.vercel/output/static)
 * 2. Prerenders all routes into clean static HTML files
 * 3. Transforms HTML tags to link directly to production assets (/assets/styles-*.css, /assets/index-*.js)
 * 4. Bundles the .htaccess file with URL rewriting, caching, compression & SSL rules
 * 5. Includes the PHP mailer backend (api/contact.php) for Hostinger PHP runtime
 * 6. Generates a ready-to-upload ZIP archive (`hostinger-public_html.zip`)
 */

import { execSync, spawn } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "dist-hostinger");
const DEV_URL = process.env.DEV_URL || "http://127.0.0.1:3000";

const ROUTES = [
  { path: "/", file: "index.html" },
  { path: "/services", file: "services/index.html" },
  { path: "/agricultural-accounting", file: "agricultural-accounting/index.html" },
  { path: "/outsource", file: "outsource/index.html" },
  { path: "/pricing", file: "pricing/index.html" },
  { path: "/contact", file: "contact/index.html" },
  { path: "/who-we-help", file: "who-we-help/index.html" },
  { path: "/approach", file: "approach/index.html" },
  { path: "/faq", file: "faq/index.html" },
];

async function ensureServerRunning() {
  try {
    const res = await fetch(`${DEV_URL}/`);
    if (res.ok) {
      console.log(`Server is already active at ${DEV_URL}`);
      return () => {};
    }
  } catch {
    // Server not running yet
  }

  console.log("Starting temporary prerender server...");
  const child = spawn(
    "node",
    ["scripts/with-app-env.mjs", "vite", "dev", "--host", "127.0.0.1", "--port", "3000"],
    {
      cwd: ROOT,
      stdio: "ignore",
    }
  );

  for (let i = 0; i < 40; i++) {
    await new Promise((r) => setTimeout(r, 250));
    try {
      const res = await fetch("http://127.0.0.1:3000/");
      if (res.ok) {
        console.log("Temporary prerender server ready.");
        break;
      }
    } catch {
      // Keep waiting
    }
  }

  return () => {
    try {
      console.log("Stopping temporary prerender server...");
      child.kill("SIGTERM");
    } catch {
      // Ignore
    }
  };
}

async function fetchRouteHtml(routePath) {
  try {
    const res = await fetch(`${DEV_URL}${routePath}`);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }
    return await res.text();
  } catch (err) {
    console.warn(`[build-hostinger] Notice: could not fetch ${routePath}:`, err.message);
    return null;
  }
}

function transformToProductionHtml(rawHtml, cssName) {
  let html = rawHtml;

  // 1. Remove Vite dev styles
  html = html.replace(/<link[^>]*href="\/src\/styles\.css"[^>]*>/g, "");
  html = html.replace(/<link[^>]*href="\/@tanstack-start\/styles\.css[^"]*"[^>]*>/g, "");

  // 2. Remove dev virtual entry script, streaming boundaries and preloads
  html = html.replace(/<link[^>]*href="\/@id\/virtual:tanstack-start-dev-client-entry"[^>]*\/>/g, "");
  html = html.replace(/<script[^>]*src="\/@id\/virtual:tanstack-start-dev-client-entry"[^>]*><\/script>/g, "");
  html = html.replace(/<script[^>]*data-tsr-stream-part=""[^>]*>[\s\S]*?<\/script>/g, "");
  html = html.replace(/<script>document\.currentScript\.remove\(\);(?:\/\*\$tsr-stream-boundary\*\/)?<\/script>/g, "");

  // 3. Inject production CSS bundle before </head> if not already present
  if (cssName && !html.includes(`/assets/${cssName}`)) {
    html = html.replace("</head>", `  <link rel="stylesheet" href="/assets/${cssName}" />\n</head>`);
  }

  // 4. Inject production Hostinger client script before </body>
  // This provides zero-dependency interactivity (mobile menu, FAQ accordion, contact form PHP delivery, smooth scroll)
  // and eliminates hydration mismatch blank screens.
  if (!html.includes("/assets/site-client.js")) {
    html = html.replace("</body>", `  <script src="/assets/site-client.js" defer></script>\n</body>`);
  }

  return html;
}

function createFallbackHtml(title, cssName) {
  const cssTag = cssName ? `<link rel="stylesheet" href="/assets/${cssName}">` : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title} | Compliant Bookkeeping SA</title>
  <meta name="description" content="Compliant Bookkeeping SA — professional accounting, payroll, tax and compliance services for South African businesses and agricultural enterprises." />
  <meta property="og:title" content="${title} | Compliant Bookkeeping SA" />
  <meta property="og:description" content="Professional accounting, payroll, tax and compliance services for South African businesses and agricultural enterprises." />
  <meta property="og:image" content="/og.jpg" />
  <meta name="theme-color" content="#1E2528" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  ${cssTag}
</head>
<body>
  <div class="site-shell">
    <header class="site-header">
      <nav class="header-inner" aria-label="Main navigation">
        <a href="/" class="logo-link"><span class="wordmark"><span class="wordmark-type"><span>COMPLIANT</span><small>BOOKKEEPING SA</small></span></span></a>
        <div class="desktop-nav">
          <a href="/" class="nav-link">Home</a>
          <a href="/services" class="nav-link">Services</a>
          <a href="/agricultural-accounting" class="nav-link">Agriculture</a>
          <a href="/outsource" class="nav-link">Outsource</a>
          <a href="/pricing" class="nav-link">Pricing</a>
          <a href="/contact" class="nav-link">Contact</a>
        </div>
      </nav>
    </header>
    <main style="min-height: 70vh; padding: 120px 24px 60px; max-width: 960px; margin: 0 auto;">
      <h1 style="font-size: 2.5rem; font-weight: 600; margin-bottom: 16px;">${title}</h1>
      <p style="font-size: 1.15rem; color: #6f828a; margin-bottom: 24px;">Compliant Bookkeeping SA — professional accounting, payroll, tax and compliance services.</p>
      <a href="/contact" class="button button-dark" style="display:inline-block; padding: 12px 24px; background: #1E2528; color: #fff; border-radius: 8px; text-decoration: none;">Contact our team</a>
    </main>
  </div>
  <script src="/assets/site-client.js" defer></script>
</body>
</html>`;
}

async function build() {
  console.log("=== Building for Hostinger Shared Hosting ===");

  // 1. Prepare output directory
  if (existsSync(OUT_DIR)) {
    rmSync(OUT_DIR, { recursive: true, force: true });
  }
  mkdirSync(OUT_DIR, { recursive: true });

  // 2. Ensure Vite/Nitro production build is run
  console.log("Running production asset build (npm run build)...");
  execSync("npm run build", { cwd: ROOT, stdio: "inherit" });

  // 3. Copy static build assets into OUT_DIR
  const staticSource = join(ROOT, ".vercel/output/static");
  if (existsSync(staticSource)) {
    console.log("Copying production assets...");
    cpSync(staticSource, OUT_DIR, { recursive: true });
  }

  // 4. Copy public directory configuration and assets
  const publicDir = join(ROOT, "public");
  if (existsSync(publicDir)) {
    console.log("Copying public configuration and scripts...");
    cpSync(publicDir, OUT_DIR, { recursive: true });
  }

  // 5. Identify production CSS and JS bundle filenames
  const assetsDir = join(OUT_DIR, "assets");
  let cssName = null;
  let jsName = null;
  if (existsSync(assetsDir)) {
    const files = readdirSync(assetsDir);
    cssName = files.find((f) => f.startsWith("styles-") && f.endsWith(".css"));
    jsName = files.find((f) => f.startsWith("index-") && f.endsWith(".js"));
    console.log(`Identified production bundles: CSS=${cssName}, JS=${jsName}`);
  }

  // 6. Ensure server is running to prerender HTML
  const stopServer = await ensureServerRunning();

  try {
    console.log("Prerendering route pages for instant loading & SEO...");
    for (const { path: routePath, file: relFile } of ROUTES) {
      const targetFile = join(OUT_DIR, relFile);
      mkdirSync(dirname(targetFile), { recursive: true });

      const rawHtml = await fetchRouteHtml(routePath);
      let finalHtml = "";
      if (rawHtml) {
        finalHtml = transformToProductionHtml(rawHtml, cssName);
      } else {
        const title = routePath === "/" ? "Home" : routePath.replace(/^\//, "").replace(/-/g, " ");
        finalHtml = createFallbackHtml(title, cssName);
      }

      writeFileSync(targetFile, finalHtml, "utf8");
      console.log(`  ✓ Generated ${routePath} -> ${relFile}`);
    }
  } finally {
    stopServer();
  }

  // 7. Verify .htaccess is in place
  const htaccessDest = join(OUT_DIR, ".htaccess");
  if (!existsSync(htaccessDest)) {
    const htaccessSrc = join(ROOT, "public/.htaccess");
    if (existsSync(htaccessSrc)) {
      cpSync(htaccessSrc, htaccessDest);
    }
  }

  // 8. Ensure client runtime and PHP endpoints are present
  const outAssets = join(OUT_DIR, "assets");
  mkdirSync(outAssets, { recursive: true });
  const siteClientSrc = join(ROOT, "public/assets/site-client.js");
  if (existsSync(siteClientSrc)) {
    cpSync(siteClientSrc, join(outAssets, "site-client.js"));
    console.log("  ✓ Bundled production client runtime: assets/site-client.js");
  }

  const apiDir = join(OUT_DIR, "api");
  mkdirSync(apiDir, { recursive: true });
  const phpContact = join(ROOT, "public/api/contact.php");
  if (existsSync(phpContact)) {
    cpSync(phpContact, join(apiDir, "contact.php"));
  }
  const phpConfig = join(ROOT, "public/api/config.php");
  if (existsSync(phpConfig)) {
    cpSync(phpConfig, join(apiDir, "config.php"));
  }
  const rootContact = join(ROOT, "public/contact.php");
  if (existsSync(rootContact)) {
    cpSync(rootContact, join(OUT_DIR, "contact.php"));
  } else if (existsSync(phpContact)) {
    cpSync(phpContact, join(OUT_DIR, "contact.php"));
  }

  // 9. Generate standalone ZIP archive in workspace root for manual 1-click upload
  console.log("Generating hostinger-public_html.zip in project root...");
  const zipName = "hostinger-public_html.zip";
  const zipDest = join(ROOT, zipName);
  try {
    execSync(
      `python3 -c "import zipfile, os; z = zipfile.ZipFile('${zipDest}', 'w', zipfile.ZIP_DEFLATED); [z.write(os.path.join(r, f), os.path.relpath(os.path.join(r, f), '${OUT_DIR}')) for r, d, fs in os.walk('${OUT_DIR}') for f in fs if not f.endswith('.DS_Store') and not f.endswith('.zip')]; z.close()"`,
      { stdio: "inherit" }
    );
    console.log(`  ✓ Created standalone ${zipName} (${zipDest})`);
  } catch (err) {
    console.warn("  (Zip creation warning:", err.message, ")");
  }

  // 10. Write deployment README
  const instructions = `# Hostinger Shared Hosting Deployment Guide
Compliant Bookkeeping SA (https://compliantbksa.co.za)

## Why was Hostinger creating a duplicate 'public_html' folder?
On Hostinger, when an FTP account is created for a website (e.g. \`compliantbksa.co.za\`), Hostinger's default FTP directory setting for that account is \`/public_html\`.
When an FTP client connects with those credentials, its starting root directory is ALREADY \`public_html\`.

If the deployment specifies \`server-dir: ./public_html/\`, FTP creates a folder named \`public_html\` INSIDE \`public_html\`, resulting in \`public_html/public_html/\`.
Because your live website is served by LiteSpeed/Apache from the top-level \`public_html/\`, it remained without updated files, causing a blank page or 403 Forbidden!

## How this is now fixed:
1. **GitHub Actions Workflow (\`.github/workflows/deploy.yml\`)**:
   \`server-dir\` is configured to default to \`./\`:
   \`\`\`yaml
   server-dir: \${{ secrets.HOSTINGER_SERVER_DIR || './' }}
   \`\`\`
   All files from \`dist-hostinger/\` now upload directly into your website's document root (\`public_html/\`).
2. **Instant, Blank-Screen-Proof Static HTML**:
   All 9 routes are pre-rendered into full semantic HTML with Tailwind styling and powered by \`assets/site-client.js\`.
   This eliminates hydration crashes and ensures the site renders immediately on any device with full SEO.
3. **Interactive Features**:
   - Mobile navigation hamburger menu (fully responsive)
   - FAQ accordion toggle
   - Contact consultation form with PHP delivery to \`info@compliantbksa.co.za\` and \`accounting@compliantbksa.co.za\`
   - Smooth anchor scrolling and WhatsApp floating dock

## Cleanup Step in Hostinger File Manager:
If you still see a folder named \`public_html\` INSIDE your main \`public_html\` directory on Hostinger:
1. Log into your Hostinger control panel (hPanel).
2. Go to **Websites** -> **Manage** -> **File Manager**.
3. Open \`public_html\`.
4. If there is a nested folder named \`public_html\` inside it, right-click and delete that nested folder.
5. Push your code to GitHub (or trigger workflow dispatch in GitHub Actions) to run the clean deployment.
`;
  writeFileSync(join(OUT_DIR, "HOSTINGER_DEPLOY_README.md"), instructions, "utf8");
  writeFileSync(join(ROOT, "HOSTINGER_DEPLOY_README.md"), instructions, "utf8");

  console.log("\n========================================================");
  console.log(" Hostinger build complete! Output directory: dist-hostinger/");
  console.log("========================================================\n");
}

build().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
