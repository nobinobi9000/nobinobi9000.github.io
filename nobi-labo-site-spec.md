# nobi-labo サイト仕様書

> 作成日：2026年3月26日
> 対象リポジトリ：`nobinobi9000/nobinobi9000.github.io`
> 本番URL：https://nobi-labo.com
> Vercelプロジェクト：`nobi-labo-site`（チーム：`nonobinoi9000s-projects`）

---

## 1. 技術スタック

| 項目 | 内容 |
|------|------|
| フレームワーク | Next.js 16.2.1（App Router） |
| UI | React 19 / TypeScript |
| フォント | Noto Sans JP（Google Fonts） |
| CMS | Notion API（`@notionhq/client` v2.2.15） |
| ホスティング | Vercel（GitHub連携 + 手動CLIデプロイ） |
| ドメイン | nobi-labo.com |
| PWA | manifest.json / apple-touch-icon.png / favicon.svg |

---

## 2. ディレクトリ構成

```
nobinobi9000.github.io/
├── app/
│   ├── layout.tsx              # 共通レイアウト（ヘッダー・フッター）
│   ├── globals.css             # グローバルスタイル（CSS変数定義含む）
│   ├── page.tsx                # トップページ（Server Component）
│   ├── HomeWithTabs.tsx        # APPSタブ・BLOGタブ切替（Client Component）
│   ├── blog/
│   │   ├── page.tsx            # ブログ一覧（未使用、タブに統合済み）
│   │   └── [id]/page.tsx       # ブログ記事詳細
│   ├── comic-checker/
│   │   └── page.tsx            # comic-checker 詳細紹介ページ
│   ├── nekoojiisan-timer/
│   │   ├── page.tsx            # ねこおじさんタイマー 詳細紹介ページ
│   │   └── CatSlideshow.tsx    # 猫画像スライドショー（Client Component）
│   ├── tax-simulator/          # （未作成 / public/tax-simulator.html で代替）
│   └── privacy/
│       └── page.tsx            # プライバシーポリシーページ
├── lib/
│   └── notion.ts               # Notion API連携ロジック
├── public/
│   ├── favicon.svg
│   ├── favicon-32.png
│   ├── apple-touch-icon.png
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── manifest.json
│   ├── japan-stock-screener.html  # 日本株スクリーナー 詳細紹介ページ（静的HTML）
│   ├── tax-simulator.html          # 確定申告シミュレーター 詳細紹介ページ（静的HTML）
│   ├── nekoojiisan-timer.html      # （旧静的HTML / Next.jsルートにリダイレクト）
│   ├── tax-simulator/
│   │   └── index.html              # 確定申告シミュレーター本体アプリ（静的HTML）
│   └── screenshots/                # comic-checkerのスクリーンショット画像
├── next.config.ts
└── package.json
```

---

## 3. ルーティング

| URL | 内容 | 種別 |
|-----|------|------|
| `/` | トップページ（APPSタブ・BLOGタブ） | Next.js |
| `/comic-checker` | comic-checker 詳細ページ | Next.js |
| `/nekoojiisan-timer` | ねこおじさんタイマー 詳細ページ | Next.js |
| `/privacy/` | プライバシーポリシー | Next.js |
| `/?tab=blog` | BLOGタブ表示（URLパラメータで状態管理） | Next.js |
| `/blog/[id]` | ブログ記事詳細 | Next.js |
| `/tax-simulator.html` | 確定申告シミュレーター 詳細紹介ページ | 静的HTML |
| `/tax-simulator/` | 確定申告シミュレーター 本体アプリ | 静的HTML |
| `/japan-stock-screener.html` | 日本株スクリーナー 詳細紹介ページ | 静的HTML |
| `/japan-stock-screener/` | 日本株スクリーナー本体（GitHub Pagesプロキシ） | リライト |

### リダイレクト（next.config.ts）
```
/comic-checker.html        → /comic-checker        (permanent)
/nekoojiisan-timer.html    → /nekoojiisan-timer     (permanent)
/privacy                   → /privacy/              (permanent)
```

### リライト（プロキシ）
```
/japan-stock-screener/:path*  → https://nobinobi9000.github.io/japan-stock-screener/:path*
```

---

## 4. 公開アプリ一覧

### 4-1. comic-checker
- **URL**：https://comic.nobi-labo.com（PWA / GitHub Pages）
- **詳細ページ**：`/comic-checker`
- **機能**：漫画の新刊発売日を追跡、Push通知、楽天連携、新刊カレンダー
- **タグ**：PWA、無料、Push通知、楽天連携

### 4-2. 確定申告・還付判定シミュレーター（令和7年版）
- **URL**：`/tax-simulator/`
- **詳細ページ**：`/tax-simulator.html`（静的HTML）
- **機能**：給与所得者の還付額を概算計算。登録不要・無料
- **タグ**：無料、登録不要、令和7年版

### 4-3. ねこおじさんタイマー
- **URL**：https://absolute-zero-meeting.vercel.app
- **詳細ページ**：`/nekoojiisan-timer`
- **機能**：会議タイマー、AIおやじギャグ生成、猫キャラクター
- **タグ**：会議タイマー、おやじギャグ、AI生成、無料

