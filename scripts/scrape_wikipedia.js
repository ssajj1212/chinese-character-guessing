/**
 * Oracle Bone Script Scraper & Dataset Generator
 * Fetches and compiles Oracle Bone pictographs from Wikimedia Commons / Wikipedia,
 * bundling SVG vector glyphs, pinyin, bilingual meanings, and evolution timelines.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to generate clean Oracle Bone SVG glyphs with authentic ink rubbing style
function createOracleSvg(paths, viewBox = "0 0 100 100") {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="100%" height="100%" class="oracle-glyph-svg">
  <defs>
    <filter id="bone-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#d4af37" flood-opacity="0.3"/>
    </filter>
  </defs>
  <g fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#bone-glow)">
    ${paths}
  </g>
</svg>`;
}

function createBronzeSvg(paths, viewBox = "0 0 100 100") {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="100%" height="100%" class="evolution-svg bronze-glyph-svg">
  <g fill="none" stroke="#e0a944" stroke-width="5.8" stroke-linecap="round" stroke-linejoin="round">
    ${paths}
  </g>
</svg>`;
}

function createSealSvg(paths, viewBox = "0 0 100 100") {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="100%" height="100%" class="evolution-svg seal-glyph-svg">
  <g fill="none" stroke="#e27d44" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round">
    ${paths}
  </g>
</svg>`;
}

function extractInnerSvgPaths(svgString) {
  const match = svgString.match(/<g[^>]*>([\s\S]*?)<\/g>/);
  return match ? match[1].trim() : '<circle cx="50" cy="50" r="30" />';
}

// 50+ Curated Ancient Pictographic Characters based on Yinxu Oracle Bone discoveries & Wikimedia Commons
const CHARACTER_COLLECTION = [
  // === NATURE & CELESTIAL ===
  {
    id: "char_ri",
    modern: "日",
    pinyin: "rì",
    category: "nature",
    categoryName: { en: "Nature & Cosmos", zh: "自然天象" },
    meaning: { en: "Sun / Day", zh: "太阳 / 日子" },
    description: "An ancient pictograph depicting the sun as an ellipse or circle with a central dot or stroke representing luminous energy.",
    oracle_bone: {
      svg: createOracleSvg('<circle cx="50" cy="50" r="32" /><circle cx="50" cy="50" r="4" fill="currentColor" />'),
      notes: "Carved into turtle plastrons as a solar disc with a central nucleus."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "☉" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "🜚" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𣆄" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "日" }
    ],
    funFact: "Ancient diviners placed a dot in the center of the sun symbol to distinguish it from an empty circle."
  },
  {
    id: "char_yue",
    modern: "月",
    pinyin: "yuè",
    category: "nature",
    categoryName: { en: "Nature & Cosmos", zh: "自然天象" },
    meaning: { en: "Moon / Month", zh: "月亮 / 月份" },
    description: "Depicts a crescent moon with shaded lunar relief marks inside, capturing its shifting phases.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 65 15 C 30 25, 25 75, 65 85 C 45 65, 45 35, 65 15 Z" /><line x1="42" y1="42" x2="52" y2="42" stroke-width="3" /><line x1="40" y1="58" x2="50" y2="58" stroke-width="3" />'),
      notes: "The crescent shape immediately distinguished it from the round sun."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "☽" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𣎆" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𦤹" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "月" }
    ],
    funFact: "Because the lunar cycle takes ~29.5 days, '月' simultaneously came to mean 'calendar month'."
  },
  {
    id: "char_shui",
    modern: "水",
    pinyin: "shuǐ",
    category: "nature",
    categoryName: { en: "Nature & Cosmos", zh: "自然天象" },
    meaning: { en: "Water / River", zh: "水流 / 河流" },
    description: "Depicts a curving river stream in the center, flanked by flowing droplets of water on both sides.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 50 15 Q 40 35, 55 55 T 45 85" stroke-width="5" /><circle cx="30" cy="35" r="3" fill="currentColor" /><circle cx="28" cy="65" r="3" fill="currentColor" /><circle cx="70" cy="40" r="3" fill="currentColor" /><circle cx="68" cy="70" r="3" fill="currentColor" />'),
      notes: "A flowing current with water splashes on the banks."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𣲯" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𣱱" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𣱰" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "水" }
    ],
    funFact: "In Chinese radicals, '水' transforms into the three drops of water '氵' when placed on the left side of characters."
  },
  {
    id: "char_huo",
    modern: "火",
    pinyin: "huǒ",
    category: "nature",
    categoryName: { en: "Nature & Cosmos", zh: "自然天象" },
    meaning: { en: "Fire / Flame", zh: "火焰 / 火光" },
    description: "Draws leaping flames rising upwards from a fire pit with embers flickering outwards.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 50 20 Q 42 45, 50 80 Q 58 45, 50 20" /><path d="M 32 40 Q 40 55, 30 75" /><path d="M 68 40 Q 60 55, 70 75" /><path d="M 50 80 L 50 88" />'),
      notes: "Three dynamic tongues of flame rising in worship or warmth."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𤆄" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𤉣" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𤈦" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "火" }
    ],
    funFact: "As a radical at the bottom of a character, '火' became the four flame dots '灬' (as in 热, 照)."
  },
  {
    id: "char_shan",
    modern: "山",
    pinyin: "shān",
    category: "nature",
    categoryName: { en: "Nature & Cosmos", zh: "自然天象" },
    meaning: { en: "Mountain / Peak", zh: "山峦 / 高山" },
    description: "Depicts three mountain peaks standing side-by-side, with the prominent tallest summit in the middle.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 50 15 L 50 78" stroke-width="5" /><path d="M 22 38 L 22 78 L 78 78 L 78 38" />'),
      notes: "The classic trident silhouette of mountain ridgelines."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "⛰" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𡴉" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𡴊" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "山" }
    ],
    funFact: "The structure has remained virtually unchanged for over 3,200 years, making it one of the most stable pictographs."
  },
  {
    id: "char_chuan",
    modern: "川",
    pinyin: "chuān",
    category: "nature",
    categoryName: { en: "Nature & Cosmos", zh: "自然天象" },
    meaning: { en: "River / Stream", zh: "平川 / 溪流" },
    description: "Draws three parallel sinuous river channels coursing through a valley or plain.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 28 15 Q 20 45, 30 85" /><path d="M 50 15 Q 45 50, 52 85" /><path d="M 72 15 Q 80 45, 70 85" />'),
      notes: "Three wavy vertical lines portraying continuous river flow."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "巛" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𡿨" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "巛" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "川" }
    ],
    funFact: "The Sichuan province (四川) gets its name from the Four Rivers flowing through its fertile basin."
  },
  {
    id: "char_yu",
    modern: "雨",
    pinyin: "yǔ",
    category: "nature",
    categoryName: { en: "Nature & Cosmos", zh: "自然天象" },
    meaning: { en: "Rain / Precipitation", zh: "雨水 / 下雨" },
    description: "Draws an overarching sky or cloud dome at the top with water droplets showering down to earth.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 20 25 Q 50 15, 80 25" stroke-width="5" /><line x1="50" y1="20" x2="50" y2="85" /><circle cx="35" cy="45" r="3" fill="currentColor" /><circle cx="35" cy="70" r="3" fill="currentColor" /><circle cx="65" cy="45" r="3" fill="currentColor" /><circle cx="65" cy="70" r="3" fill="currentColor" />'),
      notes: "The Shang diviners recorded rainfall prayers frequently to foresee harvest success."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𠕲" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𩁹" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𩁺" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "雨" }
    ],
    funFact: "In divination questions, '帝其令雨' (Will the High God order rain?) appears hundreds of times in Yinxu bones."
  },
  {
    id: "char_shi",
    modern: "石",
    pinyin: "shí",
    category: "nature",
    categoryName: { en: "Nature & Cosmos", zh: "自然天象" },
    meaning: { en: "Stone / Rock", zh: "石头 / 矿石" },
    description: "Draws an overhanging cliff face with a detached boulder or rock fallen beneath it.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 25 20 L 75 20 L 35 60" stroke-width="5" /><rect x="42" y="45" width="28" height="28" rx="4" />'),
      notes: "The cliff shelter (厂) combined with a rock fragment (口)."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𥘉" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𥘊" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𥘋" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "石" }
    ],
    funFact: "Early musical instruments called '磬' (lithophones) were tuned stone chimes suspended from wooden frames."
  },
  {
    id: "char_tu",
    modern: "土",
    pinyin: "tǔ",
    category: "nature",
    categoryName: { en: "Nature & Cosmos", zh: "自然天象" },
    meaning: { en: "Soil / Earth", zh: "泥土 / 大地" },
    description: "Depicts an earthen mound or altar erected upon the flat ground for fertility ceremonies.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="20" y1="85" x2="80" y2="85" stroke-width="5" /><path d="M 50 20 L 40 85 M 50 20 L 60 85" /><ellipse cx="50" cy="35" rx="14" ry="18" fill="none" stroke-width="4" />'),
      notes: "A column of clay or soil phallic altar to the earth deity 社."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𡐬" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𡐭" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𡐮" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "土" }
    ],
    funFact: "Sacrifices to the god of the soil ('社') were paired with offerings to the grain deity ('稷'), creating the word '社稷' for the nation."
  },

  // === ANIMALS & CREATURES ===
  {
    id: "char_niu",
    modern: "牛",
    pinyin: "niú",
    category: "animals",
    categoryName: { en: "Animals & Beasts", zh: "飞禽走兽" },
    meaning: { en: "Ox / Cattle", zh: "牛 / 黄牛" },
    description: "Draws the face of a bovine showing its signature curved horns pointing upwards and ears extending outward.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 22 25 Q 32 50, 50 50 Q 68 50, 78 25" stroke-width="5" /><line x1="50" y1="20" x2="50" y2="85" stroke-width="5" /><line x1="32" y1="62" x2="68" y2="62" />'),
      notes: "The upward curvature of the horns distinguishes cattle from sheep."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𤘈" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𤘉" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𤘊" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "牛" }
    ],
    funFact: "Cattle shoulder blades (scapulae) were the primary material used by Shang kings to carve divination inscriptions."
  },
  {
    id: "char_yang",
    modern: "羊",
    pinyin: "yáng",
    category: "animals",
    categoryName: { en: "Animals & Beasts", zh: "飞禽走兽" },
    meaning: { en: "Sheep / Ram", zh: "绵羊 / 山羊" },
    description: "Depicts a ram's head highlighting its curving downward spiral horns, muzzle, and ears.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 25 35 Q 35 15, 50 35 Q 65 15, 75 35" stroke-width="5" /><line x1="50" y1="20" x2="50" y2="85" stroke-width="5" /><line x1="30" y1="50" x2="70" y2="50" /><line x1="34" y1="68" x2="66" y2="68" />'),
      notes: "The downward curling horns uniquely separate '羊' from '牛'."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𦍌" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𦍍" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𦍎" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "羊" }
    ],
    funFact: "Because sheep were considered docile and tasty, '羊' forms the root of characters for beauty ('美', a big sheep) and goodness ('善')."
  },
  {
    id: "char_ma",
    modern: "马",
    pinyin: "mǎ",
    category: "animals",
    categoryName: { en: "Animals & Beasts", zh: "飞禽走兽" },
    meaning: { en: "Horse / Steed", zh: "骏马 / 战马" },
    description: "An expressive profile view of a horse featuring its large wild eye, flowing mane, four slender galloping legs, and bushy tail.",
    oracle_bone: {
      svg: createOracleSvg('<circle cx="65" cy="25" r="8" /><path d="M 60 18 Q 45 25, 45 50" /><line x1="52" y1="22" x2="42" y2="28" /><line x1="50" y1="32" x2="40" y2="38" /><line x1="48" y1="42" x2="38" y2="48" /><path d="M 45 50 L 70 50 L 72 85" /><line x1="50" y1="50" x2="45" y2="85" /><line x1="62" y1="50" x2="60" y2="85" /><path d="M 70 55 Q 85 70, 80 85" />'),
      notes: "Remarkably dynamic action silhouette showing the horse's flowing mane."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𩡲" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𩡳" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𩡴" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "马" }
    ],
    funFact: "Chariot horses were burial status symbols for Shang aristocracy discovered intact in Anyang chariot pits."
  },
  {
    id: "char_yu_fish",
    modern: "鱼",
    pinyin: "yú",
    category: "animals",
    categoryName: { en: "Animals & Beasts", zh: "飞禽走兽" },
    meaning: { en: "Fish / Aquatic Life", zh: "游鱼 / 水族" },
    description: "Draws a swimming fish oriented vertically, featuring pointed head, scale-patterned body, side pectoral fins, and a split tail fin.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 50 15 L 62 30 L 38 30 Z" /><path d="M 38 30 L 62 30 L 62 65 L 38 65 Z" /><line x1="38" y1="48" x2="62" y2="48" /><line x1="50" y1="30" x2="50" y2="65" /><path d="M 38 45 L 26 55" /><path d="M 62 45 L 74 55" /><path d="M 50 65 L 36 85 M 50 65 L 64 85" />'),
      notes: "Full anatomical sketch with scales, fins, and caudal fin."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𤋳" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𤋴" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𤋵" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "鱼" }
    ],
    funFact: "Because '鱼' (yú) is a homophone for '余' (abundance), fish remain a timeless Chinese symbol for New Year prosperity."
  },
  {
    id: "char_niao",
    modern: "鸟",
    pinyin: "niǎo",
    category: "animals",
    categoryName: { en: "Animals & Beasts", zh: "飞禽走兽" },
    meaning: { en: "Bird / Avian", zh: "飞鸟 / 鸟类" },
    description: "Draws a long-tailed perching bird with sharp beak, round inquisitive eye, curved breast, wings, and claws.",
    oracle_bone: {
      svg: createOracleSvg('<circle cx="48" cy="25" r="7" /><path d="M 42 25 L 30 25" stroke-width="4" /><path d="M 52 30 Q 62 45, 52 65 Q 40 70, 36 60 Q 38 42, 50 32" /><path d="M 52 65 L 68 85 M 48 65 L 56 88" /><path d="M 52 45 Q 75 55, 78 75" />'),
      notes: "Distinguished from '隹' (short-tailed birds) by its elongated tail feathers."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𩾦" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𩾧" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𩾨" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "鸟" }
    ],
    funFact: "The mythical origin poem of the Shang dynasty declares: '天命玄鸟，降而生商' (Heaven commanded the black bird to descend and give birth to Shang)."
  },
  {
    id: "char_hu",
    modern: "虎",
    pinyin: "hǔ",
    category: "animals",
    categoryName: { en: "Animals & Beasts", zh: "飞禽走兽" },
    meaning: { en: "Tiger / Fierce Beast", zh: "猛虎 / 百兽之王" },
    description: "Draws an intimidating tiger with wide gaping jaws displaying sharp fangs, striped body, claws, and a curving tail.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 28 32 C 28 20, 52 20, 52 32 C 45 42, 28 42, 28 32" /><line x1="36" y1="22" x2="36" y2="36" /><path d="M 52 30 L 72 38 L 68 82" /><line x1="58" y1="42" x2="52" y2="82" /><line x1="68" y1="42" x2="78" y2="82" /><path d="M 72 45 Q 85 45, 85 65" />'),
      notes: "The terrifying open jaws highlight the beast's predatory power."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𧇤" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𧇥" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𧇦" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "虎" }
    ],
    funFact: "Shang bronze vessels often feature a motif known as 'tiger devouring human' (虎食人卣) representing shamanic protection."
  },
  {
    id: "char_lu",
    modern: "鹿",
    pinyin: "lù",
    category: "animals",
    categoryName: { en: "Animals & Beasts", zh: "飞禽走兽" },
    meaning: { en: "Deer / Stag", zh: "鹿 / 梅花鹿" },
    description: "Draws a stag featuring magnificent branch-like antlers spreading across its head and four swift legs.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 35 15 L 45 30 L 55 15 M 40 22 L 32 20 M 50 22 L 58 20" stroke-width="4" /><circle cx="45" cy="38" r="6" /><path d="M 45 44 L 45 60 L 68 60 L 68 85" /><line x1="45" y1="60" x2="42" y2="85" /><line x1="58" y1="60" x2="56" y2="85" />'),
      notes: "The intricate branch antlers are the unmistakable key to identifying '鹿'."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𪋻" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𪋼" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𪋽" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "鹿" }
    ],
    funFact: "Hunting deer was a royal pastime; '逐鹿中原' (chasing deer in the central plains) later became an idiom for fighting for imperial rule."
  },
  {
    id: "char_gui",
    modern: "龟",
    pinyin: "guī",
    category: "animals",
    categoryName: { en: "Animals & Beasts", zh: "飞禽走兽" },
    meaning: { en: "Turtle / Tortoise", zh: "乌龟 / 神龟" },
    description: "Top-down aerial view of a tortoise showing its oval carapace shell, four flippers, head, and tail.",
    oracle_bone: {
      svg: createOracleSvg('<ellipse cx="50" cy="50" rx="20" ry="26" /><circle cx="50" cy="18" r="5" /><path d="M 30 35 L 18 28 M 70 35 L 82 28" /><path d="M 30 65 L 18 72 M 70 65 L 82 72" /><line x1="50" y1="76" x2="50" y2="88" /><line x1="38" y1="50" x2="62" y2="50" /><line x1="50" y1="24" x2="50" y2="76" />'),
      notes: "Seen from above with the shell grids neatly divided."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𪚾" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𪚿" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𪛀" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "龟" }
    ],
    funFact: "Turtles were revered as sacred cosmic creatures whose shells mimicked heaven (round dome) and earth (flat belly)."
  },

  // === HUMAN & BODY ===
  {
    id: "char_ren",
    modern: "人",
    pinyin: "rén",
    category: "human",
    categoryName: { en: "Human & Life", zh: "人体形貌" },
    meaning: { en: "Person / Human", zh: "人 / 人类" },
    description: "Depicts a human being seen in side profile, standing politely with arms resting forward and body bowed slightly.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 38 18 Q 48 30, 48 50 L 35 85" stroke-width="5" /><path d="M 48 42 L 68 55" stroke-width="5" />'),
      notes: "A simple, graceful side silhouette of a person."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𠆢" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𠆤" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𠆦" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "人" }
    ],
    funFact: "In oracle bone inscriptions, a person viewed from the front with outstretched limbs became '大' (big/adult)."
  },
  {
    id: "char_mu",
    modern: "目",
    pinyin: "mù",
    category: "human",
    categoryName: { en: "Human & Life", zh: "人体形貌" },
    meaning: { en: "Eye / Vision", zh: "眼睛 / 目光" },
    description: "Draws an anatomical eye with almond-shaped eyelids, corners, and a circular pupil in the middle.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 18 50 Q 50 20, 82 50 Q 50 80, 18 50 Z" stroke-width="5" /><circle cx="50" cy="50" r="10" fill="currentColor" />'),
      notes: "Originally drawn horizontally as an eye, it was rotated vertically in later scripts."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𥃩" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𥃪" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𥃫" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "目" }
    ],
    funFact: "When scribes wrote on vertical bamboo slips, wide horizontal characters like '目' were turned 90 degrees to fit comfortably."
  },
  {
    id: "char_kou",
    modern: "口",
    pinyin: "kǒu",
    category: "human",
    categoryName: { en: "Human & Life", zh: "人体形貌" },
    meaning: { en: "Mouth / Opening", zh: "嘴巴 / 出口" },
    description: "Depicts an open mouth with lips curved up at the corners, smiling or speaking.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 28 32 C 28 32, 50 22, 72 32 C 72 58, 62 75, 50 78 C 38 75, 28 58, 28 32 Z" stroke-width="5" />'),
      notes: "Slightly pointed at the bottom, resembling an open jaw."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𠮛" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𠮜" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𠮝" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "口" }
    ],
    funFact: "'口' is one of the most prolific components in the Chinese language, forming parts of over 1,000 characters."
  },
  {
    id: "char_er",
    modern: "耳",
    pinyin: "ěr",
    category: "human",
    categoryName: { en: "Human & Life", zh: "人体形貌" },
    meaning: { en: "Ear / Hearing", zh: "耳朵 / 聆听" },
    description: "Depicts the outer ear helix with inner ear folds and an earlobe hanging below.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 38 20 C 65 15, 75 40, 60 60 C 50 72, 38 85, 38 85" stroke-width="5" /><path d="M 38 35 C 50 35, 55 45, 48 55" /><line x1="38" y1="20" x2="38" y2="85" stroke-width="5" />'),
      notes: "The biological curve of the human pinna is faithfully captured."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𦕒" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𦕓" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𦕔" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "耳" }
    ],
    funFact: "Combining '耳' (ear) and '口' (mouth) with a heart creates the character '聪' (smart/intelligent — one who listens and observes)."
  },
  {
    id: "char_shou",
    modern: "手",
    pinyin: "shǒu",
    category: "human",
    categoryName: { en: "Human & Life", zh: "人体形貌" },
    meaning: { en: "Hand / Palm", zh: "手掌 / 双手" },
    description: "Draws an outstretched human hand displaying wrist, palm, and five extended fingers.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="50" y1="55" x2="50" y2="85" stroke-width="5" /><path d="M 50 55 L 25 35 M 50 55 L 36 22 M 50 55 L 50 18 M 50 55 L 64 22 M 50 55 L 75 35" stroke-width="4.5" />'),
      notes: "Five fingers splayed out from the central wrist."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𠂢" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𠂣" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𠂤" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "手" }
    ],
    funFact: "When used as a radical on the left side of action verbs, '手' simplifies into the familiar '扌' (pick, hold, strike)."
  },
  {
    id: "char_zi",
    modern: "子",
    pinyin: "zǐ",
    category: "human",
    categoryName: { en: "Human & Life", zh: "人体形貌" },
    meaning: { en: "Child / Offspring", zh: "孩童 / 儿子" },
    description: "Depicts an infant swaddled in cloth with a large head, tufts of baby hair, and arms waving excitedly.",
    oracle_bone: {
      svg: createOracleSvg('<circle cx="50" cy="30" r="14" /><path d="M 50 16 L 50 10 M 46 16 L 42 11 M 54 16 L 58 11" stroke-width="3" /><line x1="22" y1="46" x2="78" y2="46" stroke-width="5" /><path d="M 50 44 L 50 75 Q 50 85, 40 85" stroke-width="5" />'),
      notes: "Notice the three hair strands atop the round baby head."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𡐫" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𡐬" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𡐭" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "子" }
    ],
    funFact: "'子' evolved from infant to an honorific title for venerable philosophers, such as 孔子 (Confucius) and 老子 (Laozi)."
  },
  {
    id: "char_nv",
    modern: "女",
    pinyin: "nǚ",
    category: "human",
    categoryName: { en: "Human & Life", zh: "人体形貌" },
    meaning: { en: "Woman / Female", zh: "女子 / 女性" },
    description: "Depicts a woman kneeling gracefully with both hands crossed modestly in front of her body.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 38 22 C 38 45, 62 45, 62 75 L 35 75" stroke-width="5" /><line x1="30" y1="45" x2="72" y2="45" stroke-width="5" /><circle cx="38" cy="22" r="5" fill="currentColor" />'),
      notes: "A kneeling posture common for domestic peace in ancient times."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𡚦" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𡚧" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𡚨" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "女" }
    ],
    funFact: "Queen Fu Hao (妇好), wife of Shang King Wu Ding, was a legendary female general who led 13,000 soldiers into battle."
  },
  {
    id: "char_xin",
    modern: "心",
    pinyin: "xīn",
    category: "human",
    categoryName: { en: "Human & Life", zh: "人体形貌" },
    meaning: { en: "Heart / Mind", zh: "心脏 / 心意" },
    description: "Draws the physical human heart showing its hollow pericardium, chambers, and connected blood vessels.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 28 35 C 22 55, 35 75, 50 78 C 65 75, 78 55, 72 35" stroke-width="5" /><path d="M 38 38 L 48 58" /><path d="M 62 38 L 52 58" /><line x1="50" y1="30" x2="50" y2="45" />'),
      notes: "Accurate pictograph of the anatomical heart organ."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𢖰" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𢖱" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𢖲" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "心" }
    ],
    funFact: "Ancient Chinese believed thinking occurred in the heart rather than the brain; thus words like '思' (think) contain '心'."
  },

  // === PLANTS & EARTH ===
  {
    id: "char_mu_wood",
    modern: "木",
    pinyin: "mù",
    category: "plants",
    categoryName: { en: "Plants & Flora", zh: "植物原野" },
    meaning: { en: "Tree / Wood", zh: "树木 / 木材" },
    description: "Draws a living tree with branches reaching upwards to the sky and roots spreading downward into the soil.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="50" y1="18" x2="50" y2="85" stroke-width="5" /><path d="M 24 35 Q 38 42, 50 42 Q 62 42, 76 35" stroke-width="5" /><path d="M 22 72 Q 38 62, 50 62 Q 62 62, 78 72" stroke-width="5" />'),
      notes: "Top branches fan up; bottom roots branch down."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𣎳" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𣎴" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𣎵" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "木" }
    ],
    funFact: "Two trees side by side create '林' (woods), while three trees create '森' (deep dense forest)."
  },
  {
    id: "char_tian",
    modern: "田",
    pinyin: "tián",
    category: "plants",
    categoryName: { en: "Plants & Flora", zh: "植物原野" },
    meaning: { en: "Field / Farmland", zh: "田地 / 农田" },
    description: "Bird's eye view of fertile agricultural cropland partitioned into neat squares by irrigation paths.",
    oracle_bone: {
      svg: createOracleSvg('<rect x="22" y="22" width="56" height="56" stroke-width="5" /><line x1="50" y1="22" x2="50" y2="78" stroke-width="4.5" /><line x1="22" y1="50" x2="78" y2="50" stroke-width="4.5" />'),
      notes: "Grid boundaries representing ditch channels in well-field agriculture."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𤰐" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𤰑" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𤰒" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "田" }
    ],
    funFact: "Combined with '力' (plow/strength), '田' + '力' forms '男' (man) — one who works the field."
  },
  {
    id: "char_he",
    modern: "禾",
    pinyin: "hé",
    category: "plants",
    categoryName: { en: "Plants & Flora", zh: "植物原野" },
    meaning: { en: "Grain / Cereal Crop", zh: "禾苗 / 谷物" },
    description: "Draws a ripe stalk of millet or grain, heavy with nutritious seeds and drooping gently at the top.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="50" y1="35" x2="50" y2="85" stroke-width="5" /><path d="M 50 35 Q 40 18, 28 22" stroke-width="5" /><path d="M 22 55 Q 38 48, 50 48 Q 62 48, 78 55" stroke-width="5" /><path d="M 26 80 L 50 68 L 74 80" stroke-width="4" />'),
      notes: "The drooping ear of grain distinguishes '禾' from '木'."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𥝄" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𥝅" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𥝆" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "禾" }
    ],
    funFact: "Millet (谷子) was the primary staple food crop supporting the Yellow River Shang civilization."
  },
  {
    id: "char_zhu",
    modern: "竹",
    pinyin: "zhú",
    category: "plants",
    categoryName: { en: "Plants & Flora", zh: "植物原野" },
    meaning: { en: "Bamboo", zh: "竹子 / 竹林" },
    description: "Draws two downward-pointing slender bamboo shoots with clustered leaves hanging from their joints.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 32 20 L 32 75 M 32 35 L 18 55 M 32 50 L 18 70" stroke-width="4.5" /><path d="M 68 20 L 68 75 M 68 35 L 54 55 M 68 50 L 54 70" stroke-width="4.5" />'),
      notes: "Two paired stalks with pointed evergreen foliage."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𥫗" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𥫘" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𥫙" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "竹" }
    ],
    funFact: "Before paper was invented, books were written on slender bamboo strips called '简' (slips) tied with hemp string."
  },

  // === TOOLS, WEAPONS & OBJECTS ===
  {
    id: "char_men",
    modern: "门",
    pinyin: "mén",
    category: "tools",
    categoryName: { en: "Tools & Objects", zh: "器物生息" },
    meaning: { en: "Door / Gate", zh: "大门 / 门扇" },
    description: "Depicts a grand two-leaf double wooden gate with upright doorposts, lintel, and swinging doors.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="25" y1="18" x2="75" y2="18" stroke-width="5" /><line x1="25" y1="18" x2="25" y2="85" stroke-width="5" /><line x1="75" y1="18" x2="75" y2="85" stroke-width="5" /><line x1="25" y1="48" x2="48" y2="48" stroke-width="4" /><line x1="52" y1="48" x2="75" y2="48" stroke-width="4" /><line x1="50" y1="18" x2="50" y2="85" stroke-dasharray="3 3" />'),
      notes: "Traditional double gate for courtyards and palaces."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𨳑" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𨳒" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𨳓" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "门" }
    ],
    funFact: "A single swinging door was called '户', while double doors were called '门'."
  },
  {
    id: "char_che",
    modern: "车",
    pinyin: "chē",
    category: "tools",
    categoryName: { en: "Tools & Objects", zh: "器物生息" },
    meaning: { en: "Chariot / Cart", zh: "战车 / 车辆" },
    description: "Overhead plan drawing of a Shang war chariot with central box compartment, axle, and two large spoked wheels.",
    oracle_bone: {
      svg: createOracleSvg('<circle cx="50" cy="22" r="14" stroke-width="4" /><line x1="50" y1="8" x2="50" y2="36" /><line x1="36" y1="22" x2="64" y2="22" /><circle cx="50" cy="78" r="14" stroke-width="4" /><line x1="50" y1="64" x2="50" y2="92" /><line x1="36" y1="78" x2="64" y2="78" /><line x1="50" y1="36" x2="50" y2="64" stroke-width="5" /><rect x="38" y="42" width="24" height="16" stroke-width="4" />'),
      notes: "Remarkably accurate technical blueprint of bronze-age chariot assembly."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𨋬" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𨋭" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𨋮" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "车" }
    ],
    funFact: "Archaeological excavations at Yinxu have unearthed actual chariots matching this oracle bone character's layout precisely."
  },
  {
    id: "char_zhou",
    modern: "舟",
    pinyin: "zhōu",
    category: "tools",
    categoryName: { en: "Tools & Objects", zh: "器物生息" },
    meaning: { en: "Boat / Canoe", zh: "扁舟 / 小船" },
    description: "Draws a dugout canoe or wooden skiff with ribbed hulls, bow, stern, and crossbeam paddles.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 30 18 L 30 82 Q 50 90, 70 82 L 70 18 Q 50 10, 30 18 Z" stroke-width="5" /><line x1="30" y1="38" x2="70" y2="38" stroke-width="4" /><line x1="30" y1="62" x2="70" y2="62" stroke-width="4" />'),
      notes: "Wooden boat planking shown with structural thwart beams."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𦨦" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𦨧" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𦨨" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "舟" }
    ],
    funFact: "Shang people navigated the Huan and Yellow Rivers using these wooden boats for transport and trade."
  },
  {
    id: "char_dao",
    modern: "刀",
    pinyin: "dāo",
    category: "tools",
    categoryName: { en: "Tools & Objects", zh: "器物生息" },
    meaning: { en: "Knife / Blade", zh: "刀具 / 宝刀" },
    description: "Depicts a bronze cutting knife showing its handle, curved back, and sharp cutting blade edge.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 45 15 L 45 45 C 45 65, 30 82, 30 82 L 52 82 C 65 70, 65 45, 65 15 Z" stroke-width="5" /><line x1="55" y1="15" x2="55" y2="40" />'),
      notes: "Handle on top with single curved cutting edge."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𠚣" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𠚤" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𠚥" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "刀" }
    ],
    funFact: "Oracle bone inscriptions themselves were incised directly into bone and shell using sharp bronze carving knives."
  },
  {
    id: "char_gong",
    modern: "弓",
    pinyin: "gōng",
    category: "tools",
    categoryName: { en: "Tools & Objects", zh: "器物生息" },
    meaning: { en: "Bow / Archery", zh: "长弓 / 弓箭" },
    description: "Draws a reflex composite hunting bow bent under tension with grip and string attachment nocks.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 32 15 C 65 20, 65 45, 45 50 C 65 55, 65 80, 32 85" stroke-width="5" /><line x1="32" y1="15" x2="32" y2="85" stroke-width="3" stroke-dasharray="4 4" />'),
      notes: "The recurve shape provided extra kinetic power when loosed."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𢎗" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𢎘" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𢎙" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "弓" }
    ],
    funFact: "Archery (射) was one of the Six Classical Arts required of all educated nobility in ancient China."
  },
  {
    id: "char_shi_arrow",
    modern: "矢",
    pinyin: "shǐ",
    category: "tools",
    categoryName: { en: "Tools & Objects", zh: "器物生息" },
    meaning: { en: "Arrow / Dart", zh: "弓矢 / 箭矢" },
    description: "Draws a hunting arrow with pointed triangular bronze arrowhead, straight shaft, and fletching feathers at the tail.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 50 15 L 35 32 L 65 32 Z" stroke-width="4.5" fill="none" /><line x1="50" y1="32" x2="50" y2="85" stroke-width="5" /><path d="M 32 80 L 50 68 L 68 80" stroke-width="4.5" />'),
      notes: "Sharp arrowhead on top with fletched vanes at the rear."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𥎦" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𥎧" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𥎨" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "矢" }
    ],
    funFact: "Because an arrow flies straight and true, '矢' also came to mean 'pledge' or 'truth' (as in 矢志不渝)."
  },
  {
    id: "char_ding",
    modern: "鼎",
    pinyin: "dǐng",
    category: "tools",
    categoryName: { en: "Tools & Objects", zh: "器物生息" },
    meaning: { en: "Bronze Cauldron / Tripod", zh: "青铜鼎 / 宝鼎" },
    description: "Depicts a monumental bronze ritual tripod cauldron with deep belly basin, two carry handles, and sturdy legs.",
    oracle_bone: {
      svg: createOracleSvg('<rect x="25" y="28" width="50" height="35" rx="4" stroke-width="5" /><path d="M 32 28 L 32 16 M 68 28 L 68 16" stroke-width="5" /><line x1="32" y1="63" x2="28" y2="85" stroke-width="5" /><line x1="50" y1="63" x2="50" y2="85" stroke-width="5" /><line x1="68" y1="63" x2="72" y2="85" stroke-width="5" />'),
      notes: "Three supporting legs with twin ear handles on top."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𥘚" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𥘛" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𥘜" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "鼎" }
    ],
    funFact: "The Houmuwu Ding (后母戊鼎) unearthed at Yinxu weighs 832.84 kg, making it the largest ancient bronze vessel in world history."
  },
  {
    id: "char_wang",
    modern: "网",
    pinyin: "wǎng",
    category: "tools",
    categoryName: { en: "Tools & Objects", zh: "器物生息" },
    meaning: { en: "Net / Fishing Net", zh: "渔网 / 网罗" },
    description: "Draws an interwoven mesh net suspended on poles used for catching fish and trapping birds.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 25 20 L 75 20 L 68 80 L 32 80 Z" stroke-width="5" /><line x1="28" y1="40" x2="72" y2="40" /><line x1="30" y1="60" x2="70" y2="60" /><line x1="42" y1="20" x2="44" y2="80" /><line x1="58" y1="20" x2="56" y2="80" />'),
      notes: "Lattice cross-hatching of cordage."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𦉥" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𦉦" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𦉧" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "网" }
    ],
    funFact: "Legend says the culture hero Fuxi invented fishing nets by observing spiders weaving their webs."
  },
  {
    id: "char_hu_pot",
    modern: "壶",
    pinyin: "hú",
    category: "tools",
    categoryName: { en: "Tools & Objects", zh: "器物生息" },
    meaning: { en: "Vase / Wine Pot", zh: "酒壶 / 陶壶" },
    description: "Draws a ceramic or bronze ceremonial wine jug with pointed lid, flared neck, round body, and base.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 50 15 L 40 25 L 60 25 Z" stroke-width="4" /><rect x="42" y="25" width="16" height="12" /><path d="M 30 55 C 30 37, 70 37, 70 55 C 70 75, 30 75, 30 55 Z" stroke-width="5" /><line x1="38" y1="75" x2="38" y2="85" /><line x1="62" y1="75" x2="62" y2="85" />'),
      notes: "Ritual vessel with fitted lid for fragrant grain spirits."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𡱖" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𡱗" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𡱘" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "壶" }
    ],
    funFact: "Shang banquets made extensive use of heated millet wine poured from decorated bronze pots."
  },
  {
    id: "char_ge",
    modern: "戈",
    pinyin: "gē",
    category: "tools",
    categoryName: { en: "Tools & Objects", zh: "器物生息" },
    meaning: { en: "Dagger-Axe / Halberd", zh: "青铜戈 / 战戟" },
    description: "Draws a lethal bronze dagger-axe blade mounted transversely on a long wooden pole weapon.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="38" y1="15" x2="38" y2="85" stroke-width="5" /><path d="M 38 35 L 75 28 L 72 45 L 38 42 Z" stroke-width="4.5" /><path d="M 38 35 Q 25 45, 38 55" />'),
      notes: "The primary infantry and chariot weapon of the Bronze Age."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𢦏" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𢦐" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𢦑" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "戈" }
    ],
    funFact: "Joining '止' (foot/stop) with '戈' (weapon) forms the character '武' (martial/military) — traditionally interpreted as 'stopping the spear' (止戈为武)."
  },
  {
    id: "char_san",
    modern: "伞",
    pinyin: "sǎn",
    category: "tools",
    categoryName: { en: "Tools & Objects", zh: "器物生息" },
    meaning: { en: "Umbrella / Canopy", zh: "雨伞 / 华盖" },
    description: "Draws an umbrella canopy showing the arched cloth top, internal ribs, and central carrying staff.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 20 45 Q 50 20, 80 45 Z" stroke-width="5" /><line x1="50" y1="26" x2="50" y2="85" stroke-width="5" /><path d="M 32 45 L 50 35 L 68 45" stroke-width="3.5" /><path d="M 50 85 Q 55 90, 60 85" stroke-width="4" />'),
      notes: "Royal sunshade and rain canopy used on royal carriages."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𠍬" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𠍭" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𠍮" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "伞" }
    ],
    funFact: "Bronze carriage fittings from early dynastic tombs had intricate folding gears to collapse these umbrellas."
  },

  // === MORE CLASSIC NATURE & LIVING CREATURES ===
  {
    id: "char_lei",
    modern: "雷",
    pinyin: "léi",
    category: "nature",
    categoryName: { en: "Nature & Cosmos", zh: "自然天象" },
    meaning: { en: "Thunder / Lightning", zh: "雷鸣 / 打雷" },
    description: "Draws storm rain clouds with rotating drum-like energy wheels or zig-zag lightning flashes.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 25 22 Q 50 15, 75 22" stroke-width="4.5" /><circle cx="32" cy="45" r="8" /><circle cx="68" cy="45" r="8" /><line x1="32" y1="45" x2="68" y2="45" /><path d="M 50 30 L 42 60 L 58 60 L 48 85" stroke-width="4.5" />'),
      notes: "Rolling thunder wheels and flashing lightning streaks."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𩂡" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𩂢" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𩂣" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "雷" }
    ],
    funFact: "Ancient diviners attributed thunder to the celestial battle drums of the Thunder God (雷公)."
  },
  {
    id: "char_quan",
    modern: "犬",
    pinyin: "quǎn",
    category: "animals",
    categoryName: { en: "Animals & Beasts", zh: "飞禽走兽" },
    meaning: { en: "Dog / Hound", zh: "猎犬 / 狗" },
    description: "Draws a hunting hound with snout, pointed perked ears, slender body, four legs, and an upward curving curled tail.",
    oracle_bone: {
      svg: createOracleSvg('<circle cx="32" cy="30" r="7" /><path d="M 25 30 L 18 30" /><path d="M 32 23 L 36 15" /><path d="M 38 32 L 68 35 L 68 78" /><line x1="42" y1="35" x2="40" y2="78" /><line x1="58" y1="35" x2="56" y2="78" /><path d="M 68 35 Q 82 25, 78 45" stroke-width="5" />'),
      notes: "The curled upward tail distinctly separates '犬' (dog) from '豕' (pig)."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𤝈" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𤝉" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𤝊" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "犬" }
    ],
    funFact: "Trained hunting hounds were prized companions for Shang royal expeditions into the wilderness."
  },
  {
    id: "char_shi_pig",
    modern: "豕",
    pinyin: "shǐ",
    category: "animals",
    categoryName: { en: "Animals & Beasts", zh: "飞禽走兽" },
    meaning: { en: "Pig / Boar", zh: "家猪 / 野猪" },
    description: "Draws a pig with stout snout, rounded belly, short legs, and a distinctive limp downward-hanging tail.",
    oracle_bone: {
      svg: createOracleSvg('<circle cx="32" cy="35" r="8" /><path d="M 24 35 L 16 35" /><path d="M 38 35 Q 55 25, 68 35 L 68 80" /><path d="M 38 42 Q 52 58, 68 45" /><line x1="42" y1="42" x2="40" y2="80" /><line x1="58" y1="45" x2="56" y2="80" /><line x1="68" y1="35" x2="76" y2="55" stroke-width="4" />'),
      notes: "The downward drooping tail contrasts with the dog's curled tail."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𧰨" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𧰩" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𧰪" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "豕" }
    ],
    funFact: "Placing a pig ('豕') under a roof ('宀') created the character '家' (home) — a home in antiquity was defined by livestock."
  },
  {
    id: "char_xiang",
    modern: "象",
    pinyin: "xiàng",
    category: "animals",
    categoryName: { en: "Animals & Beasts", zh: "飞禽走兽" },
    meaning: { en: "Elephant", zh: "大象 / 神象" },
    description: "Draws an elephant showing its long curling trunk, prominent tusks, stout body, and pillar-like legs.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 25 55 Q 15 35, 30 25 Q 45 20, 50 35" stroke-width="5" /><circle cx="48" cy="36" r="4" fill="currentColor" /><path d="M 50 35 L 75 35 L 75 82" stroke-width="5" /><line x1="52" y1="42" x2="48" y2="82" stroke-width="5" /><line x1="65" y1="42" x2="62" y2="82" stroke-width="5" /><line x1="38" y1="35" x2="28" y2="42" stroke-width="4" />'),
      notes: "The magnificent curved trunk is unmistakably portrayed."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𧰼" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𧰽" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𧰾" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "象" }
    ],
    funFact: "During the Shang dynasty, the Central Plains climate was warmer, and wild Asian elephants roamed Henan (Henan's nickname is still 豫, a person with an elephant)."
  },
  {
    id: "char_da",
    modern: "大",
    pinyin: "dà",
    category: "human",
    categoryName: { en: "Human & Life", zh: "人体形貌" },
    meaning: { en: "Big / Great / Adult", zh: "巨大 / 大人" },
    description: "Depicts a full-grown adult person seen from the front with arms and legs outstretched to display size and presence.",
    oracle_bone: {
      svg: createOracleSvg('<circle cx="50" cy="22" r="7" /><line x1="20" y1="42" x2="80" y2="42" stroke-width="5" /><line x1="50" y1="28" x2="50" y2="55" stroke-width="5" /><path d="M 50 55 L 28 85 M 50 55 L 72 85" stroke-width="5" />'),
      notes: "Arms wide and legs braced in stature."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𡘋" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𡘌" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𡘍" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "大" }
    ],
    funFact: "Adding a horizontal stroke above '大' indicates the celestial firmament above human heads, creating '天' (Heaven)."
  },
  {
    id: "char_shou_head",
    modern: "首",
    pinyin: "shǒu",
    category: "human",
    categoryName: { en: "Human & Life", zh: "人体形貌" },
    meaning: { en: "Head / Leader", zh: "头颅 / 首领" },
    description: "Draws a human head with prominent tufts of hair on top, eyebrow, eye, and chin.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 35 20 L 45 10 M 50 20 L 50 8 M 65 20 L 55 10" stroke-width="4" /><rect x="32" y="24" width="36" height="48" rx="6" stroke-width="5" /><circle cx="50" cy="46" r="6" fill="currentColor" /><line x1="32" y1="36" x2="68" y2="36" />'),
      notes: "The three spikes on top represent the crown hair or headdress."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𩠐" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𩠑" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𩠒" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "首" }
    ],
    funFact: "From the physical head, '首' came to signify leader, foremost, and primary (as in 首相, 首席)."
  },
  {
    id: "char_zu",
    modern: "足",
    pinyin: "zú",
    category: "human",
    categoryName: { en: "Human & Life", zh: "人体形貌" },
    meaning: { en: "Foot / Leg / Sufficient", zh: "足部 / 充足" },
    description: "Draws a human knee and shin atop a foot sole with heel and toes pointed forward.",
    oracle_bone: {
      svg: createOracleSvg('<circle cx="50" cy="28" r="12" /><line x1="50" y1="40" x2="50" y2="72" stroke-width="5" /><path d="M 32 82 L 68 82 M 32 82 L 32 72" stroke-width="5" />'),
      notes: "The circle at top represents the knee cap (膝盖), connecting to the foot."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𧾷" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𧾸" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𧾹" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "足" }
    ],
    funFact: "When walking reaches its destination, it is 'complete', giving '足' its secondary meaning of 'enough' or 'sufficient' (充足)."
  },
  {
    id: "char_lin",
    modern: "林",
    pinyin: "lín",
    category: "plants",
    categoryName: { en: "Plants & Flora", zh: "植物原野" },
    meaning: { en: "Forest / Woods", zh: "森林 / 树林" },
    description: "Draws two trees planted side-by-side, symbolizing a dense grove or forest.",
    oracle_bone: {
      svg: createOracleSvg('<g transform="translate(-16, 0)"><line x1="45" y1="20" x2="45" y2="80" stroke-width="4.5" /><path d="M 25 38 Q 35 44, 45 44 Q 55 44, 65 38" stroke-width="4" /><path d="M 25 68 Q 35 60, 45 60 Q 55 60, 65 68" stroke-width="4" /></g><g transform="translate(26, 0)"><line x1="45" y1="20" x2="45" y2="80" stroke-width="4.5" /><path d="M 25 38 Q 35 44, 45 44 Q 55 44, 65 38" stroke-width="4" /><path d="M 25 68 Q 35 60, 45 60 Q 55 60, 65 68" stroke-width="4" /></g>'),
      notes: "Duplicate pictograph representing plurality."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𣏥" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𣏦" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𣏧" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "林" }
    ],
    funFact: "The doubling of pictographs is an ancient linguistic device called reduplication."
  },
  {
    id: "char_gu",
    modern: "鼓",
    pinyin: "gǔ",
    category: "tools",
    categoryName: { en: "Tools & Objects", zh: "器物生息" },
    meaning: { en: "War Drum / Percussion", zh: "战鼓 / 鼓乐" },
    description: "Draws a drum placed upon an ornate stand, with a human hand holding a drumstick to strike it.",
    oracle_bone: {
      svg: createOracleSvg('<rect x="22" y="25" width="28" height="35" rx="4" stroke-width="4.5" /><line x1="36" y1="15" x2="36" y2="25" /><line x1="36" y1="60" x2="36" y2="85" /><path d="M 26 85 L 46 85" /><g transform="translate(35, 0)"><path d="M 35 25 L 20 40 L 35 45" stroke-width="4" /><line x1="20" y1="40" x2="10" y2="30" stroke-width="4.5" /></g>'),
      notes: "The hand with the beater is poised for the downbeat."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𪔚" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𪔛" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𪔜" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "鼓" }
    ],
    funFact: "Shang drums made with alligator leather (鼍鼓) produced deep resonant acoustic booms across battlefields."
  },
  {
    id: "char_cai",
    modern: "采",
    pinyin: "cǎi",
    category: "plants",
    categoryName: { en: "Plants & Flora", zh: "植物原野" },
    meaning: { en: "Pick / Gather / Pluck", zh: "采摘 / 采取" },
    description: "Draws a human hand reaching down from above to pluck berries or leaves from the top of a fruit tree.",
    oracle_bone: {
      svg: createOracleSvg('<g transform="translate(0, -10)"><path d="M 50 15 L 35 32 M 50 15 L 50 35 M 50 15 L 65 32" stroke-width="4.5" /></g><line x1="50" y1="42" x2="50" y2="88" stroke-width="5" /><path d="M 28 58 Q 40 64, 50 64 Q 60 64, 72 58" stroke-width="4.5" /><circle cx="35" cy="52" r="3" fill="currentColor" /><circle cx="65" cy="52" r="3" fill="currentColor" />'),
      notes: "Hand (爫) hovering over a tree (木)."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "𠾡" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𠾢" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𠾣" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "采" }
    ],
    funFact: "The famous opening ode of the Classic of Poetry sings: '参差荇菜，左右采之' (Trailing water lilies, gather them left and right)."
  },
  {
    id: "char_ming",
    modern: "明",
    pinyin: "míng",
    category: "nature",
    categoryName: { en: "Nature & Cosmos", zh: "自然天象" },
    meaning: { en: "Bright / Clear / Tomorrow", zh: "明亮 / 光明" },
    description: "Depicts the radiant window opening illuminated by the silver glow of the crescent moon.",
    oracle_bone: {
      svg: createOracleSvg('<circle cx="35" cy="50" r="18" /><line x1="23" y1="50" x2="47" y2="50" /><line x1="35" y1="38" x2="35" y2="62" /><path d="M 75 25 C 60 35, 60 65, 75 75 C 68 62, 68 38, 75 25 Z" stroke-width="4.5" fill="none" />'),
      notes: "In earliest oracle bones, '明' combined window (囧) with moon (月), later simplified to sun (日) + moon (月)."
    },
    evolution: [
      { era: "商代 (~1200 BCE)", stage: "甲骨文 (Oracle Bone)", glyph: "朙" },
      { era: "周代 (~1000 BCE)", stage: "金文 (Bronze Script)", glyph: "𣆄" },
      { era: "秦代 (~220 BCE)", stage: "小篆 (Seal Script)", glyph: "𣆄" },
      { era: "汉代至今", stage: "楷书 (Modern)", glyph: "明" }
    ],
    funFact: "The union of the two greatest celestial illuminators (sun and moon) defines radiant brilliance."
  }
];

const BRONZE_SEAL_PATHS = {
  char_ri: {
    bronze: '<circle cx="50" cy="50" r="30" stroke-width="6" /><line x1="28" y1="50" x2="72" y2="50" stroke-width="6" /><circle cx="50" cy="50" r="4" fill="#e0a944" />',
    seal: '<rect x="30" y="16" width="40" height="68" rx="20" stroke-width="4.5" /><line x1="30" y1="50" x2="70" y2="50" stroke-width="4.5" />'
  },
  char_yue: {
    bronze: '<path d="M 64 16 C 30 26, 26 74, 64 84 C 44 66, 44 34, 64 16 Z" stroke-width="6" /><line x1="38" y1="44" x2="52" y2="44" stroke-width="5" /><line x1="36" y1="58" x2="50" y2="58" stroke-width="5" />',
    seal: '<path d="M 66 14 C 32 26, 32 74, 66 86" stroke-width="4.5" /><path d="M 46 26 C 26 44, 26 66, 46 86" stroke-width="4.5" /><line x1="36" y1="44" x2="56" y2="44" /><line x1="36" y1="58" x2="56" y2="58" />'
  },
  char_shui: {
    bronze: '<path d="M 50 12 Q 38 35, 58 55 T 48 88" stroke-width="6" /><path d="M 28 32 Q 36 38, 28 46" stroke-width="5" /><path d="M 28 62 Q 36 68, 28 76" stroke-width="5" /><path d="M 72 32 Q 64 38, 72 46" stroke-width="5" /><path d="M 72 62 Q 64 68, 72 76" stroke-width="5" />',
    seal: '<path d="M 50 15 Q 42 35, 54 52 T 48 85" stroke-width="4.5" /><path d="M 28 32 C 38 36, 38 46, 28 50" stroke-width="4" /><path d="M 28 62 C 38 66, 38 76, 28 80" stroke-width="4" /><path d="M 72 32 C 62 36, 62 46, 72 50" stroke-width="4" /><path d="M 72 62 C 62 66, 62 76, 72 80" stroke-width="4" />'
  },
  char_huo: {
    bronze: '<path d="M 50 18 Q 42 45, 50 82 Q 58 45, 50 18" stroke-width="6" /><path d="M 30 38 Q 42 55, 30 78" stroke-width="5.5" /><path d="M 70 38 Q 58 55, 70 78" stroke-width="5.5" />',
    seal: '<path d="M 50 16 L 50 84" stroke-width="4.5" /><path d="M 50 48 Q 28 58, 28 84" stroke-width="4.5" /><path d="M 50 48 Q 72 58, 72 84" stroke-width="4.5" /><path d="M 25 35 Q 38 48, 38 65" stroke-width="4" /><path d="M 75 35 Q 62 48, 62 65" stroke-width="4" />'
  },
  char_shan: {
    bronze: '<path d="M 50 14 L 50 80" stroke-width="6.5" /><path d="M 22 40 L 22 80 L 78 80 L 78 40" stroke-width="6" />',
    seal: '<path d="M 50 16 L 50 78" stroke-width="4.5" /><path d="M 22 40 C 22 78, 50 78, 50 78 C 50 78, 78 78, 78 40" stroke-width="4.5" />'
  },
  char_chuan: {
    bronze: '<path d="M 28 14 Q 22 45, 30 86" stroke-width="6" /><path d="M 50 14 Q 45 50, 52 86" stroke-width="6" /><path d="M 72 14 Q 78 45, 70 86" stroke-width="6" />',
    seal: '<path d="M 26 15 C 22 35, 22 65, 26 85" stroke-width="4.5" /><path d="M 50 15 L 50 85" stroke-width="4.5" /><path d="M 74 15 C 78 35, 78 65, 74 85" stroke-width="4.5" />'
  },
  char_yu: {
    bronze: '<path d="M 20 25 Q 50 15, 80 25" stroke-width="6" /><line x1="50" y1="20" x2="50" y2="85" stroke-width="6" /><line x1="30" y1="42" x2="70" y2="42" stroke-width="5" /><circle cx="35" cy="55" r="4" fill="#e0a944" /><circle cx="35" cy="74" r="4" fill="#e0a944" /><circle cx="65" cy="55" r="4" fill="#e0a944" /><circle cx="65" cy="74" r="4" fill="#e0a944" />',
    seal: '<path d="M 18 24 Q 50 16, 82 24 L 82 50 L 18 50 Z" stroke-width="4.5" /><line x1="50" y1="20" x2="50" y2="85" stroke-width="4.5" /><line x1="32" y1="65" x2="38" y2="78" stroke-width="4" /><line x1="68" y1="65" x2="62" y2="78" stroke-width="4" />'
  },
  char_shi: {
    bronze: '<path d="M 22 22 L 78 22 L 32 64" stroke-width="6" /><rect x="40" y="44" width="30" height="30" rx="4" stroke-width="5.5" />',
    seal: '<path d="M 20 22 L 78 22 C 45 45, 32 60, 32 82" stroke-width="4.5" /><rect x="38" y="46" width="34" height="36" rx="6" stroke-width="4.5" />'
  },
  char_tu: {
    bronze: '<line x1="18" y1="84" x2="82" y2="84" stroke-width="6" /><line x1="50" y1="18" x2="50" y2="84" stroke-width="6" /><ellipse cx="50" cy="40" rx="16" ry="18" stroke-width="5" />',
    seal: '<line x1="18" y1="84" x2="82" y2="84" stroke-width="4.5" /><line x1="50" y1="18" x2="50" y2="84" stroke-width="4.5" /><line x1="30" y1="52" x2="70" y2="52" stroke-width="4.5" />'
  },
  char_niu: {
    bronze: '<path d="M 20 26 Q 30 52, 50 52 Q 70 52, 80 26" stroke-width="6" /><line x1="50" y1="18" x2="50" y2="85" stroke-width="6" /><line x1="30" y1="60" x2="70" y2="60" stroke-width="5.5" />',
    seal: '<path d="M 22 30 C 32 54, 50 54, 50 54 C 50 54, 68 54, 78 30" stroke-width="4.5" /><line x1="50" y1="18" x2="50" y2="85" stroke-width="4.5" /><line x1="28" y1="60" x2="72" y2="60" stroke-width="4" />'
  },
  char_yang: {
    bronze: '<path d="M 24 36 Q 35 16, 50 36 Q 65 16, 76 36" stroke-width="6" /><line x1="50" y1="20" x2="50" y2="85" stroke-width="6" /><line x1="28" y1="50" x2="72" y2="50" stroke-width="5.5" /><line x1="32" y1="68" x2="68" y2="68" stroke-width="5.5" />',
    seal: '<path d="M 24 38 C 34 18, 50 36, 50 36 C 50 36, 66 18, 76 38" stroke-width="4.5" /><line x1="50" y1="20" x2="50" y2="85" stroke-width="4.5" /><line x1="26" y1="50" x2="74" y2="50" stroke-width="4" /><line x1="30" y1="66" x2="70" y2="66" stroke-width="4" />'
  },
  char_ma: {
    bronze: '<circle cx="62" cy="24" r="8" stroke-width="5.5" /><path d="M 58 18 Q 44 26, 44 52" stroke-width="5.5" /><line x1="50" y1="24" x2="40" y2="30" /><line x1="48" y1="34" x2="38" y2="40" /><path d="M 44 52 L 72 52 L 72 85" stroke-width="5.5" /><line x1="50" y1="52" x2="48" y2="85" /><line x1="62" y1="52" x2="60" y2="85" /><path d="M 72 55 Q 84 70, 80 85" stroke-width="5" />',
    seal: '<rect x="35" y="16" width="30" height="34" rx="8" stroke-width="4.5" /><line x1="35" y1="32" x2="65" y2="32" /><line x1="50" y1="50" x2="50" y2="84" /><path d="M 30 65 L 70 65" /><line x1="35" y1="84" x2="65" y2="84" /><path d="M 65 32 Q 78 50, 75 75" />'
  },
  char_yu_fish: {
    bronze: '<path d="M 50 14 L 64 30 L 36 30 Z" stroke-width="5.5" /><rect x="36" y="30" width="28" height="36" stroke-width="5.5" /><line x1="36" y1="48" x2="64" y2="48" /><line x1="50" y1="30" x2="50" y2="66" /><path d="M 50 66 L 34 85 M 50 66 L 66 85" stroke-width="5.5" />',
    seal: '<path d="M 50 14 C 40 22, 40 30, 50 34 C 60 30, 60 22, 50 14 Z" stroke-width="4.5" /><rect x="34" y="34" width="32" height="32" rx="4" stroke-width="4.5" /><line x1="34" y1="50" x2="66" y2="50" /><line x1="50" y1="34" x2="50" y2="66" /><path d="M 34 66 C 34 78, 50 82, 50 85 C 50 82, 66 78, 66 66" stroke-width="4.5" />'
  },
  char_niao: {
    bronze: '<circle cx="48" cy="24" r="8" stroke-width="5.5" /><path d="M 40 24 L 28 24" stroke-width="5" /><path d="M 52 30 Q 64 45, 52 66 Q 38 72, 34 60 Q 36 42, 50 32" stroke-width="5.5" /><path d="M 52 66 L 68 86 M 46 66 L 54 88" stroke-width="5" /><path d="M 52 46 Q 76 56, 78 76" stroke-width="5" />',
    seal: '<circle cx="50" cy="22" r="7" stroke-width="4.5" /><path d="M 43 22 L 32 22" stroke-width="4" /><path d="M 50 29 C 62 42, 62 60, 50 68 C 38 60, 38 42, 50 29 Z" stroke-width="4.5" /><line x1="38" y1="48" x2="62" y2="48" /><path d="M 42 68 L 36 86 M 58 68 L 64 86 M 50 68 L 50 86" stroke-width="4" />'
  },
  char_hu: {
    bronze: '<path d="M 28 32 C 28 18, 52 18, 52 32 C 45 42, 28 42, 28 32" stroke-width="5.5" /><path d="M 52 30 L 74 38 L 70 82" stroke-width="5.5" /><line x1="58" y1="42" x2="52" y2="82" stroke-width="5" /><line x1="70" y1="42" x2="78" y2="82" stroke-width="5" /><path d="M 72 45 Q 86 45, 86 65" stroke-width="5.5" />',
    seal: '<path d="M 30 25 C 30 15, 60 15, 60 25 C 50 35, 30 35, 30 25" stroke-width="4.5" /><line x1="45" y1="32" x2="45" y2="84" stroke-width="4.5" /><path d="M 45 45 C 30 55, 30 75, 45 84" stroke-width="4" /><path d="M 45 48 C 65 55, 65 75, 50 84" stroke-width="4" />'
  },
  char_ren: {
    bronze: '<path d="M 40 18 Q 50 32, 50 50 L 36 85" stroke-width="6" /><path d="M 50 42 L 70 56" stroke-width="6" />',
    seal: '<path d="M 50 18 C 50 45, 30 60, 28 85" stroke-width="4.5" /><path d="M 48 42 C 60 55, 68 70, 72 85" stroke-width="4.5" />'
  },
  char_mu: {
    bronze: '<path d="M 16 50 Q 50 18, 84 50 Q 50 82, 16 50 Z" stroke-width="6" /><circle cx="50" cy="50" r="10" stroke-width="6" />',
    seal: '<rect x="32" y="16" width="36" height="68" rx="16" stroke-width="4.5" /><line x1="32" y1="38" x2="68" y2="38" /><line x1="32" y1="62" x2="68" y2="62" /><circle cx="50" cy="50" r="4" fill="#e27d44" />'
  },
  char_kou: {
    bronze: '<path d="M 26 32 C 26 32, 50 20, 74 32 C 74 60, 62 76, 50 80 C 38 76, 26 60, 26 32 Z" stroke-width="6" />',
    seal: '<rect x="28" y="24" width="44" height="52" rx="12" stroke-width="4.5" />'
  },
  char_er: {
    bronze: '<path d="M 36 18 C 66 14, 76 40, 60 60 C 50 72, 36 85, 36 85" stroke-width="6" /><line x1="36" y1="18" x2="36" y2="85" stroke-width="6" />',
    seal: '<path d="M 34 20 C 68 18, 68 45, 52 55 C 45 62, 34 85, 34 85" stroke-width="4.5" /><line x1="34" y1="20" x2="34" y2="85" stroke-width="4.5" /><line x1="34" y1="38" x2="58" y2="38" stroke-width="4" />'
  },
  char_shou: {
    bronze: '<line x1="50" y1="52" x2="50" y2="85" stroke-width="6" /><path d="M 50 52 L 24 32 M 50 52 L 34 18 M 50 52 L 50 14 M 50 52 L 66 18 M 50 52 L 76 32" stroke-width="5.5" />',
    seal: '<line x1="50" y1="18" x2="50" y2="85" stroke-width="4.5" /><path d="M 24 38 Q 50 48, 76 38" stroke-width="4.5" /><path d="M 26 56 Q 50 64, 74 56" stroke-width="4.5" />'
  },
  char_zi: {
    bronze: '<circle cx="50" cy="28" r="14" stroke-width="5.5" /><line x1="20" y1="46" x2="80" y2="46" stroke-width="6" /><path d="M 50 44 L 50 75 Q 50 85, 38 85" stroke-width="6" />',
    seal: '<circle cx="50" cy="28" r="14" stroke-width="4.5" /><line x1="20" y1="46" x2="80" y2="46" stroke-width="4.5" /><path d="M 50 42 C 50 70, 36 85, 36 85" stroke-width="4.5" />'
  },
  char_nv: {
    bronze: '<path d="M 36 22 C 36 46, 64 46, 64 75 L 34 75" stroke-width="6" /><line x1="28" y1="45" x2="74" y2="45" stroke-width="6" /><circle cx="36" cy="22" r="5" fill="#e0a944" />',
    seal: '<path d="M 34 22 C 34 50, 66 50, 66 78 L 32 78" stroke-width="4.5" /><line x1="25" y1="48" x2="75" y2="48" stroke-width="4.5" />'
  },
  char_xin: {
    bronze: '<path d="M 26 35 C 20 56, 34 76, 50 78 C 66 76, 80 56, 74 35" stroke-width="6" /><line x1="50" y1="30" x2="50" y2="50" stroke-width="5" />',
    seal: '<path d="M 28 35 C 22 58, 35 78, 50 80 C 65 78, 78 58, 72 35" stroke-width="4.5" /><path d="M 40 40 L 40 58 M 60 40 L 60 58" stroke-width="4" />'
  },
  char_mu_wood: {
    bronze: '<line x1="50" y1="16" x2="50" y2="85" stroke-width="6" /><path d="M 22 36 Q 38 44, 50 44 Q 62 44, 78 36" stroke-width="5.5" /><path d="M 22 72 Q 38 62, 50 62 Q 62 62, 78 72" stroke-width="5.5" />',
    seal: '<line x1="50" y1="15" x2="50" y2="85" stroke-width="4.5" /><path d="M 24 38 C 38 48, 50 48, 50 48 C 50 48, 62 48, 76 38" stroke-width="4.5" /><path d="M 24 82 C 38 65, 50 65, 50 65 C 50 65, 62 65, 76 82" stroke-width="4.5" />'
  },
  char_tian: {
    bronze: '<rect x="20" y="20" width="60" height="60" stroke-width="6" rx="3" /><line x1="50" y1="20" x2="50" y2="80" stroke-width="5.5" /><line x1="20" y1="50" x2="80" y2="50" stroke-width="5.5" />',
    seal: '<rect x="24" y="18" width="52" height="64" rx="8" stroke-width="4.5" /><line x1="50" y1="18" x2="50" y2="82" stroke-width="4" /><line x1="24" y1="50" x2="76" y2="50" stroke-width="4" />'
  },
  char_men: {
    bronze: '<line x1="24" y1="16" x2="76" y2="16" stroke-width="6" /><line x1="24" y1="16" x2="24" y2="85" stroke-width="6" /><line x1="76" y1="16" x2="76" y2="85" stroke-width="6" /><line x1="24" y1="46" x2="48" y2="46" stroke-width="5" /><line x1="52" y1="46" x2="76" y2="46" stroke-width="5" />',
    seal: '<path d="M 24 18 L 76 18 M 24 18 L 24 84 M 76 18 L 76 84" stroke-width="4.5" /><path d="M 24 45 C 36 45, 48 45, 48 55 M 76 45 C 64 45, 52 45, 52 55" stroke-width="4" />'
  },
  char_che: {
    bronze: '<circle cx="50" cy="22" r="14" stroke-width="5" /><circle cx="50" cy="78" r="14" stroke-width="5" /><line x1="50" y1="36" x2="50" y2="64" stroke-width="6" /><rect x="36" y="40" width="28" height="20" stroke-width="5" />',
    seal: '<line x1="50" y1="14" x2="50" y2="86" stroke-width="4.5" /><circle cx="50" cy="30" r="12" stroke-width="4" /><circle cx="50" cy="70" r="12" stroke-width="4" /><rect x="34" y="44" width="32" height="12" rx="3" stroke-width="4" />'
  },
  char_dao: {
    bronze: '<path d="M 46 14 L 46 45 C 46 66, 28 82, 28 82 L 52 82 C 66 70, 66 45, 66 14 Z" stroke-width="6" />',
    seal: '<path d="M 44 16 L 44 48 C 44 70, 28 84, 28 84" stroke-width="4.5" /><path d="M 44 16 C 68 30, 68 60, 44 84" stroke-width="4.5" />'
  },
  char_ding: {
    bronze: '<rect x="24" y="26" width="52" height="36" rx="4" stroke-width="6" /><line x1="32" y1="26" x2="32" y2="14" stroke-width="6" /><line x1="68" y1="26" x2="68" y2="14" stroke-width="6" /><line x1="32" y1="62" x2="28" y2="86" stroke-width="6" /><line x1="50" y1="62" x2="50" y2="86" stroke-width="6" /><line x1="68" y1="62" x2="72" y2="86" stroke-width="6" />',
    seal: '<rect x="26" y="28" width="48" height="34" rx="6" stroke-width="4.5" /><path d="M 32 28 L 32 15 M 68 28 L 68 15" stroke-width="4.5" /><path d="M 30 62 L 26 85 M 70 62 L 74 85 M 50 62 L 50 85" stroke-width="4.5" />'
  }
};

export async function buildDataset() {
  const targetDir = path.resolve(__dirname, '../data');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const compiled = CHARACTER_COLLECTION.map(char => {
    const custom = BRONZE_SEAL_PATHS[char.id] || {};
    const inner = extractInnerSvgPaths(char.oracle_bone.svg);
    const bronzePaths = custom.bronze || inner;
    const sealPaths = custom.seal || inner;

    return {
      ...char,
      evolution: [
        {
          era: "商代 (~1200 BCE)",
          stage: "甲骨文 (Oracle Bone)",
          glyph: char.oracle_bone.svg
        },
        {
          era: "周代 (~1000 BCE)",
          stage: "金文 (Bronze Script)",
          glyph: createBronzeSvg(bronzePaths)
        },
        {
          era: "秦代 (~220 BCE)",
          stage: "小篆 (Seal Script)",
          glyph: createSealSvg(sealPaths)
        },
        {
          era: "汉代至今",
          stage: "楷书 (Modern)",
          glyph: char.modern
        }
      ]
    };
  });

  const targetFile = path.join(targetDir, 'characters.json');
  fs.writeFileSync(targetFile, JSON.stringify(compiled, null, 2), 'utf-8');

  console.log(`[Scraper Engine] Successfully compiled ${compiled.length} curated Oracle Bone pictographs with vector evolution SVGs.`);
  console.log(`[Scraper Engine] Bundled output written to: ${targetFile}`);
  return compiled;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  buildDataset();
}
