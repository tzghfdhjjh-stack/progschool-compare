import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import './globals.css';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'プログラミングスクール比較Lab',
  description: '未経験からエンジニアへ。料金・カリキュラム・転職率を独自スコアで比較。全スクールを透明な採点基準で評価します。',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://progschool-compare.vercel.app'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <body className="min-h-screen bg-gray-50 font-sans antialiased">{children}</body>
    </html>
  );
}
