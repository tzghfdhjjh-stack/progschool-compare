interface StarRatingProps {
  score: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
}

export function StarRating({ score, max = 5, size = 'md', showNumber = true }: StarRatingProps) {
  const sizeClass = { sm: 'h-3 w-3', md: 'h-4 w-4', lg: 'h-5 w-5' }[size];
  const textClass = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' }[size];

  return (
    <div className="flex items-center gap-1">
      <div className="flex" role="img" aria-label={`${score}点 / ${max}点満点`}>
        {Array.from({ length: max }, (_, i) => {
          const filled = i + 1 <= Math.floor(score);
          const partial = !filled && i < score;
          return (
            <svg
              key={i}
              className={`${sizeClass} ${filled ? 'text-yellow-400' : partial ? 'text-yellow-300' : 'text-gray-200'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          );
        })}
      </div>
      {showNumber && (
        <span className={`font-bold text-gray-800 ${textClass}`}>{score.toFixed(1)}</span>
      )}
    </div>
  );
}
