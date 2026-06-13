import type { School } from '@/types/school';
import { formatScore } from './scoring';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://progschool-compare.vercel.app';

export function generateProductLD(school: School) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: school.name,
    description: school.description,
    image: school.logo.url,
    url: `${SITE_URL}/school/${school.slug}/`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: formatScore(school.overallScore ?? 0),
      ratingCount: school.reviewCount,
      bestRating: '5',
      worstRating: '1',
    },
    offers: {
      '@type': 'Offer',
      price: school.price.basePrice,
      priceCurrency: 'JPY',
      availability: 'https://schema.org/InStock',
    },
  };
}

export function generateItemListLD(schools: School[], listName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    numberOfItems: schools.length,
    itemListElement: schools.map((school, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: school.name,
      url: `${SITE_URL}/school/${school.slug}/`,
    })),
  };
}

export function generateBreadcrumbLD(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export function generateFAQPageLD(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
