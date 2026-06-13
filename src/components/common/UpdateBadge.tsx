import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

interface UpdateBadgeProps {
  date: string;
}

export function UpdateBadge({ date }: UpdateBadgeProps) {
  const formatted = format(new Date(date), 'yyyy年M月d日', { locale: ja });

  return (
    <div className="flex items-center gap-1 text-xs text-gray-500">
      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <time dateTime={date}>最終更新: {formatted}</time>
    </div>
  );
}
