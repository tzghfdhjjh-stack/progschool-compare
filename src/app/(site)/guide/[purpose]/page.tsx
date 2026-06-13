import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SAMPLE_SCHOOLS } from '@/lib/sample-data';
import { rankSchools } from '@/lib/scoring';
import { RankingCard } from '@/components/ranking/RankingCard';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import type { SchoolPurpose } from '@/types/school';

const PURPOSE_META: Record<SchoolPurpose, { title: string; desc: string }> = {
  career: {
    title: '転職・就職向けプログラミングスクール',
    desc: '未経験からエンジニア転職を目指す方向けのスクール比較。転職率・サポートを重視して選びました。',
  },
  side: {
    title: '副業・フリーランス向けプログラミングスクール',
    desc: '副業や独立を目指す方向けのスクール比較。実践的なスキルと案件獲得サポートで選びました。',
  },
  skill: {
    title: 'スキルアップ向けプログラミングスクール',
    desc: '技術力向上を目的とする方向けのスクール比較。カリキュラムの深さと実践性で選びました。',
  },
};

export function generateStaticParams() {
  return (['career', 'side', 'skill'] as SchoolPurpose[]).map((purpose) => ({ purpose }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ purpose: string }>;
}): Promise<Metadata> {
  const { purpose } = await params;
  const meta = PURPOSE_META[purpose as SchoolPurpose];
  if (!meta) return {};
  return { title: meta.title, description: meta.desc };
}

export default async function GuidePurposePage({
  params,
}: {
  params: Promise<{ purpose: string }>;
}) {
  const { purpose } = await params;
  const meta = PURPOSE_META[purpose as SchoolPurpose];
  if (!meta) notFound();

  const filtered = rankSchools(
    SAMPLE_SCHOOLS.filter((s) => s.purpose.includes(purpose as SchoolPurpose)),
  );

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'トップ', href: '/' },
          { label: '選び方ガイド', href: '/guide/career/' },
          { label: meta.title },
        ]}
      />

      <h1 className="mt-4 mb-2 text-xl font-black text-gray-800">{meta.title}</h1>
      <p className="mb-6 text-sm text-gray-600">{meta.desc}</p>

      <div className="space-y-4">
        {filtered.map((school) => (
          <RankingCard key={school.id} school={school} />
        ))}
      </div>

      <div className="mt-8 flex gap-3">
        {(['career', 'side', 'skill'] as SchoolPurpose[])
          .filter((p) => p !== purpose)
          .map((p) => (
            <Link
              key={p}
              href={`/guide/${p}/`}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:border-blue-400"
            >
              {PURPOSE_META[p].title} →
            </Link>
          ))}
      </div>
    </>
  );
}
