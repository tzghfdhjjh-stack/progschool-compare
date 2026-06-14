import Link from 'next/link';
import type { Metadata } from 'next';
import { fetchSchools } from '@/lib/microcms';
import { rankSchools } from '@/lib/scoring';
import { RankingCard } from '@/components/ranking/RankingCard';
import { generateItemListLD } from '@/lib/structured-data';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'プログラミングスクール比較Lab | 全スクールを独自スコアで比較',
  description: '未経験からエンジニアへ。料金・カリキュラム・転職率・サポートを独自スコアで徹底比較。透明な採点基準でスクール選びをサポートします。',
};

export default async function TopPage() {
  const schools = await fetchSchools({ limit: 20, orders: '-curriculumScore' });
  const ranked = rankSchools(schools).slice(0, 3);
  const itemListLD = generateItemListLD(ranked, 'おすすめプログラミングスクールランキング');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLD) }}
      />

      <section className="mb-10 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 px-6 py-10 text-white">
        <h1 className="text-2xl font-black leading-tight md:text-3xl">
          プログラミングスクールを
          <br />
          <span className="text-yellow-300">透明な採点で</span>比較する
        </h1>
        <p className="mt-3 text-blue-100">
          料金・カリキュラム・転職率・サポートを独自の4軸スコアで評価。
          ステルスマーケティングなし、根拠のある比較情報をお届けします。
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/ranking/"
            className="rounded-lg bg-white px-5 py-2.5 font-bold text-blue-700 hover:bg-blue-50"
          >
            ランキングを見る
          </Link>
          <Link
            href="/compare/"
            className="rounded-lg border border-white px-5 py-2.5 font-bold text-white hover:bg-blue-700"
          >
            スクールを絞り込む
          </Link>
        </div>
      </section>

      <section className="mb-8 grid grid-cols-3 gap-4 rounded-xl border border-blue-100 bg-blue-50 p-4 text-center">
        <div>
          <p className="text-2xl font-black text-blue-700">4軸</p>
          <p className="text-xs text-gray-600">独自スコア評価</p>
        </div>
        <div>
          <p className="text-2xl font-black text-blue-700">月次</p>
          <p className="text-xs text-gray-600">料金更新保証</p>
        </div>
        <div>
          <p className="text-2xl font-black text-blue-700">広告明示</p>
          <p className="text-xs text-gray-600">ステマなし</p>
        </div>
      </section>

      <section className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-black text-gray-800">総合ランキング TOP3</h2>
          <Link href="/ranking/" className="text-sm text-blue-600 hover:underline">
            すべて見る →
          </Link>
        </div>
        <div className="space-y-4">
          {ranked.map((school) => (
            <RankingCard key={school.id} school={school} />
          ))}
        </div>
      </section>

      <section className="mb-10 grid gap-4 md:grid-cols-3">
        <Link
          href="/compare/"
          className="flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="text-2xl">⚖️</div>
          <h3 className="font-bold text-gray-800">スクール比較表</h3>
          <p className="text-sm text-gray-600">目的・経験・形式で絞り込んでスクールを比較</p>
        </Link>
        <Link
          href="/tools/cost-simulator/"
          className="flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="text-2xl">💰</div>
          <h3 className="font-bold text-gray-800">費用シミュレーター</h3>
          <p className="text-sm text-gray-600">給付金・分割手数料込みの実質費用を計算</p>
        </Link>
        <Link
          href="/guide/career/ruby/"
          className="flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="text-2xl">📖</div>
          <h3 className="font-bold text-gray-800">選び方ガイド</h3>
          <p className="text-sm text-gray-600">目的・言語別にスクールの選び方を解説</p>
        </Link>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-3 font-bold text-gray-800">採点基準の透明性について</h2>
        <p className="text-sm text-gray-600">
          当サイトのスコアは <strong>カリキュラム×0.30 + 料金×0.25 + サポート×0.25 + 口コミ×0.20</strong> で算出しています。
          ランキングはアフィリエイト報酬ではなくスコアのみに基づいており、採点根拠は各スクール詳細ページで公開しています。
        </p>
      </section>
    </>
  );
}
