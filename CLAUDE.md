# nobinobi9000.github.io（nobi-labo.com）

## プロジェクト概要

nobi-labo の本番サイト。個人開発アプリのポータル + Notion ブログ + note 記事統合サイト。

- 公開URL: https://nobi-labo.com
- デプロイ先: Vercel

## 技術スタック

| 項目 | 内容 |
|------|------|
| フレームワーク | Next.js 16 / React 19 / TypeScript |
| CSS | Tailwind CSS v3（tailwind.config.ts） |
| コンテンツ | Notion API（@notionhq/client） |
| メール送信 | Nodemailer + Gmail SMTP |
| アナリティクス | @vercel/analytics |
| デプロイ | Vercel |

## 主要コマンド

```bash
npm run dev      # 開発サーバー起動
npm run build    # ビルド・型チェック
vercel deploy --prod --yes  # 本番デプロイ（Desktop\Claude\ 直下で実行）
```

---

## デザインシステム（カラー）

Tailwind v3 のカスタムカラー（`tailwind.config.ts`）。クラス名で使用する。

| 用途 | クラス名 | HEX |
|------|---------|-----|
| プライマリ（緑） | `text-primary` / `bg-primary` | `#2D6A4F` |
| プライマリ濃い | `bg-primary-dark` | `#21503b` |
| プライマリ薄い | `bg-primary-light` | `#F0F7F4` |
| 本文（黒） | `text-ink` | `#111111` |
| 本文（グレー） | `text-ink2` | `#444444` |
| ミュート | `text-muted` | `#999999` |
| ボーダー | `border-border` | `#EBEBEB` |

### カテゴリカラー（インライン指定）

Tailwindに登録していないためインラインで指定する。

| カテゴリ | テキスト | 背景 |
|---------|---------|------|
| Life | `#2563EB` | `#F0F5FF` |
| Money | `#92400E` | `#FBF4EC` |
| Work | `#6D28D9` | `#F5F1FC` |
| Blog badge | `#2D6A4F` | `#F0F7F4` |
| nobi¹ badge | `#00B899` | `#E6F8F3` |
| nobi² badge | `#E8384F` | `#FDEEF0` |

---

## ページ構成

| URL | ファイル | 内容 |
|-----|---------|------|
| `/` | `app/page.tsx` | ホーム（Hero / カテゴリ / Pickup / コラム / About） |
| `/apps` | `app/apps/page.tsx` | アプリ一覧（カテゴリフィルター付き） |
| `/column` | `app/column/page.tsx` | コラム（Blog + note 統合） |
| `/about` | `app/about/page.tsx` | Aboutページ |
| `/contact` | `app/contact/page.tsx` | お問い合わせ |
| `/privacy` | `app/privacy/page.tsx` | プライバシーポリシー |
| `/blog/[id]` | `app/blog/[id]/page.tsx` | Notion ブログ記事詳細 |
| `/comic-checker` | `app/comic-checker/page.tsx` | アプリ詳細 |
| `/questlog` | `app/questlog/page.tsx` | アプリ詳細 |
| `/mebae` | `app/mebae/page.tsx` | アプリ詳細 |
| `/sorosoro` | `app/sorosoro/page.tsx` | アプリ詳細 |
| `/nekoojiisan-timer` | `app/nekoojiisan-timer/page.tsx` | アプリ詳細 |
| `/subshari` | `app/subshari/page.tsx` | アプリ詳細 |
| `/kabu-note` | `app/kabu-note/page.tsx` | アプリ詳細 |
| `/tax-simulator` | `app/tax-simulator/page.tsx` | アプリ詳細（実アプリは `/tax-simulator/`） |
| `/japan-stock-screener` | `app/japan-stock-screener/page.tsx` | アプリ詳細（実アプリは `/japan-stock-screener/`） |
| `/legalgen` | `app/legalgen/page.tsx` | アプリ詳細 |

### 既存URLの維持（変更禁止）

```
https://nobi-labo.com/todo-manager-app/
https://nobi-labo.com/meeting-timer
https://nobi-labo.com/tax-simulator/
https://nobi-labo.com/japan-stock-screener/
```

---

## 共通コンポーネント

