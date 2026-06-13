import BaziCalculator from '@/components/BaziCalculator';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const href = (path: string) => `${basePath}${path}`;

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">免費 · 無需登入 · 即時排盤</span>
            <h1 className="h1">生辰八字排盤，先看四柱、五行、十神與大運</h1>
            <p className="lead">輸入出生日期時間，即時生成八字命盤摘要。第一版先求快、準、能上線；所有解讀均以 deterministic SDK 計算，不靠 GPT 亂估。</p>
            <div className="hero-points">
              <div className="point"><b>四柱命盤</b><br />年柱、月柱、日柱、時柱</div>
              <div className="point"><b>五行查詢</b><br />木火土金水強弱摘要</div>
              <div className="point"><b>十神分析</b><br />天干十神與藏干十神</div>
              <div className="point"><b>大運簡表</b><br />起運時間與 10 年大運</div>
            </div>
            <div className="badge-row">
              <span className="badge">繁體中文</span><span className="badge">UTC+8</span><span className="badge">立春換年</span><span className="badge">文化參考</span>
            </div>
          </div>
          <BaziCalculator />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>免費工具</h2>
          <p className="muted">先上最重要的 SEO 入口，後面再逐個補深度。</p>
          <div className="grid3">
            <a className="mini-card" href={href('/bazi/')}><h3>八字排盤</h3><p className="muted">核心工具：四柱、五行、十神、大運。</p></a>
            <a className="mini-card" href={href('/tools/wuxing/')}><h3>五行查詢</h3><p className="muted">快速看命盤五行偏旺偏弱。</p></a>
            <a className="mini-card" href={href('/tools/hehun/')}><h3>八字合婚</h3><p className="muted">雙人合盤工具，先上入口頁。</p></a>
            <a className="mini-card" href={href('/tools/yinyuan/')}><h3>姻緣何時來</h3><p className="muted">感情/正緣 intent 頁。</p></a>
            <a className="mini-card" href={href('/articles/yongshen/')}><h3>喜用神入門</h3><p className="muted">用神不是缺什麼補什麼。</p></a>
            <a className="mini-card" href={href('/articles/shishen/')}><h3>十神是什麼</h3><p className="muted">理解比肩、劫財、食神、正官等。</p></a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid2">
          <div className="mini-card">
            <h2>為什麼先做八字？</h2>
            <p className="muted">八字搜尋 intent 清晰，用戶願意輸入生日時間，結果頁可以自然承接五行、用神、流年、合婚與付費詳批。</p>
          </div>
          <div className="mini-card">
            <h2>準確度聲明</h2>
            <p className="muted">本工具目前以公開 SDK 計算四柱和基礎資料，仍需與多個排盤來源交叉驗證；不作保證性預測。</p>
          </div>
        </div>
      </section>
    </main>
  );
}
