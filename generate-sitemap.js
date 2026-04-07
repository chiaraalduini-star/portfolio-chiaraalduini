#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const BASE_URL = "https://www.chiaraalduini.it";

const EXCLUDE = [
  "privacy.html",
  "404.html",
];

const PRIORITIES = {
  "index.html":           "1.0",
  "pages/portfolio.html": "0.9",
  "pages/profilo.html":   "0.8",
  "pages/contatti.html":  "0.7",
};

const DEFAULT_PRIORITY = "0.7";

function findHtmlFiles(dir, baseDir) {
  const results = [];
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (item === "pages") {
        results.push(...findHtmlFiles(fullPath, baseDir));
      }
    } else if (item.endsWith(".html")) {
      const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, "/");
      results.push(relativePath);
    }
  }
  return results;
}

function getPriority(relativePath) {
  return PRIORITIES[relativePath] || DEFAULT_PRIORITY;
}

function generateSitemap() {
  const rootDir = process.cwd();
  const allFiles = findHtmlFiles(rootDir, rootDir);
  const pages = allFiles.filter((file) => {
    const filename = path.basename(file);
    return !EXCLUDE.includes(filename);
  });
  pages.sort((a, b) => {
    if (a === "index.html") return -1;
    if (b === "index.html") return 1;
    return a.localeCompare(b);
  });
  const today = new Date().toISOString().split("T")[0];
  const urls = pages.map((file) => {
    const urlPath = file === "index.html" ? "/" : `/${file}`;
    const fullUrl = `${BASE_URL}${urlPath}`;
    const priority = getPriority(file);
    return `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${today}</lastmod>
    <priority>${priority}</priority>
  </url>`;
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;
  const outputPath = path.join(rootDir, "sitemap.xml");
  fs.writeFileSync(outputPath, xml, "utf-8");
  console.log("✅ sitemap.xml generata!");
  pages.forEach((file) => {
    console.log(`   ${getPriority(file)} → ${file}`);
  });
}

generateSitemap();