### 4-4. 日本株スクリーナー
- **URL**：`/japan-stock-screener/`（GitHub Pages プロキシ）
- **詳細ページ**：`/japan-stock-screener.html`（静的HTML）
- **機能**：東証3,700銘柄を毎日自動スキャン、テクニカル×AIスコアリング、Discord夕方配信
- **タグ**：無料、Discord連携、テクニカル分析、毎日夕方
- **スコアリング**：9つの指標×合計100点

#### スコア指標詳細（2026年3月時点）
| 指標 | 点数 | 内容 |
|------|------|------|
| MA200 上昇トレンド | 15pt | 株価>MA200 かつ直近20日間で上向き |
| 一目均衡表 ① 雲の上 | 10pt | 株価が雲の上 |
| 一目均衡表 ② 三役好転 | +10pt | 転換線>基準線 + 遅行線>株価（①+②で最大20pt） |
| RSI 過熱感なし | 15pt | RSIが30〜70の適正レンジ |
| MACD ゴールデンクロス | 15pt | MACDラインがシグナル上抜け |
| 出来高急増 | 10pt | 直近出来高が20日平均の1.5倍以上 |
| ボリンジャーバンド | 10pt | 株価が+1σ〜+2σ圏内 |
| 押し目買い | 5pt | MA200水準まで押した後の反転 |
| PBR 割安 | 10pt | PBR<1.0倍（東証の資本効率改善要請対応） |

---

## 5. BLOG（Notion連携）

### Notionデータベース構造
| プロパティ名 | 型 | 用途 |
|------------|-----|------|
| タイトル | title | 記事タイトル |
| 公開日 | date | 公開日 |
| タグ | multi_select | タグ |
| カテゴリー | select | カテゴリー |
| ステータス | select | 「公開済み」でフィルタ |

### 取得ロジック（lib/notion.ts）
- ステータス = `公開済み` かつ 公開日 ≤ 今日 でフィルタ
- 公開日の降順でソート
- ISR：1時間ごとに再検証（`revalidate = 3600`）

### 環境変数
```
NOTION_TOKEN         # Notion APIトークン（Vercel環境変数に設定済み）
NOTION_BLOG_DB_DB_ID # NotionブログデータベースID（Vercel環境変数に設定済み）
```

### 既知の問題
- ブロックの種類によっては本文が正しくレンダリングされない場合がある（表形式・画像リンク等）

---

## 6. デプロイフロー

```
コード変更
  ↓
git commit & push → GitHub (main)
  ↓
（GitHub連携で自動デプロイ OR）
vercel deploy --prod --yes（手動）
  ↓
https://nobi-labo.com に反映
```

---

## 7. CSS変数（globals.css）

```css
:root {
  --orange: #f97316;    /* アクセントカラー */
  --panel:  #181818;    /* カードパネル背景 */
  --border: #222;       /* ボーダー */
  --white:  #f0f0f0;    /* テキスト */
  --muted:  #888;       /* 補助テキスト */
}
```

---

## 8. 今後の展開・要望

### 8-1. 新アプリ追加フロー（目標）

```
① 新アプリ公開
  ↓
② HomeWithTabs.tsx にアプリカード追加
③ 詳細紹介ページ作成（Next.js or 静的HTML）
  ↓
④ Notionにブログ記事を自動生成（Claude連携？）
  ↓
⑤ Notionで記事を確認・編集・公開（手動）
  ↓
⑥ SNS（X/Twitter等）に自動投稿
```

### 8-2. ブログ記事→SNS連携フロー（目標）

```
① Notionでブログ記事を書く（手動）
② ステータスを「公開済み」に変更（手動）
  ↓
③ サイトに反映（ISR 最大1時間）
④ SNSに自動投稿（要実装）
```

### 8-3. 実装要件

| 機能 | 内容 | 優先度 |
|------|------|--------|
| Notion公開検知 | Notionのステータス変化を定期ポーリングで検知 | 高 |
| SNS自動投稿（X/Twitter） | 新記事・新アプリ公開時にXへ自動ポスト | 高 |
| Note連携 | BLOG記事をNoteにもクロスポスト | 中 |
| Notion記事自動生成 | 新アプリ追加時にClaude APIでNotionドラフトを生成 | 中 |

### 8-4. SNS自動投稿の実装候補アーキテクチャ

**方針A：GitHub Actions + Vercel Webhook**
- Notionをcronでポーリング（15〜30分間隔）
- 新しい「公開済み」記事を検知したらX API v2でポスト
- 投稿済み記事IDをNotionプロパティまたはJSONで管理

**方針B：Vercel Cron Jobs**
- `app/api/notify/route.ts` として実装
- Vercel Cron（無料プランで1日1回 or 有料で高頻度）

**必要なもの**
- X（Twitter）API v2 Bearer Token / OAuth2クレデンシャル
- Note API（または手動クロスポスト）
- 投稿済み管理ストア（Notion property / KV / JSON）

---

## 9. 関連リソース

| リソース | URL / 場所 |
|---------|-----------|
| GitHub リポジトリ | https://github.com/nobinobi9000/nobinobi9000.github.io |
| Vercel ダッシュボード | https://vercel.com/nonobinoi9000s-projects/nobi-labo-site |
| Notion（ブログDB） | Vercel環境変数 `NOTION_BLOG_DB_ID` で確認 |
| comic-checker（PWA） | https://comic.nobi-labo.com |
| ねこおじさんタイマー | https://absolute-zero-meeting.vercel.app |
| 旧GitHub Pagesサイト | https://nobinobi9000.github.io |
