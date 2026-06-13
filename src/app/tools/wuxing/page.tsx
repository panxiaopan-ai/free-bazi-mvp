import BaziCalculator from '@/components/BaziCalculator';

export const metadata = {
  title: '八字五行查詢｜木火土金水強弱分析',
  description: '免費查詢八字五行分佈，了解木火土金水偏旺偏弱，並查看四柱與十神摘要。',
};

export default function WuXingPage() {
  return (
    <main className="section">
      <div className="container">
        <div className="article">
          <span className="eyebrow">五行工具</span>
          <h1>八字五行查詢</h1>
          <p>五行不是簡單「缺什麼補什麼」。第一步是先排出四柱，看天干地支、藏干與季節力量，再判斷木、火、土、金、水的相對分佈。</p>
        </div>
        <BaziCalculator compact />
      </div>
    </main>
  );
}
