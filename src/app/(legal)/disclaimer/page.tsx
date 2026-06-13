import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '免責事項 | プログラミングスクール比較Lab',
  description: '当サイトの免責事項です。',
  robots: { index: false, follow: false },
};

export default function DisclaimerPage() {
  return (
    <article className="prose prose-sm max-w-none">
      <h1>免責事項</h1>
      <p>
        当サイトの情報は一般的な情報提供を目的としており、特定のスクールへの入学を推奨するものではありません。
        掲載情報の正確性・完全性について、当サイトは一切の保証を行いません。
      </p>
      <p>
        スクールの選択・入学はご自身の判断と責任において行ってください。
        当サイトを利用したことで生じたいかなる損害についても、当サイトは責任を負いません。
      </p>
      <p>
        当サイトはアフィリエイト広告を利用しています。リンクからのご購入・お問い合わせにより、
        当サイトが収益を得ることがありますが、これはランキングや評価に影響しません。
      </p>
    </article>
  );
}
