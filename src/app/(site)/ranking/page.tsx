import type { Metadata } from 'next';
import { fetchSchools } from '@/lib/microcms';
import { rankSchools } from '@/lib/scoring';
import { RankingCard } from '@/components/ranking/RankingCard';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { UpdateBadge } from '@/components/common/UpdateBadge';
import { generateItemListLD, generateBreadcrumbLD } from '@/lib/structured-data';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'プログラミングスクール総合ランキング2026年版',
  description: '未経験からエンジニアへ。カリキュラム・料金・転職率・サポートの4軸で評価した総合ランキング。',
};

export default async function RankingPage() {
  const schools = await fetchSchools({ limit: 20, orders: '-curriculumScore' });
  const ranked = rankSchools(schools);
  const itemListLD = generateItemListLD(ranked, 'プログラミングスクール総合ランキング2026年版');
  const breadcrumbLD = generateBreadcrumbLD([
    { name: 'トップ', url: '/' },
    { name: 'ランキング', url: '/ranking/' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([itemListLD, breadcrumbLD]) }}
      />

      <Breadcrumb
        items={[
          { label: 'トップ', href: '/' },
          { label: 'ランキング' },
        ]}
      />

      <div className="mt-4 mb-2 flex items-start justify-between">
        <h1 className="text-xl font-black text-gray-800">
          プログラミングスクール総合ランキング
        </h1>
        <UpdateBadge date="2026-01-15T00:00:00.000Z" />
      </div>

      <p className="mb-6 text-sm text-gray-600">
        カリキュラム・料金・サポート・口コミの4軸を独自スコアで評価。
        <strong>採点基準は完全公開</strong>しており、アフィリエイト報酬はランキングに影響しません。
      </p>

      <div className="space-y-4">
        {ranked.map((school) => (
          <RankingCard key={school.id} school={school} />
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-5 text-sm text-gray-600">
        <h2 className="mb-2 font-bold text-gray-800">採点式</h2>
        <p>
          総合スコア = カリキュラム×0.30 + 料金×0.25 + サポート×0.25 + 口コミ×0.20
        </p>
        <p className="mt-2 text-xs text-gray-400">
          ※ 各スコアは1.0〜5.0点。最終更新: 2026年1月。料金改定等は随時反映します。
        </p>
      </div>
    </>
  );
}
