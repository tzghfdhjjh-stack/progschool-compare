interface ScoreBarProps {
  label: string;
  score: number;
  weight: number;
  max?: number;
}

export function ScoreBar({ label, score, weight, max = 5 }: ScoreBarProps) {
  const pct = (score / max) * 100;

  return (
    <div className="flex items-center gap-3">
      <div className="w-24 shrink-0 text-right text-xs text-gray-600">{label}</div>
      <div className="relative h-2 flex-1 rounded-full bg-gray-100">
        <div
          className="h-2 rounded-full bg-blue-500 transition-all"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={score}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
      <div className="w-8 shrink-0 text-xs font-bold text-gray-700">{score.toFixed(1)}</div>
      <div className="w-12 shrink-0 text-right text-xs text-gray-400">×{weight}</div>
    </div>
  );
}
