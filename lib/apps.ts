export type App = {
  icon: string
  name: string
  desc: string
  story?: string
  tags: string[]
  ctaUrl: string
  detailUrl: string
  category: '日常・ライフ' | 'お金・投資'
  screenshot?: string
}

export const APPS: App[] = [
  {
    icon: '📚',
    name: 'comic-checker',
    desc: 'マンガの新刊を自動チェック。\n発売14日前・7日前・当日にPush通知でお知らせ。\nスマホのホーム画面に追加してすぐ使える。',
    story: '好きなマンガの新刊を何度も買い逃したのがきっかけ。「そろそろ出る頃かな」と思って本屋に行ったら既に出ていた、ということが続いて、自分専用の新刊通知が必要だと感じた。',
    tags: ['ホーム追加OK', '無料', 'Push通知', '楽天連携'],
    ctaUrl: 'https://comic.nobi-labo.com',
    detailUrl: '/comic-checker',
    category: '日常・ライフ',
    screenshot: '/screenshots/comic-mylist-grid.png',
  },
  {
    icon: '✂️',
    name: 'サブスクの断捨離',
    desc: 'サブスク支出を可視化して断捨離。\n解約してS&P500に投資したら将来いくらに？\n断捨離スコアで見直すべきサブスクを提案。',
    story: '自分のサブスクを全部書き出してみたら、月額が想像以上だった。「この金額を投資に回したらどうなるんだろう」という純粋な興味から、計算ツールとして作り始めた。',
    tags: ['無料', '登録不要', '投資換算', '断捨離スコア'],
    ctaUrl: 'https://subshari.nobi-labo.com',
    detailUrl: '/subshari',
    category: 'お金・投資',
    screenshot: '/screenshots/subshari-list.png',
  },
  {
    icon: '🧮',
    name: '確定申告・還付判定シミュレーター',
    desc: '所得税・住民税を簡単に計算。\n収入を入力するだけで手取り額・還付額をすぐ確認できる。',
    tags: ['無料', '登録不要', '令和7年版'],
    ctaUrl: '/tax-simulator/',
    detailUrl: '/tax-simulator.html',
    category: 'お金・投資',
    screenshot: '/screenshots/tax-simulator.png',
  },
  {
    icon: '📊',
    name: '日本株スクリーナー',
    desc: 'テクニカル指標×AIスコアリングで3,700銘柄を毎日自動スキャン。\n上昇シグナル銘柄をDiscordへ毎日夕方配信。',
    tags: ['無料', 'Discord連携', 'テクニカル分析', '毎日夕方'],
    ctaUrl: '/japan-stock-screener/',
    detailUrl: '/japan-stock-screener.html',
    category: 'お金・投資',
    screenshot: '/screenshots/japan-stock-screener.png',
  },
  {
    icon: '🗺️',
    name: 'QUESTLOG',
    desc: '積みゲーを冒険の地図として前向きに管理するゲームバックログアプリ。\nBacklog→Playing→Clearedでプレイ状況を記録。\nPush通知で新作リリース情報もお届け。',
    story: '積みゲーが増えすぎて、罪悪感ばかりが積み上がっていた。罪悪感ではなく「まだ見ぬ冒険」として楽しく管理できるアプリが欲しかった。満足度はまだ45点。作り続けている。',
    tags: ['ホーム追加OK', '無料', 'Push通知', 'ゲーム管理'],
    ctaUrl: 'https://gamelog.nobi-labo.com',
    detailUrl: '/questlog',
    category: '日常・ライフ',
    screenshot: '/screenshots/questlog/Top.png',
  },
  {
    icon: '📒',
    name: 'Kabu Note（カブノート）',
    desc: '複数証券会社の保有株を一元管理するポートフォリオダッシュボード。\n証券コード・株数・取得単価を登録するだけで損益・評価額を自動計算。\n平日16時に株価を自動更新。',
    story: '証券口座が3つあって、それぞれの損益を別々に確認するのが面倒だった。持ち株会の株が日々減っていく中、総資産ベースで今どうなっているのかを一目で把握したかった。',
    tags: ['無料', '日本株', '複数口座対応', '損益管理'],
    ctaUrl: 'https://kabu.nobi-labo.com',
    detailUrl: '/kabu-note',
    category: 'お金・投資',
    screenshot: '/screenshots/kabu-note/Stocks.png',
  },
  {
    icon: '🌱',
    name: 'めばえ',
    desc: '毎日の習慣にちいさな新習慣を積み上げる。\nアンカー習慣の直後にスタック習慣を設定するだけ。\n継続を見える化するミニマルな習慣トラッカー。',
    story: '毎年4月に「今年こそ習慣を作ろう」と思うが、続いたためしがない。意志力に頼らない「習慣スタック」という手法に出会い、それを実践するシンプルなアプリを作った。',
    tags: ['ホーム追加OK', '無料', 'Push通知', '習慣形成'],
    ctaUrl: 'https://mebae.nobi-labo.com',
    detailUrl: '/mebae',
    category: '日常・ライフ',
    screenshot: '/screenshots/mebae/top.png',
  },
  {
    icon: '📋',
    name: 'Task Manager',
    desc: '重要度×緊急度の2軸でタスクを自動分類。\nアイゼンハワーマトリクスで「すぐやる・後でやる・任せる・保留」に即振り分け。\n登録不要、データはブラウザに保存。',
    story: '締め切りが近いタスクばかり対応して、本当に重要なことを後回しにし続けていた。アイゼンハワーマトリクスで優先順位を可視化するツールを自分のために作った。',
    tags: ['無料', '登録不要', '優先度管理', 'ブラウザ保存'],
    ctaUrl: '/todo-manager-app/',
    detailUrl: '/todo-manager',
    category: '日常・ライフ',
    screenshot: '/screenshots/taskmanager_top.png',
  },
  {
    icon: '🛒',
    name: 'SoroSoro',
    desc: '日用品の消費ペースを記録して、切れる前に通知。\nバーコードスキャン・楽天検索で商品を簡単登録。\n楽天・Amazonへのワンタップ購入リンク付き。',
    story: 'Amazon定期便を使っていたが、届くタイミングがまったく合わない。欲しい時には切れていて、要らない時に届く。消費ペースを自分で記録して、切れる前に通知が来ればいいと気づいた。',
    tags: ['ホーム追加OK', '無料', 'Push通知', '楽天連携'],
    ctaUrl: 'https://sorosoro.nobi-labo.com',
    detailUrl: '/sorosoro',
    category: '日常・ライフ',
    screenshot: '/screenshots/sorosoro/top.png',
  },
  {
    icon: '🧊',
    name: 'ねこおじさんタイマー',
    desc: '会議を凍らせる、愛すべきおやじ。\nカウントダウン終了後、ねこおじさんがAI生成おやじギャグで締める会議タイマー。',
    story: '「AIがおやじギャグで会議を終わらせる」という発想が面白いかなと思って作った。実際は外れだった。初期作品として、恥ずかしいけど残してある。',
    tags: ['会議タイマー', 'おやじギャグ', 'AI生成', '無料'],
    ctaUrl: '/meeting-timer',
    detailUrl: '/nekoojiisan-timer',
    category: '日常・ライフ',
    screenshot: '/screenshots/nekoojiisan-timer.png',
  },
]

export const CATEGORIES = ['日常・ライフ', 'お金・投資'] as const
