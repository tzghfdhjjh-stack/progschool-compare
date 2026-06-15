# microCMS セットアップガイド

## 1. microCMSアカウント作成

1. https://microcms.io にアクセスしてアカウント作成（無料プランでOK）
2. サービスを作成 → サービスID（例: `progschool-compare`）を設定

## 2. `schools` APIの作成

「APIを追加」→「自分でカスタマイズ」→ APIスキーマを以下の通り設定：

### APIの基本設定
- **API名**: スクール
- **エンドポイント**: `schools`
- **APIの種類**: リスト形式

### フィールド定義

| フィールドID | 表示名 | 種類 | 必須 |
|------------|------|------|------|
| `name` | スクール名 | テキストフィールド | ✓ |
| `slug` | スラッグ（URL用） | テキストフィールド | ✓ |
| `logo` | ロゴ画像 | 画像 | ✓ |
| `officialUrl` | 公式URL | テキストフィールド | ✓ |
| `affiliateUrl` | アフィリエイトURL | テキストフィールド | ✓ |
| `catchphrase` | キャッチコピー | テキストフィールド | ✓ |
| `description` | 説明文 | テキストエリア | ✓ |
| `basePrice` | 基本料金（円） | 数値フィールド | ✓ |
| `maxPrice` | 最高料金（円） | 数値フィールド | |
| `hasInstallment` | 分割払い可 | 真偽値 | |
| `installmentMonths` | 分割回数 | 数値フィールド | |
| `installmentFeeRate` | 分割手数料率 | 数値フィールド | |
| `subsidyAvailable` | 給付金対象 | 真偽値 | |
| `languages` | 学習言語 | テキストフィールド（複数） | |
| `frameworks` | フレームワーク | テキストフィールド（複数） | |
| `hasPortfolio` | ポートフォリオあり | 真偽値 | |
| `totalHours` | 総学習時間 | 数値フィールド | |
| `hasMentor` | メンターあり | 真偽値 | |
| `jobSupport` | 就職サポートあり | 真偽値 | |
| `jobSupportDetail` | 就職サポート詳細 | テキストフィールド | |
| `mentorResponse` | メンター返答速度 | テキストフィールド | |
| `supportHours` | サポート時間 | テキストフィールド | |
| `jobChangeRate` | 転職率（%） | 数値フィールド | |
| `satisfactionRate` | 満足度（%） | 数値フィールド | |
| `graduatesCount` | 卒業生数 | 数値フィールド | |
| `format` | 受講形式 | セレクトフィールド（online/offline/hybrid） | ✓ |
| `purpose` | 目的 | セレクトフィールド（career/side/skill） | ✓ |
| `targetLevel` | 対象レベル | セレクトフィールド（beginner/intermediate/advanced） | ✓ |
| `freeTrial` | 無料体験あり | 真偽値 | |
| `freeTrialDetail` | 無料体験詳細 | テキストフィールド | |
| `pros` | おすすめポイント | テキストフィールド（複数） | |
| `cons` | 気になる点 | テキストフィールド（複数） | |
| `curriculumScore` | カリキュラムスコア（1.0〜5.0） | 数値フィールド | ✓ |
| `priceScore` | 料金スコア（1.0〜5.0） | 数値フィールド | ✓ |
| `supportScore` | サポートスコア（1.0〜5.0） | 数値フィールド | ✓ |
| `userReviewScore` | 口コミスコア（1.0〜5.0） | 数値フィールド | ✓ |
| `reviewCount` | 口コミ件数 | 数値フィールド | |

## 3. APIキーの取得

「API設定」→「APIキー」→ キーをコピー

## 4. 環境変数の設定

### ローカル開発 (.env.local)
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
MICROCMS_SERVICE_DOMAIN=your-service-id（例: progschool-compare）
MICROCMS_API_KEY=xxxxxxxxxxxxxxxxxxxx
MICROCMS_WEBHOOK_SECRET=your-random-secret-string
```

### Vercel環境変数
Vercelダッシュボード → Settings → Environment Variables で同じ値を設定。
`NEXT_PUBLIC_SITE_URL` は本番URLに変更（例: `https://progschool-compare.vercel.app`）

## 5. WebhookでISR自動更新

microCMS管理画面 → API設定 → Webhook →「追加」

- **URL**: `https://your-vercel-url.vercel.app/api/revalidate`
- **シークレット**: `.env.local`の`MICROCMS_WEBHOOK_SECRET`と同じ値
- **イベント**: コンテンツの公開・更新・削除

## 6. microCMSのデータをコードと接続する

現在 `src/lib/microcms.ts` はmicroCMSを参照するよう実装済みですが、
`src/lib/sample-data.ts` のサンプルデータを使っています。

本番データへの切り替えは `src/app/(site)/ranking/page.tsx` などの
ページファイルで以下のように変更：

```typescript
// 現在（サンプルデータ）
import { SAMPLE_SCHOOLS } from '@/lib/sample-data';
const schools = rankSchools(SAMPLE_SCHOOLS);

// microCMS接続後
import { getSchools } from '@/lib/microcms';
const { contents } = await getSchools({ limit: 20, orders: '-updatedAt' });
const schools = rankSchools(contents);
```