| ファイル | 内容 |
|---------|------|
| `components/Nav.tsx` | ナビゲーション（sticky、アクティブ状態自動判定） |
| `components/Footer.tsx` | フッター |
| `components/AppCarousel.tsx` | アプリ詳細ページのスクリーンショットカルーセル（3秒自動切替） |
| `app/layout.tsx` | 全ページ共通レイアウト（Nav + Footer + Analytics） |

---

## アプリデータ（lib/apps.ts）

全アプリの情報は `lib/apps.ts` で一元管理。

### App 型

```ts
type App = {
  name: string
  desc: string
  story?: string
  tags: string[]
  ctaUrl: string | null   // null = 準備中（ボタン非表示）
  detailUrl: string
  category: 'Life' | 'Money' | 'Work'
  screenshot?: string     // public/ からの相対パス
  tint: string            // カテゴリ背景色（例: '#F0F5FF'）
  catColor: string        // カテゴリ文字色（例: '#2563EB'）
}
```

### 新アプリを追加するとき

1. `lib/apps.ts` の `APPS` 配列に追記
2. `/public/screenshots/` にスクリーンショットを追加
3. `app/[アプリ名]/page.tsx` に詳細ページを作成（以下のテンプレートを参照）
4. ホームページの `CATEGORIES`・`PICKUP_NAMES` を必要に応じて更新

### アプリ詳細ページのテンプレート構造

```
breadcrumb（nobi-labo > Apps > アプリ名）
↓
Hero（カテゴリバッジ・タイトル・説明・タグ・今すぐ使うCTA + AppCarousel）
↓
STORY セクション（bg: #F7F7F7、blockquote + 説明文）
↓
FEATURES セクション（01〜04 のカード グリッド）
↓
Bottom CTA（bg: #F0F7F4、見出し + 今すぐ使うボタン）
```

### AppCarousel の使い方

```tsx
import AppCarousel from '@/components/AppCarousel'

const SLIDES = [
  { src: '/screenshots/xxx.png', caption: 'キャプション' },
]

// 詳細ページ内の Hero の右カラムに配置
<AppCarousel slides={SLIDES} accentColor="#2563EB" bgColor="#F0F5FF" />
```

- `accentColor`: カテゴリのテキストカラー
- `bgColor`: カテゴリの背景カラー
- スライドが1枚のとき自動切替なし、複数枚で3秒自動切替

---

## note API 連携（コラム・ホーム）

- `app/column/page.tsx`：2アカウント × 最大15ページを非同期並列取得
- `app/page.tsx`：各アカウントの1ページ目（最新10件）を取得してBlogと混在表示
- キャッシュ: `revalidate: 3600`（1時間）

### note アカウント

| 変数名 | アカウント | バッジ | 色 |
|-------|----------|--------|-----|
| nobi1 | suzukidaichisan | nobi¹ | `#00B899` |
| nobi2 | nobi9000nobi | nobi² | `#E8384F` |

---

## お問い合わせフォーム（/api/contact）

- Nodemailer + Gmail SMTP で送信
- 送信先: `info@nobi-labo.com`（Cloudflare Email Routing → Gmail に転送）
- 環境変数: `GMAIL_USER` / `GMAIL_APP_PASSWORD`

---

## 注意事項

- `app/subshari/` はミラーコピーのため**編集禁止**。subshari の変更は `../subshari/` フォルダで行う
- 本番デプロイ前に必ずユーザーに確認を取ること
- Tailwind v4 は Next.js 16 Turbopack と互換性問題あり → **v3 を使うこと**
- `/japan-stock-screener/`（スラッシュあり）は GitHub Pages へのリダイレクト。`/japan-stock-screener`（スラッシュなし）が詳細ページ
- `app/tax-simulator/page.tsx` = 詳細ページ。`/public/tax-simulator/index.html` = 実際のアプリ（別物）

---

## 外部記憶システム

このセッション開始時に以下のファイルを必ず読み込むこと：

1. `C:\Users\tkouno\Documents\obsidian-vault\claude-memory\mistakes-global.md` — 過去のミス記録
2. `C:\Users\tkouno\Documents\obsidian-vault\claude-memory\preferences.md` — 開発スタイル・好み
3. `C:\Users\tkouno\Documents\obsidian-vault\claude-memory\projects\nobinobi9000-github-io.md` — このプロジェクトのメモ
