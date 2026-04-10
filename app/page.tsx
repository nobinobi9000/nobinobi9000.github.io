import { getPosts } from '@/lib/notion'
import HomeWithTabs from './HomeWithTabs'

export const revalidate = 3600

export default async function Home() {
  const posts = await getPosts()

  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <span className="hero-label">nobi-labo</span>
          <h1>日々の生活に<br /><em>ちょっと便利</em>を<br />プラス。</h1>
          <p className="hero-sub">
            日常の小さな不便を解消する、<br />
            個人開発のWebアプリを公開しています。
          </p>
        </div>
      </section>

      <HomeWithTabs posts={posts} />
    </>
  )
}
