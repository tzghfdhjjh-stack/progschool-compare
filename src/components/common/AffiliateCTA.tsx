'use client';

import Link from 'next/link';

interface AffiliateCTAProps {
  href: string;
  schoolName: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function AffiliateCTA({
  href,
  schoolName,
  label = '公式サイトを見る',
  size = 'md',
  className = '',
}: AffiliateCTAProps) {
  const sizeClass = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }[size];

  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <Link
        href={href}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className={`inline-flex items-center justify-center rounded-lg bg-orange-500 font-bold text-white transition-colors hover:bg-orange-600 ${sizeClass}`}
      >
        {label}
        <svg
          className="ml-2 h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </Link>
      <p className="text-xs text-gray-500">
        <span className="rounded bg-gray-100 px-1 py-0.5 font-medium text-gray-600">広告</span>{' '}
        {schoolName}の公式サイトへ移動します
      </p>
    </div>
  );
}
