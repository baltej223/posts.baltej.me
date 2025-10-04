/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://posts.baltej.me',
  generateIndexSitemap: true,
  autoLastmod: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 20, // Forces chunking & index generation
  generateRobotsTxt: true,
  exclude: ['/bavi', '/look-and-feel'],
  sourceDir: '.next',
  outDir: 'public',

  transform: async (config, path) => {
    return {
      loc: path,
      lastmod: new Date().toISOString(),
      changefreq: config.changefreq,
      priority: config.priority,
      // Do NOT include alternateRefs — it's what triggers all the extra xmlns!
    }
  },

  // Completely disable alternateRefs
  alternateRefs: [],

  // Avoid injecting anything else
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
}
