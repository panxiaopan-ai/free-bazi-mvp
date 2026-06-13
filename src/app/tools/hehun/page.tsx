const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const href = (path: string) => `${basePath}${path}`;

export const metadata = {
  title: '八字合婚｜免費合盤入口',
  description: '八字合婚工具入口，後續會加入雙人四柱、五行互補、夫妻宮與流年匹配。',
};

export default function HeHunPage() {
  return (
    <main className="section">
      <div className="container article">
        <span className="eyebrow">感情工具</span>
        <h1>八字合婚</h1>
        <p>合婚頁先上線佔位，今日目標是讓 Google 看到工具架構與 sitemap。下一版會加入雙方生日輸入、四柱對照、五行互補、十神關係與流年相處提醒。</p>
        <div className="grid2">
          <div className="mini-card"><h3>會分析什麼？</h3><p>雙方日主、夫妻宮、五行互補、十神互動、大運年份衝合。</p></div>
          <div className="mini-card"><h3>現在可以先做什麼？</h3><p>先各自排一個八字盤，記低日主、五行偏弱與大運年份。</p><a className="button" href={href('/bazi/')}>先排八字</a></div>
        </div>
      </div>
    </main>
  );
}
