import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description: 'nobi-laboのプライバシーポリシーです。',
  alternates: { canonical: '/privacy' },
}

const SECTIONS = [
  {
    title: '1. 基本方針',
    paras: ['nobi-labo（以下「当サイト」）は、ユーザーの個人情報を適切に取り扱うことを重要な責務と考え、以下のとおりプライバシーポリシーを定めます。'],
    list: null,
  },
  {
    title: '2. 収集する情報',
    paras: ['当サイトおよび各Webアプリでは、以下の情報を収集する場合があります。'],
    list: [
      'お問い合わせフォームにご入力いただいたお名前・メールアドレス・メッセージ',
      'アカウント登録時のメールアドレスおよびGoogleアカウント情報',
      'アクセスログ（IPアドレス・ブラウザ種別・参照元URLなど）',
      'Cookieおよびローカルストレージに保存されるアプリ利用データ',
    ],
  },
  {
    title: '3. 利用目的',
    paras: ['収集した情報は、以下の目的にのみ使用します。'],
    list: [
      'お問い合わせへの返信',
      '各Webアプリのサービス提供および機能改善',
      'アクセス状況の分析によるサイト改善',
      '重要なお知らせの通知（サービス変更・終了など）',
    ],
  },
  {
    title: '4. 第三者への提供',
    paras: ['法令に基づく開示が必要な場合を除き、ユーザーの同意なく個人情報を第三者に提供することはありません。'],
    list: null,
  },
  {
    title: '5. アフィリエイト・広告について',
    paras: [
      '当サイトの一部リンクは、楽天アフィリエイトおよびAmazonアソシエイトのアフィリエイトリンクを含みます。リンク経由でのご購入時に手数料が発生する場合がありますが、購入者のお支払い金額に変わりはありません。',
      'アフィリエイトリンクを含むコンテンツは、その旨を明記するよう努めます。',
    ],
    list: null,
  },
  {
    title: '6. Google Analytics',
    paras: [
      '当サイトはアクセス解析のためGoogle Analyticsを使用しています。Google Analyticsはトラフィックデータの収集のためにCookieを使用します。このデータは匿名で収集されており、個人を特定するものではありません。',
      'Google Analyticsのデータ収集を無効にするには、Google アナリティクス オプトアウト アドオンをご利用ください。',
    ],
    list: null,
  },
  {
    title: '7. プライバシーポリシーの変更',
    paras: ['本ポリシーの内容は、法令の改正やサービス内容の変更に伴い、予告なく改定する場合があります。変更後のポリシーは当ページに掲載した時点で効力を生じます。'],
    list: null,
  },
  {
    title: '8. 日本株スクリーナー・kabu-signal・Kabu Noteについて',
    paras: [
      'これら3つのサービスは共通のアカウント基盤を利用しており、保有銘柄・取得単価・ウォッチリスト・損益アラート設定等の金融情報を扱います。これらの情報は利用者ごとにアクセス制御されたデータベースに保存し、他の利用者から参照できない構成としています。',
    ],
    list: [
      '詳細は日本株スクリーナーの「プライバシーポリシー」をご確認ください（screener.nobi-labo.com/legal/privacy.html）',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* PAGE HEADER */}
      <section className="max-w-[800px] mx-auto px-6 pt-14 pb-12">
        <div className="flex items-center gap-2 text-[13px] text-muted mb-8">
          <Link href="/" className="hover:text-primary transition-colors">nobi-labo</Link>
          <span>›</span>
          <span className="text-ink font-medium">Privacy Policy</span>
        </div>
        <h1 className="font-extrabold tracking-[-0.03em] leading-[1.15]"
          style={{ fontSize: 'clamp(32px, 4.5vw, 52px)' }}>
          プライバシーポリシー
        </h1>
        <p className="mt-[14px] text-[14px] text-muted">最終更新：2026年7月</p>
      </section>

      {/* BODY */}
      <section className="max-w-[800px] mx-auto px-6 pb-24 flex flex-col gap-[52px]">
        {SECTIONS.map(sec => (
          <div key={sec.title}>
            <h2 className="text-[20px] font-extrabold tracking-[-0.02em] pb-[14px] border-b border-border">
              {sec.title}
            </h2>
            <div className="mt-5 flex flex-col gap-[14px]">
              {sec.paras.map((p, i) => (
                <p key={i} className="text-[15px] leading-[1.9] text-ink2">{p}</p>
              ))}
            </div>
            {sec.list && (
              <ul className="mt-4 flex flex-col gap-[10px]">
                {sec.list.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px] leading-[1.8] text-ink2">
                    <span className="flex-none mt-2 w-[5px] h-[5px] rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {/* Contact note */}
        <div className="bg-primary-light rounded-2xl px-8 py-7">
          <div className="text-[13px] font-bold tracking-[0.08em] text-primary">お問い合わせ</div>
          <p className="mt-3 text-[15px] leading-[1.8] text-ink2">
            プライバシーポリシーに関するご質問は、
            <Link href="/contact" className="text-primary underline underline-offset-[3px]">お問い合わせフォーム</Link>
            よりご連絡ください。
          </p>
        </div>
      </section>

    </div>
  )
}
