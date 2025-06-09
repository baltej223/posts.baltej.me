/** @type {import('next-sitemap').IConfig} */

module.exports = {
    siteUrl: 'https://posts.baltej.me',
    changefreq: 'daily',
    priority: 0.7,
    sitemapSize: 5000,
    generateRobotsTxt: true,
    exclude: ['/bavi', '/look-and-feel'],
    // alternateRefs: [
    //   {
    //     href: 'https://es.example.com',
    //     hreflang: 'es',
    //   },
    //   {
    //     href: 'https://fr.example.com',
    //     hreflang: 'fr',
    //   },
    // ],
    // Default transformation function
    transform: async (config, path) => {
      return {
        loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
        changefreq: config.changefreq,
        priority: config.priority,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        alternateRefs: config.alternateRefs ?? [],
      }
    },
    // sourceDir: 'app',
    sourceDir: '.next', // 👈 ensures it finds build-manifest
    outDir: 'public',
    // additionalPaths: async (config) => [
    //   await config.transform(config, '/additional-page'),
    // ],
    // robotsTxtOptions: {
    //   policies: [
    //     {
    //       userAgent: '*',
    //       allow: '/',
    //     },
    //     {
    //       userAgent: 'test-bot',
    //       allow: ['/path', '/path-2'],
    //     },
    //     {
    //       userAgent: 'black-listed-bot',
    //       disallow: ['/sub-path-1', '/path-2'],
    //     },
    //   ],
    // },
  }