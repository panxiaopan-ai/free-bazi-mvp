import { Solar } from 'lunar-typescript';

export type BaziInput = {
  sex: 'male' | 'female';
  year: number;
  month: number;
  day: number;
  hour: number;
  minute?: number;
};

const zhiHidden: Record<string, string[]> = {
  子: ['癸'], 丑: ['己', '癸', '辛'], 寅: ['甲', '丙', '戊'], 卯: ['乙'], 辰: ['戊', '乙', '癸'], 巳: ['丙', '戊', '庚'],
  午: ['丁', '己'], 未: ['己', '丁', '乙'], 申: ['庚', '壬', '戊'], 酉: ['辛'], 戌: ['戊', '辛', '丁'], 亥: ['壬', '甲'],
};

const elementMap: Record<string, string> = {
  甲: '木', 乙: '木', 寅: '木', 卯: '木',
  丙: '火', 丁: '火', 巳: '火', 午: '火',
  戊: '土', 己: '土', 辰: '土', 戌: '土', 丑: '土', 未: '土',
  庚: '金', 辛: '金', 申: '金', 酉: '金',
  壬: '水', 癸: '水', 子: '水', 亥: '水',
};

const elementAdvice: Record<string, string> = {
  木: '木代表生長、規劃、學習與人脈。木弱時可多做長期規劃、內容沉澱、教育學習類行動。',
  火: '火代表表達、曝光、熱情與行動。火弱時可加強展示、發布、社交與品牌輸出。',
  土: '土代表穩定、承載、信用與執行。土弱時要建立流程、紀律、存量資產和風險控制。',
  金: '金代表規則、效率、決斷與商業化。金弱時要強化取捨、定價、制度與成交能力。',
  水: '水代表流動、智慧、資源與彈性。水弱時要增加資訊來源、現金流意識與策略選擇。',
};

const tradMap: Record<string, string> = {
  马: '馬', 龙: '龍', 鸡: '雞', 猪: '豬', 鼠: '鼠', 牛: '牛', 虎: '虎', 兔: '兔', 蛇: '蛇', 羊: '羊', 猴: '猴', 狗: '狗',
  财: '財', 杀: '殺', 劫财: '劫財', 正财: '正財', 偏财: '偏財', 七杀: '七殺', 伤官: '傷官',
  个: '個', 阳: '陽', 阴: '陰', 纳: '納', 凤: '鳳', 岁: '歲', 后: '後',
};

function toTradText(value: string) {
  return Object.entries(tradMap).reduce((acc, [s, t]) => acc.split(s).join(t), value);
}

function toTradArray(values: string[]) {
  return values.map(toTradText);
}

function countElements(pillars: string[]) {
  const counts: Record<string, number> = { 木: 0, 火: 0, 土: 0, 金: 0, 水: 0 };
  for (const pillar of pillars) {
    for (const ch of pillar) {
      const el = elementMap[ch];
      if (el) counts[el] += 1;
      if (zhiHidden[ch]) {
        for (const gan of zhiHidden[ch]) {
          const hiddenEl = elementMap[gan];
          if (hiddenEl) counts[hiddenEl] += 0.35;
        }
      }
    }
  }
  return Object.fromEntries(Object.entries(counts).map(([k, v]) => [k, Math.round(v * 100) / 100]));
}

function formatHour(h: number) {
  const names = ['子', '丑', '丑', '寅', '寅', '卯', '卯', '辰', '辰', '巳', '巳', '午', '午', '未', '未', '申', '申', '酉', '酉', '戌', '戌', '亥', '亥', '子'];
  return `${names[h] || '子'}時`;
}

export function calculateBazi(input: BaziInput) {
  const solar = Solar.fromYmdHms(input.year, input.month, input.day, input.hour, input.minute || 0, 0);
  const lunar = solar.getLunar();
  const ec = lunar.getEightChar();
  const pillars = [ec.getYear(), ec.getMonth(), ec.getDay(), ec.getTime()];
  const elementCounts = countElements(pillars);
  const sorted = Object.entries(elementCounts).sort((a, b) => b[1] - a[1]);
  const strongest = sorted[0][0];
  const weakest = sorted[sorted.length - 1][0];
  const yun = ec.getYun(input.sex === 'male' ? 1 : 0);
  const daYun = yun.getDaYun().slice(1, 9).map((d: any) => ({
    startYear: d.getStartYear(),
    startAge: d.getStartAge(),
    ganZhi: d.getGanZhi(),
  }));

  return {
    input,
    normalized: {
      solar: solar.toYmdHms(),
      hourLabel: formatHour(input.hour),
      convention: 'UTC+8 civil time; 立春換年；真太陽時未啟用；結果供參考',
    },
    lunar: {
      short: lunar.toString(),
      full: toTradText(lunar.toFullString()),
      zodiac: toTradText(lunar.getYearShengXiao()),
    },
    pillars: {
      year: ec.getYear(),
      month: ec.getMonth(),
      day: ec.getDay(),
      time: ec.getTime(),
    },
    wuXing: {
      pillarElements: {
        year: ec.getYearWuXing(),
        month: ec.getMonthWuXing(),
        day: ec.getDayWuXing(),
        time: ec.getTimeWuXing(),
      },
      counts: elementCounts,
      strongest,
      weakest,
      advice: elementAdvice[weakest],
    },
    tenGods: {
      heavenly: {
        year: toTradText(ec.getYearShiShenGan()),
        month: toTradText(ec.getMonthShiShenGan()),
        day: toTradText(ec.getDayShiShenGan()),
        time: toTradText(ec.getTimeShiShenGan()),
      },
      earthly: {
        year: toTradArray(ec.getYearShiShenZhi()),
        month: toTradArray(ec.getMonthShiShenZhi()),
        day: toTradArray(ec.getDayShiShenZhi()),
        time: toTradArray(ec.getTimeShiShenZhi()),
      },
    },
    dayMaster: ec.getDay()[0],
    luck: {
      start: `${yun.getStartYear()}年${yun.getStartMonth()}個月${yun.getStartDay()}天`,
      startSolar: yun.getStartSolar().toYmd(),
      daYun,
    },
  };
}
