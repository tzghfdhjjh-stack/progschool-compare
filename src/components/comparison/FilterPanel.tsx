'use client';

import type { FilterState, SchoolPurpose, SchoolLevel, SchoolFormat } from '@/types/school';

interface FilterPanelProps {
  filter: FilterState;
  onChange: (next: FilterState) => void;
}

const PURPOSES: { value: SchoolPurpose; label: string }[] = [
  { value: 'career', label: '転職・就職' },
  { value: 'side', label: '副業・フリーランス' },
  { value: 'skill', label: 'スキルアップ' },
];

const LEVELS: { value: SchoolLevel; label: string }[] = [
  { value: 'beginner', label: '未経験・初心者' },
  { value: 'intermediate', label: '中級者' },
  { value: 'advanced', label: '上級者' },
];

const FORMATS: { value: SchoolFormat; label: string }[] = [
  { value: 'online', label: 'オンライン' },
  { value: 'offline', label: '通学' },
  { value: 'hybrid', label: 'ハイブリッド' },
];

function FilterChip<T extends string>({
  value,
  selected,
  label,
  onToggle,
}: {
  value: T;
  selected: boolean;
  label: string;
  onToggle: (v: T | null) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onToggle(selected ? null : value)}
      className={`rounded-full border px-3 py-1 text-sm font-medium transition-colors ${
        selected
          ? 'border-blue-600 bg-blue-600 text-white'
          : 'border-gray-300 bg-white text-gray-700 hover:border-blue-400'
      }`}
      aria-pressed={selected}
    >
      {label}
    </button>
  );
}

export function FilterPanel({ filter, onChange }: FilterPanelProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="mb-3 font-bold text-gray-800">絞り込み</h2>

      <div className="space-y-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">目的</p>
          <div className="flex flex-wrap gap-2">
            {PURPOSES.map((p) => (
              <FilterChip
                key={p.value}
                value={p.value}
                selected={filter.purpose === p.value}
                label={p.label}
                onToggle={(v) => onChange({ ...filter, purpose: v })}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">経験レベル</p>
          <div className="flex flex-wrap gap-2">
            {LEVELS.map((l) => (
              <FilterChip
                key={l.value}
                value={l.value}
                selected={filter.level === l.value}
                label={l.label}
                onToggle={(v) => onChange({ ...filter, level: v })}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">受講形式</p>
          <div className="flex flex-wrap gap-2">
            {FORMATS.map((f) => (
              <FilterChip
                key={f.value}
                value={f.value}
                selected={filter.format === f.value}
                label={f.label}
                onToggle={(v) => onChange({ ...filter, format: v })}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={filter.freeTrial}
              onChange={(e) => onChange({ ...filter, freeTrial: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-blue-600"
            />
            無料体験あり
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={filter.subsidyAvailable}
              onChange={(e) => onChange({ ...filter, subsidyAvailable: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-blue-600"
            />
            給付金対象
          </label>
        </div>
      </div>

      <button
        type="button"
        onClick={() =>
          onChange({
            purpose: null,
            level: null,
            format: null,
            maxPrice: null,
            freeTrial: false,
            subsidyAvailable: false,
          })
        }
        className="mt-3 text-xs text-gray-400 hover:text-gray-600 hover:underline"
      >
        条件をリセット
      </button>
    </div>
  );
}
