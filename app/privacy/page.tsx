import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description: 'nobi-laboのプライバシーポリシーです。',
}

export default function PrivacyPage() {
  return (
    <div className="privacy-content">
      <h1 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '8px', color: 'var(--white)' }}>
        プライバシーポリシー
      </h1>
      <p style={{ fontSize: '12px', color: '#555', marginBottom: '40px' }}>最終更新：2026年3月</p>

      <h2>個人情報の利用目的</h2>
      <p>当サイトでは、お問い合わせの際にメールアドレスなどの個人情報をいただく場合がございます。取得した個人情報は、お問い合わせへの回答のためにのみ利用し、それ以外の目的に使用することはありません。</p>

      <h2>広告について</h2>
      <p>当サイトでは、第三者配信の広告サービス（Google AdSense）を利用する場合があります。広告配信事業者はCookieを使用して、ユーザーの興味に応じた広告を表示することがあります。Cookieを無効にする設定やGoogle広告のオプトアウトについては、<a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--orange)' }}>Googleの広告ポリシー</a>をご確認ください。</p>

      <h2>アクセス解析ツールについて</h2>
      <p>当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。このGoogleアナリティクスはCookieを使用したデータ収集を行っています。収集されるデータは匿名であり、個人を特定するものではありません。</p>

      <h2>アフィリエイトについて</h2>
      <p>当サイトは楽天アフィリエイト・Amazonアソシエイトプログラムに参加しています。当サイトのリンクを通じて商品を購入された場合、当サイトに紹介料が支払われることがあります。</p>

      <h2>免責事項</h2>
      <p>当サイトに掲載している情報については、できる限り正確を期していますが、正確性・安全性を保証するものではありません。当サイトの情報を利用したことで生じたいかなる損害についても、当サイトは責任を負いかねます。</p>

      <h2>著作権について</h2>
      <p>当サイトに掲載されているコンテンツの著作権は、特別な記載がない限りnobi-laboに帰属します。無断転載・複製はお断りしています。</p>

      <h2>プライバシーポリシーの変更</h2>
      <p>当サイトは、本プライバシーポリシーを随時更新することがあります。重要な変更がある場合は当サイト上でお知らせします。</p>

      <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
        <a href="/" style={{ fontSize: '12px', color: 'var(--orange)', textDecoration: 'none' }}>← トップページに戻る</a>
      </div>
    </div>
  )
}
