import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SAMPLE_SCHOOLS } from '@/lib/sample-data';
import { rankSchools } from '@/lib/scoring';
import { RankingCard } from '@/components/ranking/RankingCard';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import type { SchoolPurpose } from '@/types/school';

const PURPOSE_LABELS: Record<string, string> = {
  career: '転職・就職',
  side: '副業・フリーランス',
  skill: 'スキルアップ',
};

const LANGUAGE_LABELS: Record<string, string> = {
  ruby: 'Ruby',
  python: 'Python',
  javascript: 'JavaScript',
  java: 'Java',
};

const VALID_COMBOS = [
  { purpose: 'career', language: 'ruby' },
  { purpose: 'career', language: 'python' },
  { purpose: 'career', language: 'javascript' },
  { purpose: 'side', language: 'javascript' },
  { purpose: 'side', language: 'python' },
  { purpose: 'skill', language: 'ruby' },
];

export function generateStaticParams() {
  return VALID_COMBOS;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ purpose: string; language: string }>;
}): Promise<Metadata> {
  const { purpose, language } = await params;
  const p = PURPOSE_LABELS[purpose] ?? purpose;
  const l = LANGUAGE_LABELS[language] ?? language;
  return {
    title: `${p}×${l}のプログラミングスクール比較`,
    description: `${p}を目指す方向けの${l}が学べるスクールを比較。料金・転職率・カリキュラムで評価。`,
  };
}

export default async function GuideLangPage({
  params,
}: {
  params: Promise<{ purpose: string; language: string }>;
}) {
  const { purpose, language } = await params;

  const isValid = VALID_COMBOS.some((c) => c.purpose === purpose && c.language === language);
  if (!isValid) notFound();

  const langLabel = LANGUAGE_LABELS[language] ?? language;
  const purposeLabel = PURPOSE_LABELS[purpose] ?? purpose;

  const filtered = rankSchools(
    SAMPLE_SCHOOLS.filter(
      (s) =>
        s.purpose.includes(purpose as SchoolPurpose) &&
        s.curriculum.languages.some((l) => l.toLowerCase() === language),
    ),
  );

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'トップ', href: '/' },
          { label: '選び方ガイド', href: '/guide/career/' },
          { label: purposeLabel, href: `/guide/${purpose}/` },
          { label: `${langLabel}が学べるスクール` },
        ]}
      />

      <h1 className="mt-4 mb-2 text-xl font-black text-gray-800">
        {purposeLabel}×{langLabel} のプログラミングスクール
      </h1>
      <p className="mb-6 text-sm text-gray-600">
        {purposeLabel}を目指す方向けに、{langLabel}が学べるスクールを独自スコアで比較しました。
      </p>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-gray-500">
          条件に合うスクールが見つかりませんでした。
        </p>
      ) : (
        <div className="space-y-4">
          {filtered.map((school) => (
            <RankingCard key={school.id} school={school} />
          ))}
        </div>
      )}
    </>
  );
}
