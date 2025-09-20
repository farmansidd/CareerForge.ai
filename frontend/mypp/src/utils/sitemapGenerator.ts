interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export const generateSitemap = (baseUrl: string, urls: SitemapUrl[]): string => {
  const urlElements = urls.map(url => {
    const urlElement = new URL(url.loc, baseUrl);
    return `  <url>
    <loc>${urlElement.href}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority !== undefined ? `<priority>${url.priority}</priority>` : ''}
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
};

// Predefined sitemap for CareerForge.ai
export const careerForgeSitemapUrls: SitemapUrl[] = [
  {
    loc: '/',
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: 1.0
  },
  {
    loc: '/login',
    lastmod: new Date().toISOString(),
    changefreq: 'monthly',
    priority: 0.8
  },
  {
    loc: '/register',
    lastmod: new Date().toISOString(),
    changefreq: 'monthly',
    priority: 0.8
  },
  {
    loc: '/resume',
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: 0.9
  },
  {
    loc: '/dashboard',
    lastmod: new Date().toISOString(),
    changefreq: 'daily',
    priority: 0.9
  },
  {
    loc: '/roadmaps',
    lastmod: new Date().toISOString(),
    changefreq: 'daily',
    priority: 0.9
  },
  {
    loc: '/skills',
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: 0.8
  },
  {
    loc: '/goals',
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: 0.8
  },
  {
    loc: '/job-search',
    lastmod: new Date().toISOString(),
    changefreq: 'daily',
    priority: 0.9
  },
  {
    loc: '/faq',
    lastmod: new Date().toISOString(),
    changefreq: 'monthly',
    priority: 0.6
  },
  {
    loc: '/guides',
    lastmod: new Date().toISOString(),
    changefreq: 'monthly',
    priority: 0.7
  },
  {
    loc: '/support',
    lastmod: new Date().toISOString(),
    changefreq: 'monthly',
    priority: 0.6
  }
];

export const generateCareerForgeSitemap = (baseUrl: string = 'https://careerforge.ai'): string => {
  return generateSitemap(baseUrl, careerForgeSitemapUrls);
};
