'use client';

import { useState, useMemo } from 'react';
import type { School, FilterState, SortState } from '@/types/school';
import { calcOverallScore } from '@/lib/scoring';
import { FilterPanel } from './FilterPanel';
import { RankingCard } from '@/components/ranking/RankingCard';

const DEFAULT_FILTER: FilterState = {
  purpose: null,
  level: null,
  format: null,
  maxPrice: null,
  freeTrial: false,
  subsidyAvailable: false,
};

interface CompareTableProps {
  schools: School[];
}

function applyFilter(schools: School[], filter: FilterState): School[] {
  return schools.filter((s) => {
    if (filter.purpose && !s.purpose.includes(filter.purpose)) return false;
    if (filter.level && !s.targetLevel.includes(filter.level)) return false;
    if (filter.format && !s.format.includes(filter.format)) return false;
    if (filter.maxPrice && s.price.basePrice > filter.maxPrice) return false;
    if (filter.freeTrial && !s.freeTrial) return false;
    if (filter.subsidyAvailable && !s.price.subsidyAvailable) return false;
    return true;
  });
}

function applySort(schools: School[], sort: SortState): School[] {
  return [...schools].sort((a, b) => {
    let aVal: number;
    let bVal: number;
    if (sort.key === 'score') {
      aVal = a.overallScore ?? calcOverallScore(a.reviewScore);
      bVal = b.overallScore ?? calcOverallScore(b.reviewScore);
    } else if (sort.key === 'price') {
      aVal = a.price.basePrice;
      bVal = b.price.basePrice;
    } else {
      aVal = a.rank ?? 999;
      bVal = b.rank ?? 999;
    }
    return sort.direction === 'asc' ? aVal - bVal : bVal - aVal;
  });
}

export function CompareTable({ schools }: CompareTableProps) {
  const [filter, setFilter] = useState<FilterState>(DEFAULT_FILTER);
  const [sort, setSort] = useState<SortState>({ key: 'score', direction: 'desc' });

  const displayed = useMemo(
    () => applySort(applyFilter(schools, filter), sort),
    [schools, filter, sort],
  );

  const toggleSort = (key: string) => {
    setSort((prev) =>
      prev.key === key
        ? { key, direction: prev.direction === 'desc' ? 'asc' : 'desc' }
        : { key, direction: 'desc' },
    );
  };

  return (
    <div className="space-y-6">
      <FilterPanel filter={filter} onChange={setFilter} />

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          <strong>{displayed.length}</strong> 件のスクール
        </p>
        <div className="flex gap-2 text-sm">
          {[
            { key: 'score', label: 'おすすめ順' },
            { key: 'price', label: '料金の安い順' },
          ].map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => toggleSort(s.key)}
              className={`rounded-lg border px-3 py-1 ${
                sort.key === s.key
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-gray-200 text-gray-600 hover:border-gray-400'
              }`}
            >
              {s.label}
              {sort.key === s.key && (sort.direction === 'desc' ? ' ↓' : ' ↑')}
            </button>
          ))}
        </div>
      </div>

      {displayed.length === 0 ? (
        <p className="py-12 text-center text-gray-500">条件に合うスクールが見つかりませんでした。絞り込みを変更してください。</p>
      ) : (
        <div className="space-y-4">
          {displayed.map((school, i) => (
            <RankingCard key={school.id} school={{ ...school, rank: i + 1 }} />
          ))}
        </div>
      )}
    </div>
  );
}
