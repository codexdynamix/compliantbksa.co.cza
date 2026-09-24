#!/usr/bin/env node
/**
 * Hostinger Node.js Application Startup File
 * Compliant Bookkeeping SA (https://compliantbksa.co.za)
 *
 * For Hostinger Cloud / Business Shared Hosting plans with Node.js manager:
 * - Application root: /home/uXXXXX/public_html
 * - Application startup file: server.js
 * - Node.js version: 18.x, 20.x, or 22.x
 */

import { createServer } from "node:http";
import { existsSync, createReadStream, statSync } from "node:fs";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || process.env.APP_PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

// Determine static root directory
const candidateDirs = [
  join(__dirname, "dist-hostinger"),
  join(__dirname, ".vercel/output/static"),
  join(__dirname, "public"),
];

let STATIC_DIR = candidateDirs.find((d) => existsSync(d)) || __dirname;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
};

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const pathname = decodeURIComponent(url.pathname);

  // 1. CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  // 2. Handle /api/contact endpoint
  if (pathname === "/api/contact" || pathname === "/api/contact.php") {
    if (req.method !== "POST") {
      res.statusCode = 405;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Method Not Allowed" }));
      return;
    }

    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      try {
        const data = JSON.parse(body || "{}");
        const name = data.name || data.clientName || "Website Visitor";
        const email = data.email || data.clientEmail || "info@compliantbksa.co.za";
        const phone = data.phone || data.clientPhone || "Not provided";
        const service = data.service || data.focus || "Bookkeeping Services";
        const message = data.message || data.details || "Inquiry from website.";

        const destinations = [
          "info@compliantbksa.co.za",
          "accounting@compliantbksa.co.za",
          "codexdynamix@gmail.com",
        ];

        console.log(`[Hostinger Node] New inquiry from:`, email);

        await Promise.allSettled(
          destinations.map(async (dest) => {
            try {
              await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(dest)}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Origin: "https://compliantbksa.co.za",
                  Referer: "https://compliantbksa.co.za/",
                },
                body: JSON.stringify({
                  _subject: `Website Inquiry: ${name} (${service})`,
                  _replyto: email,
                  _captcha: "false",
                  "Client Name": name,
                  "Client Email": email,
                  "Client Phone": phone,
                  "Service Requested": service,
                  Message: message,
                }),
              });
            } catch {
              // Ignore individual destination delivery errors
            }
          })
        );

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(
          JSON.stringify({
            success: true,
            message: "Thank you, we will be in touch.",
          })
        );
      } catch {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Invalid JSON payload" }));
      }
    });
    return;
  }

  // 3. Static file resolution
  let filePath = join(STATIC_DIR, pathname);
  let isFile = false;

  try {
    if (existsSync(filePath)) {
      const stat = statSync(filePath);
      if (stat.isFile()) {
        isFile = true;
      } else if (stat.isDirectory()) {
        const indexCandidate = join(filePath, "index.html");
        if (existsSync(indexCandidate)) {
          filePath = indexCandidate;
          isFile = true;
        }
      }
    }
  } catch {
    // ignore stat errors
  }

  // 4. Serve static file if found
  if (isFile) {
    const ext = extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";
    res.statusCode = 200;
    res.setHeader("Content-Type", contentType);

    // Cache hashed assets for 1 year, HTML for 0s
    if (ext === ".html") {
      res.setHeader("Cache-Control", "no-cache");
    } else {
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    }

    createReadStream(filePath).pipe(res);
    return;
  }

  // 5. SPA Fallback: Serve root index.html
  const rootIndex = join(STATIC_DIR, "index.html");
  if (existsSync(rootIndex)) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache");
    createReadStream(rootIndex).pipe(res);
    return;
  }

  // 6. 404 fallback
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/plain");
  res.end("Compliant Bookkeeping SA - Page Not Found");
});

server.listen(PORT, HOST, () => {
  console.log(`[Compliant Bookkeeping SA] Server listening on http://${HOST}:${PORT}`);
  console.log(`Serving static files from: ${STATIC_DIR}`);
});
