const fs = require("fs");
const path = require("path");

// 1. Inject <lastmod> into sitemap index
const indexPath = "public/sitemap.xml";
let xml = fs.readFileSync(indexPath, "utf-8");
const now = new Date().toISOString();
xml = xml.replace(
  /<loc>(.*?)<\/loc>/g,
  (match, loc) => `${match}<lastmod>${now}</lastmod>`,
);
fs.writeFileSync(indexPath, xml);
console.log("✅ Injected <lastmod> into sitemap index");

// 2. Strip xmlns:news, xhtml, mobile, image, video from all chunked sitemaps
const sitemapFiles = fs
  .readdirSync("./public")
  .filter((f) => f.startsWith("sitemap-") && f.endsWith(".xml"));

for (const file of sitemapFiles) {
  const filePath = path.join("./public", file);
  let content = fs.readFileSync(filePath, "utf-8");

  // Remove all xmlns:* junk
  content = content.replace(
    /xmlns:(news|xhtml|mobile|image|video)="[^"]*"\s*/g,
    "",
  );

  fs.writeFileSync(filePath, content);
  console.log(`🧹 Cleaned namespaces in ${file}`);
}
