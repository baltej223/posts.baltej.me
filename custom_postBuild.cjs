const fs = require('fs');
const path = 'public/sitemap.xml';
let xml = fs.readFileSync(path, 'utf-8');
const now = new Date().toISOString();
xml = xml.replace(
  /<loc>(.*?)<\/loc>/g,
  (match, loc) => `${match}<lastmod>${now}</lastmod>`
);
fs.writeFileSync(path, xml);
console.log('✅ Injected <lastmod> into sitemap index');
