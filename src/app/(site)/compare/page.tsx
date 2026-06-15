import type { Metadata } from 'next';
import { fetchSchools } from '@/lib/microcms';
import { rankSchools } from '@/lib/scoring';
import { CompareTable } from '@/components/comparison/CompareTable';
import { Breadcrumb } from '@/components/common/Breadcrumb';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'プログラミングスクール比較表 | 目的・レベル・形式で絞り込み',
  description: '転職・副業・スキルアップの目的別に、未経験者から中級者向けスクールを比較。無料体験・給付金対象など条件で絞り込めます。',
};

export default async function ComparePage() {
  const schools = await fetchSchools({ limit: 50 });
  const ranked = rankSchools(schools);

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'トップ', href: '/' },
          { label: 'スクール比較表' },
        ]}
      />

      <h1 className="mt-4 mb-2 text-xl font-black text-gray-800">
        プログラミングスクール比較表
      </h1>
      <p className="mb-6 text-sm text-gray-600">
        目的・経験レベル・受講形式・予算などで絞り込んで比較できます。
      </p>

      <CompareTable schools={ranked} />
    </>
  );
}
