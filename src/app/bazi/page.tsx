import BaziCalculator from '@/components/BaziCalculator';

export const metadata = {
  title: '免費八字排盤｜四柱、五行、十神、大運流年',
  description: '免費生辰八字排盤工具，輸入出生日期時間，即時生成四柱、五行、十神與大運流年摘要。',
};

export default function BaziPage() {
  return (
    <main className="section">
      <div className="container">
        <div className="article">
          <span className="eyebrow">核心工具</span>
          <h1>免費八字排盤</h1>
          <p>這頁是本站 P0 核心頁。先把四柱、五行、十神、大運跑通，之後再加更完整的事業、財運、感情與流年解讀。</p>
        </div>
        <BaziCalculator compact />
      </div>
    </main>
  );
}
