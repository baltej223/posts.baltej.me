/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://posts.baltej.me',
  generateIndex: true,
  autoLastmod: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  exclude: ['/bavi', '/look-and-feel'],
  sourceDir: '.next',
  outDir: 'public',
  transform: async (config, path) => ({
    loc: path,
    lastmod: new Date().toISOString(),
    changefreq: config.changefreq,
    priority: config.priority,
    alternateRefs: [],
  }),
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};
