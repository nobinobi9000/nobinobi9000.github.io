---
name: add-picks-product
description: Interview-style helper for adding one product to nobi-labo.com's /picks affiliate page (lib/affiliate-products.json), in the nobinobi9000.github.io project. Use this whenever the user says things like "商品を追加したい", "おすすめに登録したい", "picksに商品追加して", "アフィリエイト商品を登録したい", mentions adding an item to /picks, or pastes a product name + Amazon link together in this project — even if they only give partial info, since the point of this skill is to ask for whatever is missing. Do NOT use this for editing/removing existing products or for unrelated content types (blog posts, column articles, apps).
---

# おすすめ商品(/picks)を追加する

nobi-labo.com の `/picks` ページに載る商品は `lib/affiliate-products.json` の配列に1件ずつ入っている。このスキルは、会話でインタビュー形式に項目を聞き出し、この JSON に1件追記するためのもの。

同じ目的のツールとして `node scripts/add-product.mjs`（対話式CLI）と `/admin/picks`（`npm run dev`時のみのフォーム画面）が既にこのプロジェクトにある。このスキルはそれらを置き換えるものではなく、会話の中で自然に呼び出せる第三の手段。

## 聞くべき項目（順番に、一つずつ）

すでに会話の中でユーザーが言っている項目はスキップしてよい。すべて一度に聞かず、自然な会話として進める。

1. **カテゴリ** — 次の4択のどれか: `retro-game`(レトロゲーム) / `money`(投資・お金) / `gadget`(ガジェット) / `manga-set`(マンガ全巻セット)
2. **商品名**
3. **ひとことコメント** — なぜ良かったか、体験ベースの一言。宣伝文句っぽい一般論ではなく、本人が実際に使って感じたことを引き出す（「会社のサブモニター運用がこれで一気に快適になった」のような具体性がある一言が理想）
4. **タグ**（任意、複数可）— `/picks`ページ内でのカテゴリ内絞り込みに使われる。商品の特徴を表す短い言葉（例: 充電器, PC周辺機器）
5. **元記事リンク** — 下記「元記事リンクの決め方」を参照
6. **AmazonアソシエイトURL**
7. **商品画像URL**（任意。なければ空文字でよく、レイアウトは崩れない）

## 元記事リンクの決め方

サイトのコラム(`/column`)にはnoteから取り込んだ記事アーカイブがあり、`lib/note-archive-nobi1.json` と `lib/note-archive-nobi2.json` に記事オブジェクト（`title`, `slug` などを持つ）の配列として入っている。

ユーザーが「〇〇の記事」のようにキーワードで言及したら:
1. Grepか読み込みで両ファイルの`title`から該当しそうな記事を探す
2. 複数見つかったら候補をユーザーに提示して選んでもらう
3. 選ばれたら `articleUrl` は `/column/{slug}` という**サイト内リンク**にする（読者を外部note.comに逃さず回遊性を上げるのが狙いなので、取り込み済み記事があるならこちらを優先する）

該当する記事がない、または取り込み前の記事の場合は、note.comのURLなど言われた通りのリンクをそのまま使う。

## JSONへの追記

必須項目（商品名・コメント・元記事リンク・AmazonURL）が揃ったら、以下の形式のオブジェクトを組み立てる。

```json
{
  "id": "{category}-{追加した時刻のUnixミリ秒}",
  "category": "...",
  "tags": ["..."],
  "name": "...",
  "comment": "...",
  "articleUrl": "...",
  "amazonUrl": "...",
  "imageUrl": "",
  "addedAt": "YYYY-MM-DD"
}
```

- `addedAt` は今日の日付。`date +%F` などで実際の日付を確認してから使う（推測しない）
- `id` の時刻部分も `date +%s%3N` などで実際の値を使う

書き込み前に:
1. `lib/affiliate-products.json` を読み、既に同名の商品が無いか軽く確認する（重複登録の事故防止）
2. 組み立てた内容をユーザーに一度提示し、この項目で追記してよいか確認する（このプロジェクトのCLAUDE.mdで、ファイル編集前の確認が必須ルールになっているため）
3. 確認が取れたら Edit ツールで配列の末尾に追記する

## 追記後

- 追加した内容を短くまとめて表示する
- 「反映するには `git add lib/affiliate-products.json` → commit → push が必要です」と伝える
- **git操作は明示的に指示されるまで実行しない**（追記そのものと、それをコミット/デプロイするかは別の判断だから）
