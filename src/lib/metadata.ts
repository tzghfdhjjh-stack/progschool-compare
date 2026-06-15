import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://progschool-compare.vercel.app';
const SITE_NAME = 'プログラミングスクール比較Lab';

interface MetaOptions {
  title: string;
  description: string;
  path?: string;
  noindex?: boolean;
}

export function buildMetadata({ title, description, path = '/', noindex = false }: MetaOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'ja_JP',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
