/** @type {import('next-sitemap').IConfig} */

module.exports = {
    siteUrl: 'https://posts.baltej.me',
    generateIndex: true,    // force creation of sitemap.xml (index)
    autoLastmod: true,   
    changefreq: 'daily',
    // priority: 0.7,
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
    console.log('Adding URL to sitemap:', path);
    return {
      loc: path,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      changefreq: config.changefreq,
      priority: config.priority,
      alternateRefs: [],
    };
  },
    sourceDir: '.next',
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