import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site?.toString() || 'https://bedalo.pages.dev';

  // Fetch all collections
  const [berita, potensi, pariwisata] = await Promise.all([
    getCollection('berita'),
    getCollection('potensi'),
    getCollection('pariwisata'),
  ]);

  // Static pages
  const staticPages = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/profil', changefreq: 'monthly', priority: 0.8 },
    { url: '/berita', changefreq: 'daily', priority: 0.9 },
    { url: '/potensi', changefreq: 'weekly', priority: 0.8 },
    { url: '/pariwisata', changefreq: 'weekly', priority: 0.8 },
    { url: '/kontak', changefreq: 'monthly', priority: 0.7 },
    { url: '/tentang-kkn', changefreq: 'monthly', priority: 0.6 },
    { url: '/peta-situs', changefreq: 'monthly', priority: 0.5 },
    { url: '/kebijakan-privasi', changefreq: 'yearly', priority: 0.3 },
  ];

  // Dynamic pages from collections
  const beritaPages = berita.map((entry) => ({
    url: `/berita/${entry.id}`,
    lastmod: entry.data.pubDate?.toISOString(),
    changefreq: 'monthly',
    priority: 0.7,
  }));

  const potensiPages = potensi.map((entry) => ({
    url: `/potensi/${entry.id}`,
    lastmod: entry.data.publishDate?.toISOString(),
    changefreq: 'monthly',
    priority: 0.6,
  }));

  const pariwisataPages = pariwisata.map((entry) => ({
    url: `/pariwisata/${entry.id}`,
    lastmod: entry.data.publishDate?.toISOString(),
    changefreq: 'monthly',
    priority: 0.7,
  }));

  // Combine all pages
  const allPages = [...staticPages, ...beritaPages, ...potensiPages, ...pariwisataPages];

  // Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${siteUrl}${page.url}</loc>${page.lastmod ? `\n    <lastmod>${page.lastmod}</lastmod>` : ''}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
