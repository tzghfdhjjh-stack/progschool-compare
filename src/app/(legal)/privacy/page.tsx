import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プライバシーポリシー | プログラミングスクール比較Lab',
  description: '当サイトのプライバシーポリシーです。',
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <article className="prose prose-sm max-w-none">
      <h1>プライバシーポリシー</h1>

      <h2>個人情報の取り扱い</h2>
      <p>
        当サイトでは、お問い合わせフォームから送信いただいた情報（氏名・メールアドレス等）を、
        お問い合わせへの回答のみを目的として利用します。第三者への提供は行いません。
      </p>

      <h2>アクセス解析</h2>
      <p>
        当サイトではGoogle Analyticsを使用してアクセス情報を収集しています。
        Google Analyticsはクッキーを使用しますが、個人を特定する情報は収集しません。
        データ収集を無効にするには、Google Analyticsオプトアウトアドオンをご利用ください。
      </p>

      <h2>Cookie（クッキー）</h2>
      <p>
        当サイトはアクセス解析・アフィリエイトのためにクッキーを使用します。
        ブラウザの設定でクッキーを無効にすることができますが、一部機能が利用できなくなる場合があります。
      </p>
    </article>
  );
}
