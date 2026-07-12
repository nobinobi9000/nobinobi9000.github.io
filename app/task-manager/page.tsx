import type { Metadata } from 'next'
import Link from 'next/link'
import AppCarousel from '@/components/AppCarousel'

export const metadata: Metadata = {
  title: 'Task Manager',
  description: '重要度×緊急度の2軸でタスクを自動分類するToDo管理ツール。アイゼンハワーマトリクスで「すぐやる・後でやる・任せる・保留」に即振り分け。登録不要・無料。',
  alternates: { canonical: '/task-manager' },
}

const SLIDES = [
  { src: '/screenshots/taskmanager_top.png', caption: 'ダッシュボード' },
]

export default function TaskManagerPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-[1200px] mx-auto px-6 pt-14 pb-[72px]">
        <div className="flex items-center gap-2 text-[13px] text-[#999999] mb-10">
          <Link href="/" className="hover:text-[#2D6A4F] transition-colors">nobi-labo</Link>
          <span>›</span>
          <Link href="/apps" className="hover:text-[#2D6A4F] transition-colors">Apps</Link>
          <span>›</span>
          <span className="text-[#111111] font-medium">Task Manager</span>
        </div>
        <div className="grid gap-16 items-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          <div>
            <span className="inline-block px-3 py-[5px] text-[12px] font-bold rounded-full text-[#6D28D9] bg-[#F5F1FC]">📋 Work</span>
            <h1 className="mt-[22px] font-extrabold leading-[1.15] tracking-[-0.03em]" style={{ fontSize: 'clamp(32px, 4.5vw, 54px)' }}>
              優先順位を、<br />迷わず決める。
            </h1>
            <p className="mt-[22px] text-[17px] leading-[1.85] text-[#444444] max-w-[480px]">
              重要度×緊急度の2軸でタスクを自動分類。アイゼンハワーマトリクスをそのまま使えるシンプルなToDo管理ツール。
            </p>
            <div className="mt-6 flex gap-2 flex-wrap">
              {['無料', '登録不要', '優先度管理', 'ブラウザ保存'].map(tag => (
                <span key={tag} className="px-3 py-[5px] text-[12.5px] font-medium rounded-lg text-[#444444] bg-[#F7F7F7] border border-[#EBEBEB]">{tag}</span>
              ))}
            </div>
            <a href="/todo-manager-app/" target="_blank" rel="noopener noreferrer"
              className="mt-8 inline-block px-7 py-4 text-[15px] font-bold text-white bg-[#2D6A4F] rounded-[11px] hover:bg-[#21503b] transition-colors">
              今すぐ無料で使う →
            </a>
          </div>
          <AppCarousel slides={SLIDES} accentColor="#6D28D9" bgColor="#F5F1FC" />
        </div>
      </section>

      <section className="bg-[#F7F7F7] py-[72px] px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">STORY — 開発の背景</div>
          <div className="mt-9 max-w-[720px]">
            <blockquote className="border-l-[3px] border-[#2D6A4F] pl-7">
              <p className="text-[20px] font-semibold leading-[1.8] text-[#111111]">「締め切りが近いタスクばかり対応して、本当に重要なことを後回しにし続けていた。」</p>
            </blockquote>
            <p className="mt-7 text-[16px] leading-[1.9] text-[#444444]">アイゼンハワーマトリクスで優先順位を可視化するツールを自分のために作りました。重要度と緊急度の2軸で自動分類することで、何から手をつけるべきか考える時間をゼロにします。</p>
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 py-[72px]">
        <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">FEATURES — 機能</div>
        <div className="mt-8 grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {[
            { num: '01', title: '4象限マトリクスで即振り分け', desc: '重要度と緊急度の組み合わせでタスクを追加した瞬間に「すぐやる・後でやる・任せる・保留」の4象限へ自動配置。' },
            { num: '02', title: 'モダンダッシュボードで全体を把握', desc: 'KPIタイル・カテゴリ別バーチャート・週次完了トレンド・象限別ドーナツグラフを1画面に集約。' },
            { num: '03', title: '委任フローで「任せた」を記録', desc: '「任せる」象限のタスクは完了時に「委任して完了」または「自分でやった」を選んで記録。' },
            { num: '04', title: '登録不要・ブラウザに自動保存', desc: 'アカウント作成は一切不要。データはブラウザのlocalStorageに自動保存されます。' },
          ].map(f => (
            <div key={f.num} className="border border-[#EBEBEB] rounded-2xl p-7 hover:border-[#2D6A4F] transition-colors">
              <div className="text-[13px] font-extrabold tracking-[0.04em] text-[#2D6A4F]">{f.num}</div>
              <h3 className="mt-[14px] text-[18px] font-extrabold tracking-[-0.02em]">{f.title}</h3>
              <p className="mt-[10px] text-[14px] leading-[1.75] text-[#444444]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MATRIX EXPLAINER */}
      <section className="bg-[#F7F7F7] py-[72px] px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">EISENHOWER MATRIX — アイゼンハワーマトリクスとは</div>
          <p className="mt-7 text-[16px] leading-[1.9] text-[#444444] max-w-[720px]">
            第34代アメリカ大統領ドワイト・D・アイゼンハワーが実践したとされる優先度管理の手法。「重要かどうか」と「緊急かどうか」の2軸で全タスクを4つに分類し、力を注ぐべき仕事を明確にします。
          </p>
          <div className="mt-8 grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            {[
              { label: 'すぐやる', sub: '重要 × 緊急', bg: '#FCEBEB', fg: '#A32D2D', desc: '最優先。今すぐ対応する。締め切りのある重要案件など。' },
              { label: '後でやる', sub: '重要 × 非緊急', bg: '#E6F1FB', fg: '#185FA5', desc: '計画を立てて取り組む。スキルアップや戦略など長期的に重要なもの。' },
              { label: '任せる',   sub: '非重要 × 緊急', bg: '#FAEEDA', fg: '#854F0B', desc: '委任が正解。自分でやる必要はないが、放置もできないもの。' },
              { label: '保留',    sub: '非重要 × 非緊急', bg: '#F1EFE8', fg: '#5F5E5A', desc: '後回しでOK。やらなくても実害がないタスク。定期的に見直して削除も検討。' },
            ].map(q => (
              <div key={q.label} className="rounded-2xl p-6" style={{ background: q.bg }}>
                <div className="text-[16px] font-extrabold mb-1" style={{ color: q.fg }}>{q.label}</div>
                <div className="text-[11px] mb-3 tracking-[0.02em]" style={{ color: q.fg, opacity: 0.8 }}>{q.sub}</div>
                <div className="text-[13px] leading-[1.75]" style={{ color: q.fg, opacity: 0.9 }}>{q.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW TO USE */}
      <section className="max-w-[1200px] mx-auto px-6 py-[72px]">
        <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">HOW TO USE — 使い方</div>
        <div className="mt-9 max-w-[600px] flex flex-col gap-0">
          {[
            { n: '1', title: 'アプリを開く', desc: '登録不要。ブラウザで「今すぐ使う」ボタンを押すだけ。スマートフォン・PC両対応。' },
            { n: '2', title: 'タスク名・カテゴリ・期限を入力する', desc: '画面上部の入力フォームからタスクを追加。カテゴリは「仕事 / 個人 / 学習 / その他 / カスタム」から選択。' },
            { n: '3', title: '重要度・緊急度を選んで追加', desc: '「重要」「緊急」の2つのチェックボックスをON/OFFするだけ。追加した瞬間に正しい象限へ自動配置されます。' },
            { n: '4', title: 'タスクを完了させる', desc: '各タスクのチェックボックスをクリックで完了。「任せる」象限のタスクは「委任して完了」か「自分でやった」を選んで記録できます。' },
            { n: '5', title: 'ダッシュボードで進捗を確認', desc: '画面上部のタブで「ダッシュボード」に切り替えると、完了率・週次トレンド・カテゴリ別内訳を一覧表示。' },
          ].map((step, i, arr) => (
            <div key={step.n} className="flex gap-5 pb-9">
              <div className="flex flex-col items-center gap-0 flex-none">
                <div className="w-9 h-9 rounded-full bg-[#2D6A4F] text-white text-[14px] font-extrabold flex items-center justify-center flex-none">{step.n}</div>
                {i < arr.length - 1 && <div className="w-[1.5px] flex-1 bg-[#EBEBEB] mt-2" />}
              </div>
              <div className="pt-[6px]">
                <div className="text-[17px] font-bold tracking-[-0.01em]">{step.title}</div>
                <div className="mt-2 text-[14px] leading-[1.75] text-[#444444]">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F7F7F7] py-[72px] px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">FAQ — よくある質問</div>
          <div className="mt-8 border border-[#EBEBEB] rounded-2xl overflow-hidden bg-white">
            {[
              { q: 'アカウント登録は必要ですか？', a: '不要です。ブラウザでURLを開くだけで、登録なしにすぐ使えます。' },
              { q: 'データはどこに保存されますか？', a: 'ブラウザのlocalStorageに保存されます。サーバーには一切送信されません。ブラウザのデータをクリアすると削除されます。' },
              { q: 'スマートフォンで使えますか？', a: 'はい。スマートフォン・タブレット・PCのすべてに対応しています。スマホではタスクが縦並びで表示されます。' },
              { q: '複数デバイスで同期できますか？', a: 'localStorageはデバイス・ブラウザごとに独立しているため、現在はデバイス間の同期に対応していません。' },
            ].map((faq, i, arr) => (
              <div key={i} className={`p-7 ${i < arr.length - 1 ? 'border-b border-[#EBEBEB]' : ''}`}>
                <div className="flex gap-[14px] items-start">
                  <span className="flex-none text-[18px] font-extrabold text-[#2D6A4F] leading-[1.3]">Q.</span>
                  <div>
                    <div className="text-[16px] font-bold tracking-[-0.01em]">{faq.q}</div>
                    <div className="mt-3 text-[14.5px] leading-[1.8] text-[#444444]">{faq.a}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 pb-24 pt-[72px]">
        <div className="bg-[#F0F7F4] rounded-[20px] p-16 text-center">
          <h2 className="font-extrabold tracking-[-0.03em] leading-[1.2]" style={{ fontSize: 'clamp(26px, 3.8vw, 42px)' }}>優先順位を、迷わず決めよう。</h2>
          <p className="mt-4 text-[17px] leading-[1.8] text-[#444444] max-w-[480px] mx-auto">無料・登録不要。ブラウザで今すぐ使えます。</p>
          <a href="/todo-manager-app/" target="_blank" rel="noopener noreferrer"
            className="mt-8 inline-block px-9 py-4 text-[16px] font-bold text-white bg-[#2D6A4F] rounded-[12px] hover:bg-[#21503b] transition-colors">
            今すぐ無料で使う →
          </a>
        </div>
      </section>
    </div>
  )
}
