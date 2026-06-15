import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://progschool-compare.vercel.app';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/about/', '/privacy/', '/disclaimer/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
