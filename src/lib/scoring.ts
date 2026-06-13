import type { ReviewScore, School } from '@/types/school';

export const SCORING_WEIGHTS = {
  curriculum: 0.30,
  price: 0.25,
  support: 0.25,
  userReview: 0.20,
} as const;

export function calcOverallScore(score: ReviewScore): number {
  return parseFloat((
    score.curriculum * SCORING_WEIGHTS.curriculum +
    score.price * SCORING_WEIGHTS.price +
    score.support * SCORING_WEIGHTS.support +
    score.userReview * SCORING_WEIGHTS.userReview
  ).toFixed(2));
}

export function rankSchools(schools: School[]): School[] {
  return [...schools]
    .map((s) => ({ ...s, overallScore: calcOverallScore(s.reviewScore) }))
    .sort((a, b) => (b.overallScore ?? 0) - (a.overallScore ?? 0))
    .map((s, i) => ({ ...s, rank: i + 1 }));
}

export function formatScore(score: number): string {
  return score.toFixed(1);
}

export function getScoreColor(score: number): string {
  if (score >= 4.5) return 'text-green-600';
  if (score >= 4.0) return 'text-blue-600';
  if (score >= 3.5) return 'text-yellow-600';
  return 'text-gray-600';
}
