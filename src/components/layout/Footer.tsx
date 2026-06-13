import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <p className="mb-3 text-sm font-bold text-gray-800">ランキング</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/ranking/" className="hover:text-blue-600">総合ランキング</Link></li>
              <li><Link href="/ranking/career/" className="hover:text-blue-600">転職向け</Link></li>
              <li><Link href="/ranking/side/" className="hover:text-blue-600">副業向け</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-bold text-gray-800">比較・ツール</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/compare/" className="hover:text-blue-600">スクール比較表</Link></li>
              <li><Link href="/tools/cost-simulator/" className="hover:text-blue-600">費用シミュレーター</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-bold text-gray-800">選び方ガイド</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/guide/career/" className="hover:text-blue-600">転職したい方へ</Link></li>
              <li><Link href="/guide/side/" className="hover:text-blue-600">副業したい方へ</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-bold text-gray-800">サイト情報</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/about/" className="hover:text-blue-600">サイトについて</Link></li>
              <li><Link href="/disclaimer/" className="hover:text-blue-600">免責事項</Link></li>
              <li><Link href="/privacy/" className="hover:text-blue-600">プライバシーポリシー</Link></li>
              <li><Link href="/contact/" className="hover:text-blue-600">お問い合わせ</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-center text-xs text-gray-500">
            当サイトはアフィリエイト広告（Amazonアソシエイト等）を利用しています。
            掲載情報は定期的に更新しておりますが、最新情報は各スクール公式サイトをご確認ください。
          </p>
          <p className="mt-2 text-center text-xs text-gray-400">
            &copy; {new Date().getFullYear()} ProgSchool比較Lab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
