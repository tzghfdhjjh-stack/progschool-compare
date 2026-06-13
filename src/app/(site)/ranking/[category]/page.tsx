import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SAMPLE_SCHOOLS } from '@/lib/sample-data';
import { rankSchools } from '@/lib/scoring';
import { RankingCard } from '@/components/ranking/RankingCard';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import type { SchoolPurpose } from '@/types/school';

const CATEGORY_META: Record<string, { title: string; desc: string; purpose: SchoolPurpose }> = {
  career: {
    title: '転職向けプログラミングスクールランキング',
    desc: 'エンジニア転職を目指す未経験者向けスクールを転職率・サポートで厳選。',
    purpose: 'career',
  },
  side: {
    title: '副業・フリーランス向けプログラミングスクールランキング',
    desc: '副業や独立を目指す方向けのスクールを案件獲得率・実践スキルで評価。',
    purpose: 'side',
  },
  skill: {
    title: 'スキルアップ向けプログラミングスクールランキング',
    desc: '技術力を磨きたい方向けのスクールをカリキュラムの深さで評価。',
    purpose: 'skill',
  },
};

export function generateStaticParams() {
  return Object.keys(CATEGORY_META).map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const meta = CATEGORY_META[category];
  if (!meta) return {};
  return { title: meta.title, description: meta.desc };
}

export default async function CategoryRankingPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const meta = CATEGORY_META[category];
  if (!meta) notFound();

  const ranked = rankSchools(
    SAMPLE_SCHOOLS.filter((s) => s.purpose.includes(meta.purpose)),
  );

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'トップ', href: '/' },
          { label: 'ランキング', href: '/ranking/' },
          { label: meta.title },
        ]}
      />

      <h1 className="mt-4 mb-2 text-xl font-black text-gray-800">{meta.title}</h1>
      <p className="mb-6 text-sm text-gray-600">{meta.desc}</p>

      <div className="space-y-4">
        {ranked.map((school) => (
          <RankingCard key={school.id} school={school} />
        ))}
      </div>
    </>
  );
}
