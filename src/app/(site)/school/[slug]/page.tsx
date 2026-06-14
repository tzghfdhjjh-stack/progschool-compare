import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getAllSchoolSlugs, fetchSchoolBySlug } from '@/lib/microcms';
import { calcOverallScore, SCORING_WEIGHTS } from '@/lib/scoring';
import { AffiliateCTA } from '@/components/common/AffiliateCTA';
import { StarRating } from '@/components/common/StarRating';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { UpdateBadge } from '@/components/common/UpdateBadge';
import { ScoreBar } from '@/components/ranking/ScoreBar';
import { generateProductLD, generateBreadcrumbLD } from '@/lib/structured-data';

export async function generateStaticParams() {
  const slugs = await getAllSchoolSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const school = await fetchSchoolBySlug(slug);
  if (!school) return {};
  return {
    title: `${school.name}の評判・料金・口コミ【独自採点】`,
    description: `${school.name}の料金・カリキュラム・転職率・サポートを独自スコアで評価。実際の受講者の声も掲載。`,
  };
}

function formatPrice(price: number) {
  return `¥${(price / 10000).toFixed(0)}万円`;
}

export default async function SchoolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const school = await fetchSchoolBySlug(slug);
  if (!school) notFound();

  const score = calcOverallScore(school.reviewScore);
  const productLD = generateProductLD({ ...school, overallScore: score });
  const breadcrumbLD = generateBreadcrumbLD([
    { name: 'トップ', url: '/' },
    { name: 'ランキング', url: '/ranking/' },
    { name: school.name, url: `/school/${school.slug}/` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([productLD, breadcrumbLD]) }}
      />

      <Breadcrumb
        items={[
          { label: 'トップ', href: '/' },
          { label: 'ランキング', href: '/ranking/' },
          { label: school.name },
        ]}
      />

      <div className="mt-4 flex items-start gap-4">
        <div className="relative h-12 w-36 shrink-0">
          <Image
            src={school.logo.url}
            alt={`${school.name} ロゴ`}
            fill
            className="object-contain object-left"
            sizes="144px"
            priority
          />
        </div>
        <div className="min-w-0">
          <h1 className="text-xl font-black text-gray-800">{school.name}</h1>
          <p className="text-sm text-gray-600">{school.catchphrase}</p>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-4">
        <StarRating score={score} size="lg" />
        <span className="text-sm text-gray-500">（{school.reviewCount}件）</span>
        <UpdateBadge date={school.updatedAt} />
      </div>

      <div className="mt-5">
        <AffiliateCTA
          href={school.affiliateUrl}
          schoolName={school.name}
          label="無料相談・公式サイトを見る"
          size="lg"
        />
      </div>

      <section className="mt-8 rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 font-bold text-gray-800">独自スコア詳細</h2>
        <div className="space-y-3">
          <ScoreBar
            label="カリキュラム"
            score={school.reviewScore.curriculum}
            weight={SCORING_WEIGHTS.curriculum}
          />
          <ScoreBar
            label="料金"
            score={school.reviewScore.price}
            weight={SCORING_WEIGHTS.price}
          />
          <ScoreBar
            label="サポート"
            score={school.reviewScore.support}
            weight={SCORING_WEIGHTS.support}
          />
          <ScoreBar
            label="口コミ"
            score={school.reviewScore.userReview}
            weight={SCORING_WEIGHTS.userReview}
          />
        </div>
        <p className="mt-4 text-right text-xs text-gray-400">
          総合スコア = カリキュラム×0.30 + 料金×0.25 + サポート×0.25 + 口コミ×0.20
        </p>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-green-200 bg-green-50 p-4">
          <h3 className="mb-2 font-bold text-green-800">おすすめポイント</h3>
          <ul className="space-y-1">
            {school.pros.map((pro) => (
              <li key={pro} className="flex items-start gap-2 text-sm text-green-700">
                <span className="mt-0.5 shrink-0">✓</span>
                {pro}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-red-100 bg-red-50 p-4">
          <h3 className="mb-2 font-bold text-red-800">気になる点</h3>
          <ul className="space-y-1">
            {school.cons.map((con) => (
              <li key={con} className="flex items-start gap-2 text-sm text-red-700">
                <span className="mt-0.5 shrink-0">△</span>
                {con}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 font-bold text-gray-800">基本情報</h2>
        <dl className="grid grid-cols-2 gap-3 text-sm md:grid-cols-3">
          <div>
            <dt className="text-xs text-gray-500">料金（税込）</dt>
            <dd className="font-medium text-gray-800">
              {formatPrice(school.price.basePrice)}〜
            </dd>
          </div>
          <div>
            <dt className="text-xs text-gray-500">受講形式</dt>
            <dd className="font-medium text-gray-800">
              {school.format.map((f) => ({ online: 'オンライン', offline: '通学', hybrid: 'ハイブリッド' }[f])).join('・')}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-gray-500">給付金対象</dt>
            <dd className="font-medium text-gray-800">
              {school.price.subsidyAvailable ? '対象あり' : 'なし'}
            </dd>
          </div>
          {school.results.jobChangeRate && (
            <div>
              <dt className="text-xs text-gray-500">転職率</dt>
              <dd className="font-bold text-blue-700">{school.results.jobChangeRate}%</dd>
            </div>
          )}
          <div>
            <dt className="text-xs text-gray-500">無料体験</dt>
            <dd className="font-medium text-gray-800">
              {school.freeTrial ? school.freeTrialDetail ?? 'あり' : 'なし'}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-gray-500">総学習時間</dt>
            <dd className="font-medium text-gray-800">約{school.curriculum.totalHours}時間</dd>
          </div>
        </dl>
      </section>

      <div className="mt-8">
        <AffiliateCTA
          href={school.affiliateUrl}
          schoolName={school.name}
          label="公式サイトで詳細を確認する"
          size="lg"
        />
      </div>
    </>
  );
}
