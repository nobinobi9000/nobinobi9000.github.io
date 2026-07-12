export type AppCategory = 'Life' | 'Money' | 'Work'

export type App = {
  name: string
  desc: string
  story?: string
  tags: string[]
  ctaUrl: string | null   // null = 準備中
  ctaLabel?: string       // デフォルト: 今すぐ使う →
  detailUrl: string
  category: AppCategory
  screenshot?: string
  tint: string
  catColor: string
}

export const CAT_COLORS: Record<AppCategory, { color: string; bg: string; label: string; labelJp: string }> = {
  Life:  { color: '#2563EB', bg: '#F0F5FF', label: 'Life',  labelJp: '暮らし' },
  Money: { color: '#92400E', bg: '#FBF4EC', label: 'Money', labelJp: 'お金' },
  Work:  { color: '#6D28D9', bg: '#F5F1FC', label: 'Work',  labelJp: 'しごと' },
}

export const APPS: App[] = [
  {
    name: 'comic-checker',
    desc: 'マンガの新刊を自動チェック。発売14日前・7日前・当日にPush通知。楽天連携でワンタップ購入。',
    story: '好きなマンガの新刊を何度も買い逃したのがきっかけ。「そろそろ出る頃かな」と思って本屋に行ったら既に出ていた、ということが続いて、自分専用の新刊通知が必要だと感じた。',
    tags: ['無料', 'Push通知', '楽天連携', 'ホーム追加OK'],
    ctaUrl: 'https://comic.nobi-labo.com',
    detailUrl: '/comic-checker',
    category: 'Life',
    screenshot: '/screenshots/comic-mylist-grid.png',
    tint: '#F0F5FF',
    catColor: '#2563EB',
  },
  {
    name: 'QUESTLOG',
    desc: '積みゲーを冒険の地図として管理。Backlog→Playing→Cleared でプレイ状況を記録。',
    story: '積みゲーが増えすぎて、罪悪感ばかりが積み上がっていた。罪悪感ではなく「まだ見ぬ冒険」として楽しく管理できるアプリが欲しかった。',
    tags: ['無料', 'Push通知', 'ゲーム管理'],
    ctaUrl: 'https://gamelog.nobi-labo.com',
    detailUrl: '/questlog',
    category: 'Life',
    screenshot: '/screenshots/questlog/Top.png',
    tint: '#F0F5FF',
    catColor: '#2563EB',
  },
  {
    name: 'めばえ',
    desc: 'アンカー習慣の直後に新習慣を積み上げるミニマルな習慣トラッカー。継続を見える化。',
    story: '毎年4月に「今年こそ習慣を作ろう」と思うが、続いたためしがない。意志力に頼らない「習慣スタック」という手法に出会い、それを実践するシンプルなアプリを作った。',
    tags: ['無料', 'Push通知', '習慣形成'],
    ctaUrl: 'https://mebae.nobi-labo.com',
    detailUrl: '/mebae',
    category: 'Life',
    screenshot: '/screenshots/mebae/top.png',
    tint: '#F0F5FF',
    catColor: '#2563EB',
  },
  {
    name: 'SoroSoro',
    desc: '日用品の消費ペースを記録して、切れる前に通知。バーコードスキャンで商品登録。',
    story: 'Amazon定期便を使っていたが、届くタイミングがまったく合わない。消費ペースを自分で記録して、切れる前に通知が来ればいいと気づいた。',
    tags: ['無料', 'Push通知', '楽天連携'],
    ctaUrl: 'https://sorosoro.nobi-labo.com',
    detailUrl: '/sorosoro',
    category: 'Life',
    screenshot: '/screenshots/sorosoro/top.png',
    tint: '#F0F5FF',
    catColor: '#2563EB',
  },
  {
    name: 'ねこおじさんタイマー',
    desc: 'カウントダウン終了後、ねこおじさんがAI生成おやじギャグで締める会議タイマー。',
    story: '「AIがおやじギャグで会議を終わらせる」という発想が面白いかなと思って作った。',
    tags: ['無料', '会議タイマー', 'AI生成'],
    ctaUrl: 'https://meeting.nobi-labo.com',
    detailUrl: '/nekoojiisan-timer',
    category: 'Life',
    screenshot: '/screenshots/nekoojiisan-timer.png',
    tint: '#F0F5FF',
    catColor: '#2563EB',
  },
  {
    name: 'サブスクの断捨離',
    desc: 'サブスク支出を可視化して断捨離。S&P500換算で将来額を表示。断捨離スコアで提案。',
    story: '自分のサブスクを全部書き出してみたら、月額が想像以上だった。「この金額を投資に回したらどうなるんだろう」という純粋な興味から作り始めた。',
    tags: ['無料', '登録不要', '投資換算'],
    ctaUrl: 'https://subshari.nobi-labo.com',
    detailUrl: '/subshari',
    category: 'Money',
    screenshot: '/screenshots/subshari-list.png',
    tint: '#FBF4EC',
    catColor: '#92400E',
  },
  {
    name: 'Kabu Note',
    desc: '複数証券口座の保有株を一元管理。損益・評価額を自動計算。平日16時に自動更新。',
    story: '証券口座が3つになって管理が面倒だった。総資産ベースで今どうなっているのかを一目で把握したかった。',
    tags: ['無料', '日本株', '複数口座対応'],
    ctaUrl: 'https://kabu.nobi-labo.com',
    detailUrl: '/kabu-note',
    category: 'Money',
    screenshot: '/screenshots/kabu-note/Stocks.png',
    tint: '#FBF4EC',
    catColor: '#92400E',
  },
  {
    name: 'kabu-signal',
    desc: 'JVQMファクター（割安・収益性・モメンタム）で日本株をスコアリング。上方修正・自社株買いと重なった銘柄をPush通知でお届け。毎朝7時自動スキャン。',
    story: 'Kabu Noteで保有株を管理するうちに、「どの銘柄を買えばいいか」を統計的に判断したくなった。世界の学術論文を参照してJVQMシステムを設計し、毎朝自動でシグナルを送るPWAを作った。',
    tags: ['無料', 'Push通知', '日本株', 'ホーム追加OK'],
    ctaUrl: 'https://signal.nobi-labo.com',
    detailUrl: '/kabu-signal',
    category: 'Money',
    screenshot: '/screenshots/kabu-signal.svg',
    tint: '#FBF4EC',
    catColor: '#92400E',
  },
  {
    name: '確定申告・還付判定シミュレーター',
    desc: '収入を入力するだけで手取り額・還付額をすぐ確認。令和7年版対応。',
    tags: ['無料', '登録不要', '令和7年版'],
    ctaUrl: '/tax-simulator/index.html',
    detailUrl: '/tax-simulator-detail',
    category: 'Money',
    screenshot: '/screenshots/tax-simulator.png',
    tint: '#FBF4EC',
    catColor: '#92400E',
  },
  {
    name: '日本株スクリーナー',
    desc: 'テクニカル指標×AIスコアリングで3,700銘柄を毎日自動スキャン。Discord配信。',
    tags: ['無料', 'Discord連携', '毎日更新'],
    ctaUrl: 'https://screener.nobi-labo.com',
    detailUrl: '/stock-screener',
    category: 'Money',
    screenshot: '/screenshots/japan-stock-screener.png',
    tint: '#FBF4EC',
    catColor: '#92400E',
  },
  {
    name: 'Note Deck',
    desc: 'note.comのマルチアカウントをデスクトップで切り替え。Googleログインも完全対応。インストール不要のWindows用無料ツール。',
    tags: ['無料', 'Windows対応', 'デスクトップアプリ', '登録不要'],
    ctaUrl: 'https://github.com/nobinobi9000/note-multi-account/releases/latest',
    ctaLabel: 'ダウンロード →',
    detailUrl: '/note-deck',
    category: 'Work',
    screenshot: '/screenshots/note-deck.png',
    tint: '#F5F1FC',
    catColor: '#6D28D9',
  },
  {
    name: 'Task Manager',
    desc: '重要度×緊急度の2軸でタスクを自動分類。アイゼンハワーマトリクスで即振り分け。登録不要・無料。',
    story: '締め切りが近いタスクばかり対応して、本当に重要なことを後回しにし続けていた。アイゼンハワーマトリクスで優先順位を可視化するツールを自分のために作った。',
    tags: ['無料', '登録不要', '優先度管理'],
    ctaUrl: '/todo-manager-app/',
    detailUrl: '/task-manager',
    category: 'Work',
    screenshot: '/screenshots/taskmanager_top.png',
    tint: '#F5F1FC',
    catColor: '#6D28D9',
  },
  {
    name: '法律書類ジェネレーター',
    desc: '契約書・内容証明をAIが瞬時に生成。登録不要・無料3回。',
    tags: ['無料3回', '登録不要', 'AI生成'],
    ctaUrl: 'https://legal.nobi-labo.com',
    detailUrl: '/legalgen',
    category: 'Work',
    screenshot: '/screenshots/legalgen.svg',
    tint: '#F5F1FC',
    catColor: '#6D28D9',
  },
]

export const CATEGORIES = ['Life', 'Money', 'Work'] as const
