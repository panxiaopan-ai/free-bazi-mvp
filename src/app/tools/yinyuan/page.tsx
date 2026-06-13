const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const href = (path: string) => `${basePath}${path}`;

export const metadata = {
  title: '姻緣何時來｜八字感情流年入口',
  description: '從八字日主、桃花、夫妻宮與流年角度，建立姻緣分析工具入口。',
};

export default function YinYuanPage() {
  return (
    <main className="section">
      <div className="container article">
        <span className="eyebrow">姻緣工具</span>
        <h1>姻緣何時來</h1>
        <p>這頁先建立搜尋入口。後續會加入八字桃花、夫妻宮、流年合沖、正緣年份與感情風險提醒。</p>
        <div className="cta">
          <h2>先排命盤，再看姻緣</h2>
          <p>姻緣分析要先有四柱與大運，否則只是泛泛而談。</p>
          <a className="button gold" href={href('/bazi/')}>免費排盤</a>
        </div>
      </div>
    </main>
  );
}
