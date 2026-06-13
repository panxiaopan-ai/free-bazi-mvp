import type { Metadata } from 'next';
import './globals.css';

const basePath = process.env.GITHUB_PAGES === 'true' ? '/free-bazi-mvp' : '';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://panxiaopan-ai.github.io/free-bazi-mvp';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: '免費八字命盤｜生辰八字排盤、五行、十神、大運流年',
  description: '免費輸入出生日期時間，即時生成生辰八字命盤、四柱、五行、十神與大運流年摘要。繁體中文命理工具，無需登入。',
  keywords: ['八字', '生辰八字', '八字排盤', '五行查詢', '十神', '大運流年', '免費算命'],
  alternates: { canonical: '/' },
  openGraph: {
    title: '免費八字命盤工具',
    description: '即時生成四柱八字、五行、十神、大運流年摘要。',
    url: siteUrl,
    siteName: '八字命盤工具',
    locale: 'zh_HK',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

function href(path: string) {
  return `${basePath}${path}`;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant-HK">
      <body>
        <header className="nav">
          <div className="container nav-inner">
            <a className="brand" href={href('/')}>八字命盤工具</a>
            <nav className="nav-links">
              <a href={href('/bazi/')}>八字排盤</a>
              <a href={href('/tools/wuxing/')}>五行查詢</a>
              <a href={href('/tools/hehun/')}>八字合婚</a>
              <a href={href('/tools/yinyuan/')}>姻緣分析</a>
              <a href={href('/articles/yongshen/')}>喜用神</a>
            </nav>
          </div>
        </header>
        {children}
        <footer className="footer">
          <div className="container">
            <b>八字命盤工具</b>
            <p>本網站內容只供文化研究、娛樂與自我反思參考，不構成任何人生、醫療、法律或投資建議。</p>
            <p><a href={href('/sitemap.xml')}>Sitemap</a> · <a href={href('/robots.txt')}>Robots</a></p>
          </div>
        </footer>
      </body>
    </html>
  );
}
