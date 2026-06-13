'use client';

import { useMemo, useState } from 'react';
import { calculateBazi } from '@/lib/bazi';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const href = (path: string) => `${basePath}${path}`;

const years = Array.from({ length: 121 }, (_, i) => 1900 + i);
const months = Array.from({ length: 12 }, (_, i) => i + 1);
const days = Array.from({ length: 31 }, (_, i) => i + 1);
const hours = Array.from({ length: 24 }, (_, i) => i);

export default function BaziCalculator({ compact = false }: { compact?: boolean }) {
  const now = new Date();
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [year, setYear] = useState(1990);
  const [month, setMonth] = useState(5);
  const [day, setDay] = useState(15);
  const [hour, setHour] = useState(10);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const result = useMemo(() => {
    if (!submitted) return null;
    try {
      setError('');
      return calculateBazi({ sex, year, month, day, hour });
    } catch (e: any) {
      setError(e?.message || '日期無法計算，請檢查輸入。');
      return null;
    }
  }, [submitted, sex, year, month, day, hour]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => document.getElementById('bazi-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 30);
  }

  const pillarRows = result ? [
    ['年柱', result.pillars.year, result.wuXing.pillarElements.year, result.tenGods.heavenly.year, result.tenGods.earthly.year.join('、')],
    ['月柱', result.pillars.month, result.wuXing.pillarElements.month, result.tenGods.heavenly.month, result.tenGods.earthly.month.join('、')],
    ['日柱', result.pillars.day, result.wuXing.pillarElements.day, result.tenGods.heavenly.day, result.tenGods.earthly.day.join('、')],
    ['時柱', result.pillars.time, result.wuXing.pillarElements.time, result.tenGods.heavenly.time, result.tenGods.earthly.time.join('、')],
  ] : [];

  return (
    <div>
      <form className="card" onSubmit={submit}>
        <h2 style={{ marginTop: 0 }}>{compact ? '重新排盤' : '輸入出生資料，即時排八字'}</h2>
        <p className="muted">P0 版本先用固定算法產生命盤，不用 GPT 亂計。預設 UTC+8，真太陽時後續再加。</p>
        <div className="form-grid">
          <label>性別
            <select className="select" value={sex} onChange={e => setSex(e.target.value as 'male' | 'female')}>
              <option value="male">男</option>
              <option value="female">女</option>
            </select>
          </label>
          <label>曆法
            <select className="select" disabled>
              <option>國曆 / 公曆</option>
            </select>
          </label>
          <label>出生年份
            <select className="select" value={year} onChange={e => setYear(Number(e.target.value))}>{years.map(y => <option key={y} value={y}>{y} 年</option>)}</select>
          </label>
          <label>月份
            <select className="select" value={month} onChange={e => setMonth(Number(e.target.value))}>{months.map(m => <option key={m} value={m}>{m} 月</option>)}</select>
          </label>
          <label>日期
            <select className="select" value={day} onChange={e => setDay(Number(e.target.value))}>{days.map(d => <option key={d} value={d}>{d} 日</option>)}</select>
          </label>
          <label>時辰
            <select className="select" value={hour} onChange={e => setHour(Number(e.target.value))}>{hours.map(h => <option key={h} value={h}>{String(h).padStart(2, '0')}:00</option>)}</select>
          </label>
          <button className="button gold full" type="submit">開始排盤</button>
        </div>
        <div className="notice">不需登入。輸入只在瀏覽器計算；目前未保存個人生日資料。</div>
      </form>

      {error && <div className="mini-card" style={{ marginTop: 18, borderColor: '#cc6b58' }}>{error}</div>}

      <section id="bazi-result" className={`result ${result ? 'show' : ''}`}>
        {result && (
          <>
            <div className="mini-card">
              <h2>你的八字命盤摘要</h2>
              <div className="badge-row">
                <span className="badge">公曆：{result.normalized.solar}</span>
                <span className="badge">農曆：{result.lunar.short}</span>
                <span className="badge">生肖：{result.lunar.zodiac}</span>
                <span className="badge">日主：{result.dayMaster}</span>
                <span className="badge">起運：{result.luck.start}</span>
              </div>
              <p className="muted">{result.normalized.convention}</p>
            </div>

            <div className="section" style={{ paddingBottom: 16 }}>
              <h2>四柱核心盤</h2>
              <div className="pillars">
                {pillarRows.map(r => <div className="pillar" key={r[0]}><span>{r[0]}</span><b>{r[1]}</b><small>{r[2]}</small></div>)}
              </div>
            </div>

            <table className="table">
              <thead><tr><th>柱</th><th>干支</th><th>五行</th><th>天干十神</th><th>地支藏干十神</th></tr></thead>
              <tbody>{pillarRows.map(r => <tr key={r[0]}>{r.map((c, i) => <td key={i}>{c}</td>)}</tr>)}</tbody>
            </table>

            <div className="cta">
              <h2>想看更完整的終身運勢？</h2>
              <p>這個免費盤先給你四柱、五行、十神和大運。下一版會加入事業、財運、感情、健康分段詳批與流年提醒。</p>
              <a className="button gold" href="#related">先看相關工具</a>
            </div>

            <div className="grid2">
              <div className="mini-card">
                <h3>五行分佈</h3>
                <table className="table"><tbody>{Object.entries(result.wuXing.counts).map(([k, v]) => <tr key={k}><td>{k}</td><td>{String(v)}</td></tr>)}</tbody></table>
                <p className="muted">偏旺：{result.wuXing.strongest}；偏弱：{result.wuXing.weakest}。{result.wuXing.advice}</p>
              </div>
              <div className="mini-card">
                <h3>大運簡表</h3>
                <table className="table"><thead><tr><th>開始年</th><th>年齡</th><th>大運</th></tr></thead><tbody>{result.luck.daYun.map((d: any) => <tr key={`${d.startYear}-${d.ganZhi}`}><td>{d.startYear}</td><td>{d.startAge}</td><td>{d.ganZhi}</td></tr>)}</tbody></table>
              </div>
            </div>

            <div className="section" id="related">
              <h2>下一步可以看</h2>
              <div className="grid3">
                <a className="mini-card" href={href('/tools/wuxing/')}><h3>五行查詢</h3><p className="muted">看木火土金水偏旺偏弱。</p></a>
                <a className="mini-card" href={href('/tools/hehun/')}><h3>八字合婚</h3><p className="muted">後續加入雙人命盤匹配。</p></a>
                <a className="mini-card" href={href('/articles/yongshen/')}><h3>喜用神入門</h3><p className="muted">先理解用神不是簡單缺乜補乜。</p></a>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
