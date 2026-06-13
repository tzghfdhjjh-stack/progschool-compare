import type { MetadataRoute } from 'next';
import { SAMPLE_SCHOOLS } from '@/lib/sample-data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://progschool-compare.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/ranking/`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/ranking/career/`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/ranking/side/`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/compare/`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/guide/career/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/guide/side/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/guide/career/ruby/`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/guide/career/python/`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/tools/cost-simulator/`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
  ];

  const schoolRoutes: MetadataRoute.Sitemap = SAMPLE_SCHOOLS.map((school) => ({
    url: `${SITE_URL}/school/${school.slug}/`,
    lastModified: new Date(school.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...schoolRoutes];
}
