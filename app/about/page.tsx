import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '運営者情報',
  description: 'nobi-laboの運営者情報・プロフィールページです。日常の小さな不便を解消する個人開発Webアプリを公開しています。',
}

export default function AboutPage() {
  return (
    <div className="privacy-content">
      <h1 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '8px', color: 'var(--white)' }}>
        運営者情報
      </h1>
      <p style={{ fontSize: '12px', color: '#555', marginBottom: '40px' }}>最終更新：2026年4月</p>

      <h2>nobi-labo について</h2>
      <p>
        「日々の生活にちょっと便利をプラス」をテーマに、日常の小さな不便を解消するWebアプリを個人で開発・公開しているサイトです。
        Claude Codeをはじめとした最新のAIツールを活用し、アイデアから実装まで一人で手がけています。
      </p>

      <h2>運営者</h2>
      <p>屋号：nobi-labo</p>
      <p>
        日常で感じた「ちょっと不便」を出発点に、自分が使いたいと思うアプリを作り続けています。
        マンガ・ゲーム・家計管理・習慣化など、生活に近いテーマが中心です。
      </p>

      <h2>公開しているアプリ</h2>
      <p>現在、以下のWebアプリを無料で公開しています。</p>
      <ul style={{ paddingLeft: '1.5em', marginTop: '0.5em', marginBottom: '1em' }}>
        <li style={{ marginBottom: '0.5em' }}>
          <a href="/comic-checker" style={{ color: 'var(--orange)' }}>comic-checker</a>
          　— マンガの新刊発売日をPush通知でお知らせ
        </li>
        <li style={{ marginBottom: '0.5em' }}>
          <a href="/questlog" style={{ color: 'var(--orange)' }}>QUESTLOG</a>
          　— 積みゲーを前向きに管理するバックログアプリ
        </li>
        <li style={{ marginBottom: '0.5em' }}>
          <a href="/subshari" style={{ color: 'var(--orange)' }}>サブスク断捨離</a>
          　— サブスク支出の可視化と断捨離・投資換算
        </li>
        <li style={{ marginBottom: '0.5em' }}>
          <a href="/sorosoro" style={{ color: 'var(--orange)' }}>SoroSoro</a>
          　— 日用品の補充をPush通知でリマインド
        </li>
        <li style={{ marginBottom: '0.5em' }}>
          <a href="/mebae" style={{ color: 'var(--orange)' }}>めばえ</a>
          　— ハビットスタッキングで習慣を積み上げるアプリ
        </li>
        <li style={{ marginBottom: '0.5em' }}>
          <a href="/kabu-note" style={{ color: 'var(--orange)' }}>Kabu Note</a>
          　— 複数証券口座をまとめて管理するポートフォリオアプリ
        </li>
      </ul>

      <h2>お問い合わせ</h2>
      <p>
        ご意見・ご感想・不具合報告などは、X（Twitter）のDMからお気軽にどうぞ。
      </p>
      <p>
        <a
          href="https://twitter.com/nobi_labo"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--orange)' }}
        >
          @nobi_labo（X / Twitter）
        </a>
      </p>

      <h2>免責事項</h2>
      <p>
        当サイトおよびアプリの情報は正確を期していますが、内容の正確性・安全性を保証するものではありません。
        当サイトの利用によって生じたいかなる損害についても、運営者は責任を負いかねます。
      </p>

      <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
        <a href="/" style={{ fontSize: '12px', color: 'var(--orange)', textDecoration: 'none' }}>← トップページに戻る</a>
      </div>
    </div>
  )
}
