import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-blue-700">ProgSchool</span>
          <span className="hidden text-sm text-gray-500 sm:block">比較Lab</span>
        </Link>

        <nav className="hidden gap-6 text-sm font-medium md:flex">
          <Link href="/ranking/" className="text-gray-700 hover:text-blue-600">ランキング</Link>
          <Link href="/compare/" className="text-gray-700 hover:text-blue-600">スクール比較</Link>
          <Link href="/guide/career/ruby/" className="text-gray-700 hover:text-blue-600">選び方ガイド</Link>
          <Link href="/tools/cost-simulator/" className="text-gray-700 hover:text-blue-600">費用シミュレーター</Link>
        </nav>

        <Link
          href="/ranking/"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700 md:hidden"
        >
          ランキングを見る
        </Link>
      </div>
    </header>
  );
}
