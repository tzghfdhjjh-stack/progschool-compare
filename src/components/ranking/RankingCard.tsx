import Image from 'next/image';
import Link from 'next/link';
import type { School } from '@/types/school';
import { AffiliateCTA } from '@/components/common/AffiliateCTA';
import { StarRating } from '@/components/common/StarRating';
import { calcOverallScore } from '@/lib/scoring';

interface RankingCardProps {
  school: School;
}

const RANK_COLORS: Record<number, string> = {
  1: 'bg-yellow-400 text-white',
  2: 'bg-gray-300 text-gray-800',
  3: 'bg-orange-400 text-white',
};

function formatPrice(price: number): string {
  return `¥${(price / 10000).toFixed(0)}万円`;
}

export function RankingCard({ school }: RankingCardProps) {
  const score = school.overallScore ?? calcOverallScore(school.reviewScore);
  const rankColor = RANK_COLORS[school.rank ?? 99] ?? 'bg-gray-100 text-gray-700';

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start gap-4">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-black ${rankColor}`}
          aria-label={`第${school.rank}位`}
        >
          {school.rank}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            {school.logo?.url && (
              <div className="relative h-8 w-28">
                <Image
                  src={school.logo.url}
                  alt={`${school.name} ロゴ`}
                  fill
                  className="object-contain object-left"
                  sizes="112px"
                />
              </div>
            )}
            <h2 className="font-bold text-gray-900">{school.name}</h2>
          </div>

          <p className="mt-1 text-sm text-gray-600">{school.catchphrase}</p>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
            <StarRating score={score} />
            <span className="text-gray-500">
              料金: <strong className="text-gray-800">{formatPrice(school.price.basePrice)}〜</strong>
            </span>
            {school.results.jobChangeRate && (
              <span className="text-gray-500">
                転職率: <strong className="text-blue-600">{school.results.jobChangeRate}%</strong>
              </span>
            )}
          </div>

          <ul className="mt-3 flex flex-wrap gap-2">
            {school.pros.slice(0, 3).map((pro) => (
              <li
                key={pro}
                className="rounded-full bg-green-50 px-3 py-0.5 text-xs text-green-700"
              >
                ✓ {pro}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
        <Link
          href={`/school/${school.slug}/`}
          className="text-sm text-blue-600 hover:underline"
        >
          詳細レビューを読む →
        </Link>
        <AffiliateCTA
          href={school.affiliateUrl}
          schoolName={school.name}
          label="無料相談・公式サイト"
          size="sm"
        />
      </div>
    </article>
  );
}
