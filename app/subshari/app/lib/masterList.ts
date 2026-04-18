import type { MasterSubscription } from './types'

/**
 * 価格情報の基準日
 * 毎月末に価格変更がないか公式サイトで確認してください。
 */
export const PRICE_AS_OF = '2026年4月'

export const MASTER_SUBSCRIPTIONS: readonly MasterSubscription[] = [
  // ──────── 動画配信 ────────
  { id: 'netflix-ads', name: 'Netflix 広告つきスタンダード', category: '動画配信', monthlyPrice: 790, icon: '🎬', note: '広告あり' },
  { id: 'netflix-standard', name: 'Netflix スタンダード', category: '動画配信', monthlyPrice: 1490, icon: '🎬' },
  { id: 'netflix-premium', name: 'Netflix プレミアム', category: '動画配信', monthlyPrice: 1980, icon: '🎬', note: '4K・同時4画面' },

  { id: 'amazon-prime', name: 'Amazon Prime（月払い）', category: '動画配信', monthlyPrice: 600, icon: '📦', note: '配送特典含む' },
  { id: 'amazon-prime-annual', name: 'Amazon Prime（年払い換算）', category: '動画配信', monthlyPrice: 492, icon: '📦', note: '年額¥5,900→月換算' },

  { id: 'disney-standard', name: 'Disney+ スタンダード', category: '動画配信', monthlyPrice: 990, icon: '✨' },
  { id: 'disney-standard-annual', name: 'Disney+ スタンダード（年払い換算）', category: '動画配信', monthlyPrice: 825, icon: '✨', note: '年額¥9,900→月換算' },
  { id: 'disney-premium', name: 'Disney+ プレミアム', category: '動画配信', monthlyPrice: 1320, icon: '✨', note: '4K・ドルビーアトモス' },

  { id: 'hulu', name: 'Hulu', category: '動画配信', monthlyPrice: 1026, icon: '🎥' },

  { id: 'u-next', name: 'U-NEXT', category: '動画配信', monthlyPrice: 2189, icon: '📺', note: '毎月1,200ポイント付与' },

  { id: 'youtube-premium-individual', name: 'YouTube Premium（個人）', category: '動画配信', monthlyPrice: 1280, icon: '▶️' },
  { id: 'youtube-premium-student', name: 'YouTube Premium（学生）', category: '動画配信', monthlyPrice: 798, icon: '▶️', note: '学生証確認あり' },
  { id: 'youtube-premium-family', name: 'YouTube Premium（ファミリー）', category: '動画配信', monthlyPrice: 1980, icon: '▶️', note: '最大5人' },

  { id: 'dazn-standard', name: 'DAZN スタンダード（月払い）', category: '動画配信', monthlyPrice: 4200, icon: '⚽' },
  { id: 'dazn-standard-annual', name: 'DAZN スタンダード（年払い換算）', category: '動画配信', monthlyPrice: 2667, icon: '⚽', note: '年額¥32,000→月換算' },

  { id: 'wowow', name: 'WOWOW（月払い）', category: '動画配信', monthlyPrice: 2530, icon: '📡' },

  { id: 'lemino', name: 'Lemino', category: '動画配信', monthlyPrice: 1540, icon: '🎦' },

  { id: 'apple-tv-plus', name: 'Apple TV+', category: '動画配信', monthlyPrice: 900, icon: '🍎' },

  { id: 'nhk-ondemand', name: 'NHKオンデマンド 全部パック', category: '動画配信', monthlyPrice: 990, icon: '📻' },

  { id: 'abema-premium', name: 'ABEMAプレミアム', category: '動画配信', monthlyPrice: 960, icon: '📺', note: 'ニュース・アニメ・スポーツ' },
  { id: 'fod-premium-monthly', name: 'FOD プレミアム（月払い）', category: '動画配信', monthlyPrice: 976, icon: '🎥', note: 'フジテレビ系' },
  { id: 'fod-premium-annual', name: 'FOD プレミアム（年払い換算）', category: '動画配信', monthlyPrice: 815, icon: '🎥', note: '年額¥9,780→月換算' },
  { id: 'hulu-family', name: 'Hulu（ファミリー）', category: '動画配信', monthlyPrice: 2167, icon: '🎥', note: '最大6人' },

  // ──────── 音楽 ────────
  { id: 'spotify-individual', name: 'Spotify プレミアム（個人）', category: '音楽', monthlyPrice: 1080, icon: '🎵' },
  { id: 'spotify-student', name: 'Spotify プレミアム（学生）', category: '音楽', monthlyPrice: 580, icon: '🎵', note: '学生証確認あり' },
  { id: 'spotify-duo', name: 'Spotify Duo', category: '音楽', monthlyPrice: 1480, icon: '🎵', note: '2人同居' },
  { id: 'spotify-family', name: 'Spotify ファミリー', category: '音楽', monthlyPrice: 1580, icon: '🎵', note: '最大6人' },

  { id: 'apple-music-individual', name: 'Apple Music（個人）', category: '音楽', monthlyPrice: 1080, icon: '🎶' },
  { id: 'apple-music-student', name: 'Apple Music（学生）', category: '音楽', monthlyPrice: 580, icon: '🎶', note: '学生証確認あり' },
  { id: 'apple-music-family', name: 'Apple Music（ファミリー）', category: '音楽', monthlyPrice: 1680, icon: '🎶', note: '最大6人' },

  { id: 'youtube-music', name: 'YouTube Music Premium（個人）', category: '音楽', monthlyPrice: 1180, icon: '🎼' },

  { id: 'amazon-music-unlimited', name: 'Amazon Music Unlimited（個人）', category: '音楽', monthlyPrice: 1180, icon: '🎧', note: 'Prime会員は¥1,080' },
  { id: 'amazon-music-unlimited-prime', name: 'Amazon Music Unlimited（Prime会員）', category: '音楽', monthlyPrice: 1080, icon: '🎧' },
  { id: 'amazon-music-unlimited-family', name: 'Amazon Music Unlimited（ファミリー）', category: '音楽', monthlyPrice: 1680, icon: '🎧', note: '最大6人' },

  { id: 'line-music', name: 'LINE MUSIC（個人）', category: '音楽', monthlyPrice: 1080, icon: '🎤' },
  { id: 'awa-standard', name: 'AWA スタンダード', category: '音楽', monthlyPrice: 1080, icon: '🎹' },

  // ──────── 電子書籍・マンガ ────────
  { id: 'kindle-unlimited', name: 'Kindle Unlimited', category: '電子書籍', monthlyPrice: 980, icon: '📖', note: '200万タイトル以上' },
  { id: 'comic-seymour-full', name: 'コミックシーモア フル', category: '電子書籍', monthlyPrice: 1480, icon: '📕' },
  { id: 'comic-seymour-light', name: 'コミックシーモア ライト', category: '電子書籍', monthlyPrice: 780, icon: '📕' },
  { id: 'bookwalker-max', name: 'BOOK☆WALKER MAX', category: '電子書籍', monthlyPrice: 1100, icon: '📗' },
  { id: 'bookwalker-manga', name: 'BOOK☆WALKER マンガコース', category: '電子書籍', monthlyPrice: 836, icon: '📗' },
  { id: 'au-bookpass', name: 'auブックパス 総合', category: '電子書籍', monthlyPrice: 618, icon: '📘' },
  { id: 'au-bookpass-magazine', name: 'auブックパス 雑誌コース', category: '電子書籍', monthlyPrice: 418, icon: '📘' },

  // ──────── フィットネス ────────
  { id: 'chocozap', name: 'chocoZAP', category: 'フィットネス', monthlyPrice: 2980, icon: '💪', note: 'コンビニジム・美容機器含む' },
  { id: 'anytime-fitness', name: 'Anytime Fitness（目安）', category: 'フィットネス', monthlyPrice: 7000, icon: '🏋️', note: '店舗により異なる' },
  { id: 'konami-sports-light', name: 'コナミスポーツ シニア', category: 'フィットネス', monthlyPrice: 9880, icon: '🏊', note: 'カテゴリ限定プラン' },
  { id: 'konami-sports-full', name: 'コナミスポーツ フルタイム', category: 'フィットネス', monthlyPrice: 19080, icon: '🏊', note: '全施設・全時間利用可' },
  { id: 'gym-budget', name: '24時間ジム（格安）', category: 'フィットネス', monthlyPrice: 3000, icon: '🤸', note: '例: JOYFIT・エニタイム格安店等' },
  { id: 'gym-standard', name: '総合フィットネスジム（平均）', category: 'フィットネス', monthlyPrice: 8000, icon: '🏃', note: '東京都内の目安' },

  // ──────── ソフトウェア・クラウド ────────
  { id: 'adobe-cc-complete', name: 'Adobe Creative Cloud コンプリート（月払い）', category: 'ソフトウェア', monthlyPrice: 6480, icon: '🎨' },
  { id: 'adobe-cc-complete-annual', name: 'Adobe Creative Cloud コンプリート（年払い換算）', category: 'ソフトウェア', monthlyPrice: 5480, icon: '🎨', note: '年額¥65,760→月換算' },
  { id: 'adobe-photoshop', name: 'Adobe Photoshop（単体）', category: 'ソフトウェア', monthlyPrice: 2728, icon: '🖼️' },
  { id: 'adobe-illustrator', name: 'Adobe Illustrator（単体）', category: 'ソフトウェア', monthlyPrice: 2728, icon: '✏️' },

  { id: 'microsoft-365-personal', name: 'Microsoft 365 Personal（月払い）', category: 'ソフトウェア', monthlyPrice: 1284, icon: '💼' },
  { id: 'microsoft-365-family', name: 'Microsoft 365 Family（月払い）', category: 'ソフトウェア', monthlyPrice: 1850, icon: '💼', note: '最大6人' },

  { id: 'google-one-100gb', name: 'Google One 100GB', category: 'ソフトウェア', monthlyPrice: 250, icon: '☁️' },
  { id: 'google-one-200gb', name: 'Google One 200GB', category: 'ソフトウェア', monthlyPrice: 380, icon: '☁️' },
  { id: 'google-one-2tb', name: 'Google One 2TB', category: 'ソフトウェア', monthlyPrice: 1300, icon: '☁️' },

  { id: 'icloud-50gb', name: 'iCloud+ 50GB', category: 'ソフトウェア', monthlyPrice: 130, icon: '🍎' },
  { id: 'icloud-200gb', name: 'iCloud+ 200GB', category: 'ソフトウェア', monthlyPrice: 400, icon: '🍎' },
  { id: 'icloud-2tb', name: 'iCloud+ 2TB', category: 'ソフトウェア', monthlyPrice: 1300, icon: '🍎' },

  { id: 'dropbox-essentials', name: 'Dropbox Essentials', category: 'ソフトウェア', monthlyPrice: 1500, icon: '📦', note: '3TB' },

  // ──────── ゲーム ────────
  { id: 'nso-individual-monthly', name: 'Nintendo Switch Online 個人（月払い）', category: 'ゲーム', monthlyPrice: 306, icon: '🎮' },
  { id: 'nso-individual-annual', name: 'Nintendo Switch Online 個人（年払い換算）', category: 'ゲーム', monthlyPrice: 200, icon: '🎮', note: '年額¥2,400→月換算' },
  { id: 'nso-family-annual', name: 'Nintendo Switch Online ファミリー（年払い換算）', category: 'ゲーム', monthlyPrice: 375, icon: '🎮', note: '年額¥4,500→月換算・最大8人' },

  { id: 'ps-plus-essential', name: 'PlayStation Plus Essential（月払い）', category: 'ゲーム', monthlyPrice: 850, icon: '🕹️' },
  { id: 'ps-plus-extra', name: 'PlayStation Plus Extra（月払い）', category: 'ゲーム', monthlyPrice: 1300, icon: '🕹️', note: 'ゲームカタログ含む' },
  { id: 'ps-plus-premium', name: 'PlayStation Plus Premium（月払い）', category: 'ゲーム', monthlyPrice: 1550, icon: '🕹️', note: 'クラシックゲーム含む' },

  { id: 'xbox-game-pass-ultimate', name: 'Xbox Game Pass Ultimate', category: 'ゲーム', monthlyPrice: 2750, icon: '🎯' },
  { id: 'xbox-game-pass-core', name: 'Xbox Game Pass Core', category: 'ゲーム', monthlyPrice: 750, icon: '🎯', note: 'オンラインマルチのみ' },

  // ──────── スポーツ ────────
  { id: 'pa-league-tv-monthly', name: 'パ・リーグTV（月払い）', category: 'スポーツ', monthlyPrice: 715, icon: '⚾', note: 'プロ野球パ・リーグ全試合配信' },
  { id: 'pa-league-tv-annual', name: 'パ・リーグTV（年払い換算）', category: 'スポーツ', monthlyPrice: 596, icon: '⚾', note: '年額¥7,150→月換算' },
  { id: 'rakuten-tv-baseball', name: 'Rakuten TV プロ野球パック', category: 'スポーツ', monthlyPrice: 850, icon: '⚾', note: 'パ・リーグ中心' },
  { id: 'jsports-ondemand', name: 'J SPORTS オンデマンド', category: 'スポーツ', monthlyPrice: 2980, icon: '🏈', note: 'ラグビー・サッカー・自転車他' },
  { id: 'skaperfect', name: 'スカパー! パーフェクトチョイス', category: 'スポーツ', monthlyPrice: 429, icon: '📡', note: '基本サービス。チャンネル別途' },
  { id: 'eleven-sports', name: 'ELEVEN SPORTS', category: 'スポーツ', monthlyPrice: 1980, icon: '⚽', note: 'サッカー・格闘技中心' },
  { id: 'nba-rakuten', name: 'NBA Rakuten', category: 'スポーツ', monthlyPrice: 1400, icon: '🏀', note: 'NBAリーグパス' },

  // ──────── 学習 ────────
  { id: 'studysapuri', name: 'スタディサプリ（小中高大受験）', category: '学習', monthlyPrice: 2178, icon: '📚', note: 'リクルート提供' },
  { id: 'studysapuri-english', name: 'スタディサプリ ENGLISH', category: '学習', monthlyPrice: 2178, icon: '🇺🇸', note: 'ビジネス英語・TOEIC対策' },
  { id: 'duolingo-super', name: 'Duolingo Super', category: '学習', monthlyPrice: 1250, icon: '🦉', note: '広告なし・オフライン学習' },
  { id: 'progate-pro', name: 'Progate Pro', category: '学習', monthlyPrice: 1078, icon: '💻', note: 'プログラミング学習' },
  { id: 'schoo', name: 'Schoo', category: '学習', monthlyPrice: 980, icon: '🎓', note: 'ビジネス・デザイン・IT' },
  { id: 'nhk-gogaku', name: 'NHK語学テキスト デジタル', category: '学習', monthlyPrice: 390, icon: '📖', note: 'ラジオ・テレビ語学講座テキスト' },

  // ──────── ビジネス ────────
  { id: 'canva-pro', name: 'Canva Pro', category: 'ビジネス', monthlyPrice: 1500, icon: '🎨', note: 'デザインツール' },
  { id: 'slack-pro', name: 'Slack Pro', category: 'ビジネス', monthlyPrice: 925, icon: '💬', note: 'チャットツール・1ユーザー' },
  { id: 'zoom-pro', name: 'Zoom Pro', category: 'ビジネス', monthlyPrice: 2200, icon: '📹', note: 'ビデオ会議・1ライセンス' },
  { id: 'notion-plus', name: 'Notion Plus', category: 'ビジネス', monthlyPrice: 1650, icon: '📝', note: 'ノート・データベース管理' },
  { id: '1password-family', name: '1Password ファミリー', category: 'ビジネス', monthlyPrice: 530, icon: '🔐', note: 'パスワード管理・5人まで' },
  { id: 'norton-360-premium', name: 'ノートン 360 プレミアム', category: 'ビジネス', monthlyPrice: 1500, icon: '🛡️', note: 'セキュリティ・5台' },

  // ──────── ヘルスケア ────────
  { id: 'calm', name: 'Calm', category: 'ヘルスケア', monthlyPrice: 1500, icon: '🧘', note: '瞑想・マインドフルネス' },
  { id: 'headspace', name: 'Headspace', category: 'ヘルスケア', monthlyPrice: 1300, icon: '🌙', note: '瞑想・睡眠改善' },
  { id: 'fitbit-premium', name: 'fitbit プレミアム', category: 'ヘルスケア', monthlyPrice: 980, icon: '❤️', note: 'フィットネス分析・睡眠スコア' },

  // ──────── ショッピング ────────
  { id: 'yahoo-premium', name: 'Yahoo!プレミアム', category: 'ショッピング', monthlyPrice: 508, icon: '🛍️', note: 'PayPay・ヤフオク等特典' },
  { id: 'd-magazine', name: 'dマガジン', category: 'ショッピング', monthlyPrice: 580, icon: '📰', note: '雑誌読み放題・600誌以上' },
  { id: 'rakuten-magazine', name: '楽天マガジン', category: 'ショッピング', monthlyPrice: 418, icon: '📙', note: '雑誌読み放題・1,400誌以上' },
  { id: 'newspicks-premium', name: 'NewsPicks プレミアム', category: 'ショッピング', monthlyPrice: 1800, icon: '📊', note: 'ビジネスニュース・専門家コメント' },
  { id: 'audiobook-jp', name: 'audiobook.jp（月額）', category: 'ショッピング', monthlyPrice: 833, icon: '🎧', note: 'オーディオブック聴き放題' },

  // ──────── ニュース・情報 ────────
  { id: 'nikkei', name: '日経電子版', category: 'ニュース', monthlyPrice: 4300, icon: '📰' },
  { id: 'asahi', name: '朝日新聞デジタル（月払い）', category: 'ニュース', monthlyPrice: 980, icon: '🗞️', note: '限定プラン。通常¥3,800' },
  { id: 'yomiuri', name: '読売新聞オンライン', category: 'ニュース', monthlyPrice: 4400, icon: '📄' },
  { id: 'mainichi', name: '毎日新聞 デジタル', category: 'ニュース', monthlyPrice: 4300, icon: '📑' },

  // ──────── その他 ────────
  { id: 'audible', name: 'Audible（月払い）', category: 'その他', monthlyPrice: 1500, icon: '🎙️', note: '1冊/月コイン付与' },
  { id: 'nhk-receiving', name: 'NHK受信料（月払い換算）', category: 'その他', monthlyPrice: 1100, icon: '📡', note: '地上契約。衛星は¥1,950' },
  { id: 'radiko-premium', name: 'radiko プレミアム', category: 'その他', monthlyPrice: 385, icon: '📻', note: '全国のラジオが聴ける' },
  { id: 'radiko-premium-family', name: 'radiko プレミアムファミリー', category: 'その他', monthlyPrice: 770, icon: '📻', note: '最大3アカウント' },
] as const

export const CATEGORY_ORDER: readonly string[] = [
  '動画配信', '音楽', '電子書籍', 'フィットネス', 'スポーツ', '学習', 'ソフトウェア', 'ビジネス', 'ゲーム', 'ニュース', 'ヘルスケア', 'ショッピング', 'その他',
]
