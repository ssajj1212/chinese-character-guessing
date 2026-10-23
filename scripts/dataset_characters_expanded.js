/**
 * Expanded Oracle Bone Characters Dataset (98 New Characters)
 * Expands the game database to 170 characters across 5 categories and 3 difficulty tiers.
 */

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

export const EXPANDED_CHARACTERS = [
  // ==========================================
  // === 1. HEAVENLY STEMS (天干) ===
  // ==========================================
  {
    id: "char_jia",
    modern: "甲",
    pinyin: "jiǎ",
    category: "tools",
    difficulty: "hard",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Armor / First Stem", zh: "甲胄 / 天干第一" },
    description: "An ancient pictograph depicting a cross inside a square or circle, representing a defensive shield plate or turtle carapace.",
    oracle_bone: {
      svg: createOracleSvg('<rect x="25" y="25" width="50" height="50" rx="4" /><line x1="50" y1="25" x2="50" y2="75" stroke-width="5" /><line x1="25" y1="50" x2="75" y2="50" stroke-width="5" />'),
      notes: "The foundational character marking the first day of the Shang 10-day divination cycle (旬)."
    },
    funFact: "In Shang divination inscriptions, '甲' frequently appears as the day name of supreme ancestral kings like '上甲'."
  },
  {
    id: "char_yi",
    modern: "乙",
    pinyin: "yǐ",
    category: "plants",
    difficulty: "hard",
    categoryName: { en: "Plants & Flora", zh: "植物花草" },
    meaning: { en: "Sprout / Second Stem", zh: "幼芽 / 天干第二" },
    description: "Depicts an undulating, winding sprout struggling to twist upward through the dense spring earth.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 30 25 Q 70 25, 70 45 Q 70 65, 30 65 Q 30 85, 70 85" stroke-width="5.5" />'),
      notes: "A serpentine zigzag curve representing organic germination."
    },
    funFact: "The Shang royal lineage named numerous kings after day 乙, including the legendary dynastic founder '天乙' (Tang the Victorious)."
  },
  {
    id: "char_bing",
    modern: "丙",
    pinyin: "bǐng",
    category: "tools",
    difficulty: "hard",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Hearth Base / Third Stem", zh: "火台 / 天干第三" },
    description: "Depicts the flared tail of a fish or a ceremonial fire-stand pedestal supporting sacrificial flames.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 25 30 L 75 30 M 35 30 L 25 78 L 75 78 L 65 30" stroke-width="5" /><line x1="40" y1="54" x2="60" y2="54" />'),
      notes: "A sturdy trapezoidal altar base designed to hold coals."
    },
    funFact: "Ancient Chinese bronze mirrors often carry the auspicious phrase '丙午' to evoke maximum solar illumination."
  },
  {
    id: "char_ding_stem",
    modern: "丁",
    pinyin: "dīng",
    category: "tools",
    difficulty: "easy",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Nail Head / Fourth Stem", zh: "铜钉 / 天干第四" },
    description: "Depicts the solid square head of an ancient bronze or wooden peg viewed from above.",
    oracle_bone: {
      svg: createOracleSvg('<rect x="35" y="35" width="30" height="30" rx="3" fill="currentColor" />'),
      notes: "Originally carved as a solid square or circle representing the head of a nail."
    },
    funFact: "King Wu Ding (武丁), the most celebrated military monarch of the Shang Dynasty whose wife was Fu Hao, bore this stem."
  },
  {
    id: "char_wu_axe",
    modern: "戊",
    pinyin: "wù",
    category: "tools",
    difficulty: "hard",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Battle Axe / Fifth Stem", zh: "大钺 / 天干第五" },
    description: "An imposing bronze polearm axe featuring a broad, crescent cutting edge mounted onto a long shaft.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="38" y1="15" x2="38" y2="85" stroke-width="5.5" /><path d="M 38 28 C 72 25, 78 55, 38 68 Z" fill="none" stroke-width="5" /><circle cx="50" cy="48" r="4" fill="currentColor" />'),
      notes: "The circular hole in the axe head was used to bind it firmly to the wooden handle."
    },
    funFact: "The famous 'Si Mu Wu' Ding (司母戊鼎), the heaviest ancient bronze vessel ever unearthed in China (832 kg), was dedicated to Queen Mother Wu."
  },
  {
    id: "char_ji_cord",
    modern: "己",
    pinyin: "jǐ",
    category: "tools",
    difficulty: "medium",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Silk Spool / Sixth Stem", zh: "丝卷 / 天干第六" },
    description: "Depicts an undulating silk cord or winding thread wrapped neatly around a weaving spool.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 35 25 L 65 25 L 65 50 L 35 50 L 35 75 L 65 75" stroke-width="5.5" />'),
      notes: "A three-tier zigzag representing systematic skein winding."
    },
    funFact: "Because silk cords were wound tightly by one's own hands, '己' extended philosophically to mean 'oneself'."
  },
  {
    id: "char_geng",
    modern: "庚",
    pinyin: "gēng",
    category: "tools",
    difficulty: "hard",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Threshing Flail / Seventh Stem", zh: "脱粒连枷 / 天干第七" },
    description: "Depicts two hands grasping a swinging flail agricultural tool used to beat ripe ears of grain at harvest.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 28 20 L 72 20 M 50 20 L 50 60" stroke-width="5" /><path d="M 30 60 L 50 50 L 70 60" stroke-width="4.5" /><line x1="35" y1="80" x2="48" y2="60" stroke-width="4.5" /><line x1="65" y1="80" x2="52" y2="60" stroke-width="4.5" />'),
      notes: "Symbolizes the transition of late summer when crops are harvested and grain is threshed."
    },
    funFact: "In ancient astronomical cosmology, '庚' represented the autumn harvest gate and the direction West."
  },
  {
    id: "char_xin_chisel",
    modern: "辛",
    pinyin: "xīn",
    category: "tools",
    difficulty: "hard",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Tattooing Chisel / Eighth Stem", zh: "墨刑刻刀 / 天干第八" },
    description: "An ancient bronze chisel knife with a flat handle and sharp triangular blade used for carving or tattooing criminals.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="28" y1="20" x2="72" y2="20" stroke-width="5" /><line x1="50" y1="20" x2="50" y2="52" stroke-width="5" /><path d="M 30 52 L 50 78 L 70 52 Z" stroke-width="4.5" />'),
      notes: "The triangular point at the bottom made incision marks."
    },
    funFact: "The painful sting of tattooing incisions gave '辛' its modern meaning of 'spicy / poignant / hardship' (辛苦)."
  },
  {
    id: "char_ren_stem",
    modern: "壬",
    pinyin: "rén",
    category: "tools",
    difficulty: "hard",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Weaving Spool / Ninth Stem", zh: "纺织线轴 / 天干第九" },
    description: "Depicts a wooden spool with flared ends wrapped with yarn ready for the loom.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="30" y1="22" x2="70" y2="22" stroke-width="5.5" /><line x1="50" y1="22" x2="50" y2="78" stroke-width="5.5" /><line x1="30" y1="78" x2="70" y2="78" stroke-width="5.5" /><line x1="38" y1="50" x2="62" y2="50" stroke-width="4.5" />'),
      notes: "A symmetrical spool frame holding woven threads."
    },
    funFact: "The central bulging thread of '壬' led to the creation of the character '孕' (pregnancy)."
  },
  {
    id: "char_gui_stem",
    modern: "癸",
    pinyin: "guǐ",
    category: "tools",
    difficulty: "hard",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Crossing Blades / Tenth Stem", zh: "四角兵刃 / 天干第十" },
    description: "Crossed dual-ended bronze blades or water-measuring spokes pointing out toward the four cardinal directions.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="25" y1="25" x2="75" y2="75" stroke-width="5" /><line x1="25" y1="75" x2="75" y2="25" stroke-width="5" /><line x1="18" y1="32" x2="32" y2="18" stroke-width="4.5" /><line x1="68" y1="82" x2="82" y2="68" stroke-width="4.5" /><line x1="18" y1="68" x2="32" y2="82" stroke-width="4.5" /><line x1="68" y1="18" x2="82" y2="32" stroke-width="4.5" />'),
      notes: "The final tenth stem of the Shang decade cycle."
    },
    funFact: "Diviners calculated the end of every 10-day period on day '癸' with the ritual inquiry '癸夕卜' (divining the coming week)."
  },

  // ==========================================
  // === 2. EARTHLY BRANCHES (地支) ===
  // ==========================================
  {
    id: "char_chou",
    modern: "丑",
    pinyin: "chǒu",
    category: "human",
    difficulty: "hard",
    categoryName: { en: "Human & Life", zh: "人体生活" },
    meaning: { en: "Clenched Hand / Second Branch", zh: "握拳手爪 / 地支第二" },
    description: "Depicts a curved forearm terminating in tightly bent, gripping fingers.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 35 80 L 35 45 C 35 30, 65 30, 65 45 L 65 65" stroke-width="5" /><path d="M 45 42 L 55 42 M 45 52 L 55 52" stroke-width="4.5" />'),
      notes: "A grasping hand holding tight to an object."
    },
    funFact: "In the Chinese zodiac, '丑' is associated with the patient Ox (丑牛)."
  },
  {
    id: "char_yin_branch",
    modern: "寅",
    pinyin: "yín",
    category: "tools",
    difficulty: "hard",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Arrow in Hands / Third Branch", zh: "双手捧箭 / 地支第三" },
    description: "Two hands reverently presenting a long arrow straight upward toward the ancestors.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="50" y1="15" x2="50" y2="85" stroke-width="5" /><path d="M 40 28 L 50 15 L 60 28" stroke-width="4.5" /><path d="M 28 50 C 38 45, 48 55, 48 68 M 72 50 C 62 45, 52 55, 52 68" stroke-width="4.5" />'),
      notes: "The arrow shaft is clutched symmetrically by two hands."
    },
    funFact: "In ancient astrology, '寅' represents the Tiger and the predawn hour of 3:00 to 5:00 AM."
  },
  {
    id: "char_mao",
    modern: "卯",
    pinyin: "mǎo",
    category: "tools",
    difficulty: "hard",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Split Sacrificial Halves / Fourth Branch", zh: "剖分祭品 / 地支第四" },
    description: "Two symmetrical halves of a split sacrificial animal or double doors opened wide at dawn.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 35 22 L 35 55 C 35 68, 20 68, 20 55 L 20 35" stroke-width="5" /><path d="M 65 22 L 65 55 C 65 68, 80 68, 80 55 L 80 35" stroke-width="5" />'),
      notes: "Two mirrored halves separated down the middle."
    },
    funFact: "In traditional court terminology, '点卯' refers to the morning roll call held during the hour of the Rabbit (5:00 to 7:00 AM)."
  },
  {
    id: "char_chen",
    modern: "辰",
    pinyin: "chén",
    category: "tools",
    difficulty: "hard",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Clam Farming Hoe / Fifth Branch", zh: "蚌镰农具 / 地支第五" },
    description: "A large serrated clam shell tied to a wooden handle, used as a primitive Neolithic digging hoe.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 30 25 C 65 20, 75 45, 60 75 L 30 75 Z" stroke-width="5" /><line x1="30" y1="25" x2="30" y2="85" stroke-width="5.5" /><path d="M 45 42 L 55 58" stroke-width="4" />'),
      notes: "The curved shell edge was ideal for cutting grasses and tilling loess soil."
    },
    funFact: "Because farming seasons depended on the stars, '辰' evolved to mean celestial bodies and time itself (星辰, 时辰)."
  },
  {
    id: "char_si_embryo",
    modern: "巳",
    pinyin: "sì",
    category: "human",
    difficulty: "hard",
    categoryName: { en: "Human & Life", zh: "人体生活" },
    meaning: { en: "Fetus / Sixth Branch", zh: "腹中胎儿 / 地支第六" },
    description: "A developing infant curled safely inside the mother's womb, showing a large round head and curling body.",
    oracle_bone: {
      svg: createOracleSvg('<circle cx="50" cy="35" r="18" stroke-width="5" /><path d="M 50 53 C 50 72, 35 78, 35 65" stroke-width="5" />'),
      notes: "A graphic embryonic figure curled in gestation."
    },
    funFact: "In Chinese zodiac astrology, '巳' corresponds to the Serpent (巳蛇)."
  },
  {
    id: "char_wu_pestle",
    modern: "午",
    pinyin: "wǔ",
    category: "tools",
    difficulty: "medium",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Grain Pestle / Noon", zh: "捣谷杵棒 / 正午" },
    description: "A heavy stone or wooden pestle with a pinched central grip, used for pounding millet grains in a mortar.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 35 22 L 65 22 L 55 45 L 65 78 L 35 78 L 45 45 Z" stroke-width="5" /><line x1="50" y1="22" x2="50" y2="78" stroke-width="4" />'),
      notes: "The hourglass narrowing in the middle allowed workers to grip the pestle."
    },
    funFact: "Because the pestle pounds straight down like the midday sun, '午' came to designate 12:00 noon (中午, 午时)."
  },
  {
    id: "char_wei_tree",
    modern: "未",
    pinyin: "wèi",
    category: "plants",
    difficulty: "medium",
    categoryName: { en: "Plants & Flora", zh: "植物花草" },
    meaning: { en: "Lush Tree / Eighth Branch", zh: "繁茂新枝 / 地支第八" },
    description: "A tree featuring an extra short upper branch tier, depicting lush new growth sprouting at the crown.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="50" y1="18" x2="50" y2="85" stroke-width="5" /><line x1="38" y1="32" x2="62" y2="32" stroke-width="4.5" /><line x1="28" y1="46" x2="72" y2="46" stroke-width="5" /><path d="M 50 46 L 30 80 M 50 46 L 70 80" stroke-width="5" />'),
      notes: "Differs from '木' (tree) by having an extra top stroke indicating tender budding branches."
    },
    funFact: "Because tender buds have not yet fully blossomed, '未' gained the philosophical meaning of 'not yet' (未来, 未知)."
  },
  {
    id: "char_shen_lightning",
    modern: "申",
    pinyin: "shēn",
    category: "nature",
    difficulty: "hard",
    categoryName: { en: "Nature & Cosmos", zh: "自然天象" },
    meaning: { en: "Lightning Bolt / Extend", zh: "天电闪电 / 申展" },
    description: "A jagged, zigzagging stroke of celestial lightning flashing down through storm clouds.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 50 15 L 35 38 L 65 52 L 45 85" stroke-width="5.5" /><line x1="25" y1="45" x2="75" y2="45" stroke-width="4" />'),
      notes: "Dynamic zigzag depicting sudden atmospheric electric discharge."
    },
    funFact: "'申' represents the Chinese Zodiac Monkey (申猴) and is the root of '神' (deity/divine power)."
  },
  {
    id: "char_you_jar",
    modern: "酉",
    pinyin: "yǒu",
    category: "tools",
    difficulty: "medium",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Wine Amphora / Tenth Branch", zh: "酿酒陶坛 / 地支第十" },
    description: "A pointed-bottom ceramic vessel used by ancient brewers for fermenting grain wine and medicinal spirits.",
    oracle_bone: {
      svg: createOracleSvg('<rect x="35" y="20" width="30" height="15" rx="3" stroke-width="4.5" /><path d="M 30 35 L 70 35 L 60 78 L 40 78 Z" stroke-width="5" /><line x1="30" y1="52" x2="70" y2="52" stroke-width="4" />'),
      notes: "The tapered bottom allowed wine sediment to settle."
    },
    funFact: "'酉' is the radical component for nearly all Chinese wine and fermentation characters (酒, 醋, 酵, 醉)."
  },
  {
    id: "char_xu_axe",
    modern: "戌",
    pinyin: "xū",
    category: "tools",
    difficulty: "hard",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Broad Axe Weapon / Eleventh Branch", zh: "宽刃长斧 / 地支十一" },
    description: "A heavy military polearm weapon with a broad, curved slicing blade mounted to a long shaft.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="38" y1="18" x2="38" y2="85" stroke-width="5.5" /><path d="M 38 32 C 68 25, 78 52, 38 65" stroke-width="5" /><line x1="38" y1="48" x2="72" y2="48" stroke-width="4" />'),
      notes: "Widely used as an infantry weapon during the Shang and Zhou campaigns."
    },
    funFact: "In the Chinese zodiac, '戌' is associated with the Loyal Dog (戌狗)."
  },
  {
    id: "char_hai_boar",
    modern: "亥",
    pinyin: "hài",
    category: "animals",
    difficulty: "hard",
    categoryName: { en: "Animals & Beasts", zh: "飞禽走兽" },
    meaning: { en: "Wild Boar / Twelfth Branch", zh: "野猪 / 地支十二" },
    description: "Depicts the stout body, elongated snout, and bristly hair of a wild boar.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 30 35 C 30 22, 65 22, 70 35 C 75 55, 65 72, 45 72 L 30 72 Z" stroke-width="5" /><path d="M 70 35 L 82 32 M 45 72 L 40 85 M 60 72 L 65 85" stroke-width="4.5" />'),
      notes: "The final twelfth branch concluding the lunar cycle."
    },
    funFact: "'亥' represents the Zodiac Pig (亥猪) and the hour of nightfall from 9:00 to 11:00 PM."
  },

  // ==========================================
  // === 3. NUMERALS (数字) ===
  // ==========================================
  {
    id: "char_yi_num",
    modern: "一",
    pinyin: "yī",
    category: "tools",
    difficulty: "easy",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "One / Unity", zh: "数字一 / 初始" },
    description: "A single horizontal bamboo counting rod, representing primordial unity and the integer one.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="22" y1="50" x2="78" y2="50" stroke-width="6.5" />'),
      notes: "The simplest and most ancient mathematical character in Chinese history."
    },
    funFact: "The Daoist classic Dao De Jing famously writes: 'The Dao produced One, One produced Two, Two produced Three, and Three produced all things.'"
  },
  {
    id: "char_er_num",
    modern: "二",
    pinyin: "èr",
    category: "tools",
    difficulty: "easy",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Two / Pair", zh: "数字二 / 成双" },
    description: "Two parallel horizontal counting tally rods laid upon the divination table.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="26" y1="38" x2="74" y2="38" stroke-width="6" /><line x1="22" y1="62" x2="78" y2="62" stroke-width="6" />'),
      notes: "Two equal strokes representing duality."
    },
    funFact: "In ancient divination mathematics, two symbolized the division of Heaven and Earth (天地)."
  },
  {
    id: "char_san_num",
    modern: "三",
    pinyin: "sān",
    category: "tools",
    difficulty: "easy",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Three / Plurality", zh: "数字三 / 多数" },
    description: "Three parallel horizontal counting rods, signifying plurality, stability, and the three realms (Heaven, Earth, and Man).",
    oracle_bone: {
      svg: createOracleSvg('<line x1="26" y1="30" x2="74" y2="30" stroke-width="5.5" /><line x1="32" y1="50" x2="68" y2="50" stroke-width="5.5" /><line x1="22" y1="70" x2="78" y2="70" stroke-width="5.5" />'),
      notes: "Three stacked horizontal tallies."
    },
    funFact: "In ancient Chinese grammar, '三' often signifies 'many' or 'repeatedly', as in '三思而后行' (think thrice before acting)."
  },
  {
    id: "char_si_num",
    modern: "四",
    pinyin: "sì",
    category: "tools",
    difficulty: "easy",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Four", zh: "数字四" },
    description: "Originally written in oracle bones as four stacked horizontal counting tally rods.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="24" y1="26" x2="76" y2="26" stroke-width="5" /><line x1="28" y1="42" x2="72" y2="42" stroke-width="5" /><line x1="28" y1="58" x2="72" y2="58" stroke-width="5" /><line x1="22" y1="74" x2="78" y2="74" stroke-width="5" />'),
      notes: "Four stacked tally lines before being enclosed in modern '四'."
    },
    funFact: "During the Warring States period, to avoid confusion with three lines, scribes replaced the four horizontal strokes with an enclosure representing the dispersal of breath."
  },
  {
    id: "char_wu_num",
    modern: "五",
    pinyin: "wǔ",
    category: "tools",
    difficulty: "easy",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Five / Intersect", zh: "数字五 / 交叉交错" },
    description: "An X-shaped crossing cord tally placed between two horizontal boundaries representing Heaven and Earth.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="25" y1="24" x2="75" y2="24" stroke-width="5.5" /><line x1="32" y1="24" x2="68" y2="76" stroke-width="5.5" /><line x1="68" y1="24" x2="32" y2="76" stroke-width="5.5" /><line x1="25" y1="76" x2="75" y2="76" stroke-width="5.5" />'),
      notes: "An hourglass cross frame representing the midpoint of decimal numbers."
    },
    funFact: "Five became the bedrock of Chinese philosophical systems: the Five Elements (五行), Five Flavors (五味), and Five Tones (五音)."
  },
  {
    id: "char_liu_num",
    modern: "六",
    pinyin: "liù",
    category: "tools",
    difficulty: "easy",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Six / Shed", zh: "数字六 / 庐舍草棚" },
    description: "Depicts a simple triangular nomadic shelter or hut with an overhead canopy and supporting poles.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 50 20 L 25 55 L 75 55 Z" stroke-width="5" /><line x1="38" y1="55" x2="38" y2="82" stroke-width="5" /><line x1="62" y1="55" x2="62" y2="82" stroke-width="5" />'),
      notes: "A hut structure phonetically borrowed for the number six."
    },
    funFact: "In Chinese culture, six is considered the premier auspicious number for smooth progression ('六六大顺')."
  },
  {
    id: "char_qi_num",
    modern: "七",
    pinyin: "qī",
    category: "tools",
    difficulty: "easy",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Seven / Incision", zh: "数字七 / 横断切开" },
    description: "A vertical line crossed and cut directly through by a sharp horizontal stroke.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="22" y1="50" x2="78" y2="50" stroke-width="5.5" /><line x1="50" y1="22" x2="50" y2="78" stroke-width="5.5" />'),
      notes: "Resembled a modern plus sign '+' before evolving its hook."
    },
    funFact: "Originally '七' depicted a cut or incision; it later evolved into the character '切' (to slice/cut)."
  },
  {
    id: "char_ba_num",
    modern: "八",
    pinyin: "bā",
    category: "tools",
    difficulty: "easy",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Eight / Divide", zh: "数字八 / 相背分开" },
    description: "Two mirrored curved strokes turning away from each other, representing division and bifurcation.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 42 32 C 30 45, 25 65, 25 78 M 58 32 C 70 45, 75 65, 75 78" stroke-width="5.5" />'),
      notes: "Two strokes parting in opposite directions."
    },
    funFact: "Because '八' represents separation, it is the root component of '分' (divide) and '别' (part)."
  },
  {
    id: "char_jiu_num",
    modern: "九",
    pinyin: "jiǔ",
    category: "human",
    difficulty: "easy",
    categoryName: { en: "Human & Life", zh: "人体生活" },
    meaning: { en: "Nine / Reaching Arm", zh: "数字九 / 屈臂伸手" },
    description: "Depicts a human arm flexing and curving at the elbow with a hand reaching outward to gather items.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 30 25 L 30 55 C 30 75, 55 75, 70 75 M 25 45 C 50 45, 70 30, 75 22" stroke-width="5.5" />'),
      notes: "A bent elbow reaching out to catch."
    },
    funFact: "Nine is the highest single-digit Yang number in ancient cosmology, symbolizing supreme imperial authority ('九五之尊')."
  },
  {
    id: "char_shi_num",
    modern: "十",
    pinyin: "shí",
    category: "tools",
    difficulty: "easy",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Ten / Complete Needle", zh: "数字十 / 结绳直画" },
    description: "A single vertical counting tally, often thickened in the middle with a swollen bead knot representing completeness.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="50" y1="18" x2="50" y2="82" stroke-width="6" /><ellipse cx="50" cy="50" rx="5" ry="8" fill="currentColor" />'),
      notes: "The knot mark in the center represented the completion of a full ten-unit bundle."
    },
    funFact: "During the Bronze Age, the center swollen knot broadened into a horizontal crossbar, producing the modern '+' shape."
  },
  {
    id: "char_bai_num",
    modern: "百",
    pinyin: "bǎi",
    category: "tools",
    difficulty: "medium",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Hundred", zh: "数字百" },
    description: "Depicts an upright thumb or mouth opening above a numeral tally, denoting the count of one hundred.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="28" y1="25" x2="72" y2="25" stroke-width="5" /><path d="M 35 40 C 35 25, 65 25, 65 40 L 65 75 L 35 75 Z" stroke-width="5" /><line x1="35" y1="55" x2="65" y2="55" stroke-width="4.5" />'),
      notes: "A container counting marker topped by a unit line."
    },
    funFact: "In the Shang military records, troop formations and prisoner tallies were typically counted in units of hundreds (百夫长)."
  },
  {
    id: "char_qian_num",
    modern: "千",
    pinyin: "qiān",
    category: "human",
    difficulty: "medium",
    categoryName: { en: "Human & Life", zh: "人体生活" },
    meaning: { en: "Thousand", zh: "数字千" },
    description: "Depicts a walking human '人' with a distinctive horizontal tally stroke inscribed across the leg.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 50 18 C 50 45, 30 65, 28 85" stroke-width="5.5" /><path d="M 46 42 C 60 55, 68 70, 72 85" stroke-width="5" /><line x1="32" y1="58" x2="68" y2="58" stroke-width="5" />'),
      notes: "The cross stroke on the human figure acts as a mathematical multiplier for 1,000."
    },
    funFact: "Shang kings frequently sacrificed '千牛' (a thousand cattle) in grand ceremonies to appease the ancestors."
  },
  {
    id: "char_wan_num",
    modern: "万",
    pinyin: "wàn",
    category: "animals",
    difficulty: "hard",
    categoryName: { en: "Animals & Beasts", zh: "飞禽走兽" },
    meaning: { en: "Scorpion / Ten Thousand", zh: "蝎子 / 数字万" },
    description: "A graphic, venomous scorpion with pincers outstretched and a curved, segmented tail tipped with a deadly stinger.",
    oracle_bone: {
      svg: createOracleSvg('<ellipse cx="50" cy="50" rx="12" ry="18" stroke-width="4.5" /><path d="M 42 35 C 28 25, 25 15, 35 15 M 58 35 C 72 25, 75 15, 65 15" stroke-width="4.5" /><path d="M 50 68 C 50 82, 70 85, 72 70" stroke-width="5" />'),
      notes: "Because scorpions produce swarms of offspring, the glyph was borrowed for myriad / ten thousand."
    },
    funFact: "The word for scorpion (*m-ranʔ) sounded identical in Old Chinese to ten thousand (*man-s)."
  },

  // ==========================================
  // === 4. CELESTIAL, ATMOSPHERE & NATURE ===
  // ==========================================
  {
    id: "char_tian_sky",
    modern: "天",
    pinyin: "tiān",
    category: "nature",
    difficulty: "easy",
    categoryName: { en: "Nature & Cosmos", zh: "自然天象" },
    meaning: { en: "Sky / Heaven", zh: "苍天 / 天空" },
    description: "Depicts a human standing with an exaggerated, oversized round head, drawing attention upward to the canopy of the sky.",
    oracle_bone: {
      svg: createOracleSvg('<circle cx="50" cy="24" r="12" stroke-width="5" /><line x1="22" y1="45" x2="78" y2="45" stroke-width="5.5" /><line x1="50" y1="36" x2="50" y2="65" stroke-width="5.5" /><path d="M 50 65 L 30 85 M 50 65 L 70 85" stroke-width="5.5" />'),
      notes: "The circle at the top explicitly represents the dome of Heaven resting above man."
    },
    funFact: "In early Shang beliefs, Heaven was personified as the cosmic ruler who governed rain, harvests, and dynastic fate."
  },
  {
    id: "char_qi_vapor",
    modern: "气",
    pinyin: "qì",
    category: "nature",
    difficulty: "medium",
    categoryName: { en: "Nature & Cosmos", zh: "自然天象" },
    meaning: { en: "Air / Vapor / Breath", zh: "云气 / 气息" },
    description: "Three undulating, flowing horizontal layers depicting atmospheric steam, rising vapors, and breath.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 25 32 Q 50 25, 75 32 M 20 50 Q 50 42, 80 50 M 25 68 Q 50 60, 75 68" stroke-width="5" />'),
      notes: "Floating cloud ribbons drifting on atmospheric currents."
    },
    funFact: "In Traditional Chinese Medicine and martial arts, '气' (Qi) represents the vital life force permeating the universe."
  },
  {
    id: "char_yun_cloud",
    modern: "云",
    pinyin: "yún",
    category: "nature",
    difficulty: "easy",
    categoryName: { en: "Nature & Cosmos", zh: "自然天象" },
    meaning: { en: "Cloud", zh: "云彩 / 云朵" },
    description: "Layers of atmospheric vapor with a distinct curling spiral tail below, representing rolling storm thunderclouds.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="28" y1="28" x2="72" y2="28" stroke-width="5" /><line x1="22" y1="42" x2="78" y2="42" stroke-width="5" /><path d="M 60 42 C 60 70, 35 70, 35 55 C 35 45, 50 45, 50 55" stroke-width="4.5" />'),
      notes: "A vortex spiral showing vapor condensing into rain."
    },
    funFact: "In oracle bone divinations, cloud formations were observed closely: '其有云' (will there be clouds?)."
  },
  {
    id: "char_feng_wind",
    modern: "风",
    pinyin: "fēng",
    category: "nature",
    difficulty: "medium",
    categoryName: { en: "Nature & Cosmos", zh: "自然天象" },
    meaning: { en: "Wind / Divine Bird", zh: "大风 / 神鸟" },
    description: "A majestic divine phoenix with fluttering crown plumes; Shang diviners believed celestial winds were whipped up by its wings.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 35 22 C 35 15, 45 15, 50 22 C 55 30, 40 40, 50 55 M 50 55 C 65 45, 78 55, 75 75 M 50 55 L 35 85" stroke-width="5" /><path d="M 45 15 L 55 10 M 50 28 L 65 24" stroke-width="4" />'),
      notes: "In Shang script, the characters for 'wind' and 'phoenix' (凤) were identical."
    },
    funFact: "The Shang worshipped four directional wind deities: the East wind (协), South wind (微), West wind (彝), and North wind (役)."
  },
  {
    id: "char_xue_snow",
    modern: "雪",
    pinyin: "xuě",
    category: "nature",
    difficulty: "medium",
    categoryName: { en: "Nature & Cosmos", zh: "自然天象" },
    meaning: { en: "Snow", zh: "雪花 / 降雪" },
    description: "Rain clouds in the sky with delicate, feather-like snowflakes falling toward a hand collecting them below.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 25 25 L 75 25 L 50 50 Z" stroke-width="4.5" /><circle cx="35" cy="62" r="3" fill="currentColor" /><circle cx="50" cy="68" r="3" fill="currentColor" /><circle cx="65" cy="62" r="3" fill="currentColor" /><path d="M 40 85 L 50 75 L 60 85" stroke-width="4" />'),
      notes: "Frozen raindrops falling in clusters."
    },
    funFact: "A famous oracle bone asks: '今夕其雨？其雪？' (Will it rain tonight? Or will it snow?)."
  },
  {
    id: "char_hong_rainbow",
    modern: "虹",
    pinyin: "hóng",
    category: "nature",
    difficulty: "hard",
    categoryName: { en: "Nature & Cosmos", zh: "自然天象" },
    meaning: { en: "Rainbow / Sky Dragon", zh: "彩虹 / 双头虹霓" },
    description: "A double-headed mythical celestial serpent arched gracefully in the sky, dipping its heads down to drink river water.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 22 75 C 22 25, 78 25, 78 75" stroke-width="6" /><path d="M 16 68 L 22 78 L 28 68 M 72 68 L 78 78 L 84 68" stroke-width="4.5" />'),
      notes: "Shang people viewed the rainbow as an omen dragon that swallowed moisture."
    },
    funFact: "Because rainbows were considered serpentine creatures, the character '虹' bears the insect/reptile radical '虫'."
  },
  {
    id: "char_xing_star",
    modern: "星",
    pinyin: "xīng",
    category: "nature",
    difficulty: "medium",
    categoryName: { en: "Nature & Cosmos", zh: "自然天象" },
    meaning: { en: "Stars", zh: "星辰 / 繁星" },
    description: "Three radiant circular beads suspended in the heavens, depicting stars twinkling against the night sky.",
    oracle_bone: {
      svg: createOracleSvg('<circle cx="50" cy="25" r="9" stroke-width="4.5" /><circle cx="30" cy="65" r="9" stroke-width="4.5" /><circle cx="70" cy="65" r="9" stroke-width="4.5" /><line x1="50" y1="34" x2="50" y2="52" stroke-width="4" />'),
      notes: "Three circles arranged in a triangular constellation."
    },
    funFact: "Shang diviners recorded guest stars (supernovae) and lunar eclipses on bones with remarkable astronomical precision."
  },
  {
    id: "char_xi_dusk",
    modern: "夕",
    pinyin: "xī",
    category: "nature",
    difficulty: "easy",
    categoryName: { en: "Nature & Cosmos", zh: "自然天象" },
    meaning: { en: "Evening / Twilight", zh: "夕阳 / 傍晚" },
    description: "A crescent moon partially veiled as twilight deepens across the horizon.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 65 20 C 35 30, 30 70, 65 80 C 48 65, 48 35, 65 20 Z" stroke-width="5" /><line x1="45" y1="50" x2="55" y2="50" stroke-width="4" />'),
      notes: "Derived from '月' (moon), capturing the moment it emerges at dusk."
    },
    funFact: "Combined with '口' (mouth), it creates '名' (name)—whispering who you are in the dark of night."
  },
  {
    id: "char_dan_dawn",
    modern: "旦",
    pinyin: "dàn",
    category: "nature",
    difficulty: "easy",
    categoryName: { en: "Nature & Cosmos", zh: "自然天象" },
    meaning: { en: "Dawn / Morning", zh: "早晨 / 破晓" },
    description: "The bright solar disk '日' rising directly above the flat, horizontal expanse of the earth at daybreak.",
    oracle_bone: {
      svg: createOracleSvg('<circle cx="50" cy="38" r="18" stroke-width="5" /><circle cx="50" cy="38" r="3" fill="currentColor" /><line x1="20" y1="75" x2="80" y2="75" stroke-width="5.5" />'),
      notes: "The sun perched directly upon the earth line."
    },
    funFact: "In classical Chinese theater, '旦' refers to the leading female role, evoking the radiance of early morning."
  },
  {
    id: "char_qiu_hill",
    modern: "丘",
    pinyin: "qiū",
    category: "nature",
    difficulty: "medium",
    categoryName: { en: "Nature & Cosmos", zh: "自然天象" },
    meaning: { en: "Hills / Mounds", zh: "土丘 / 丘陵" },
    description: "Two gentle earth mounds rising side by side from the level plain.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 22 75 C 22 45, 45 45, 50 75 M 50 75 C 50 45, 78 45, 78 75" stroke-width="5.5" /><line x1="15" y1="75" x2="85" y2="75" stroke-width="5" />'),
      notes: "Twin rolling hillocks in contrast to sharp mountain peaks (山)."
    },
    funFact: "Confucius's personal given name was Qiu (孔丘), because he was born near Mount Niqiu."
  },
  {
    id: "char_gu_valley",
    modern: "谷",
    pinyin: "gǔ",
    category: "nature",
    difficulty: "medium",
    categoryName: { en: "Nature & Cosmos", zh: "自然天象" },
    meaning: { en: "Valley / Gorge", zh: "山谷 / 幽谷" },
    description: "A mountain gorge mouth with water droplets gushing through a narrow rock crevice into a wide basin below.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 30 25 L 45 42 M 70 25 L 55 42" stroke-width="5" /><path d="M 35 48 C 35 48, 50 38, 65 48 L 65 78 L 35 78 Z" stroke-width="5" />'),
      notes: "Water escaping through a mountain fissure."
    },
    funFact: "The Daoist philosopher Laozi praised the valley spirit ('谷神不死') for its yielding, receptive emptiness."
  },
  {
    id: "char_quan_spring",
    modern: "泉",
    pinyin: "quán",
    category: "nature",
    difficulty: "medium",
    categoryName: { en: "Nature & Cosmos", zh: "自然天象" },
    meaning: { en: "Water Spring", zh: "泉眼 / 清泉" },
    description: "Pure subterranean water welling up and bubbling out of a circular rock orifice into multiple streams.",
    oracle_bone: {
      svg: createOracleSvg('<circle cx="50" cy="32" r="14" stroke-width="5" /><path d="M 50 46 L 50 82 M 35 52 Q 28 68, 32 82 M 65 52 Q 72 68, 68 82" stroke-width="4.5" />'),
      notes: "The source hole of a natural spring with flowing trickles."
    },
    funFact: "Ancient Chinese coins were called '泉' (springs) because money was hoped to flow endlessly like water."
  },
  {
    id: "char_bing_ice",
    modern: "冰",
    pinyin: "bīng",
    category: "nature",
    difficulty: "medium",
    categoryName: { en: "Nature & Cosmos", zh: "自然天象" },
    meaning: { en: "Ice / Frost", zh: "寒冰 / 冰霜" },
    description: "Angular, intersecting crystalline fissure cracks forming across a frozen river surface in winter.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 35 25 L 65 45 L 35 65 L 65 85" stroke-width="5.5" />'),
      notes: "Angular zig-zag representing brittle ice fractures."
    },
    funFact: "The Shang maintained ice cellars (凌阴) to preserve meats and cool sacrificial wines during the summer heat."
  },

  // ==========================================
  // === 5. SEASONS (四季) ===
  // ==========================================
  {
    id: "char_chun_spring",
    modern: "春",
    pinyin: "chūn",
    category: "plants",
    difficulty: "medium",
    categoryName: { en: "Plants & Flora", zh: "植物花草" },
    meaning: { en: "Spring / Season", zh: "春季 / 春天" },
    description: "Tender green sprouts pushing energetically out of the soil under the warming rays of the spring sun.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 30 45 C 30 25, 45 25, 45 45 M 55 45 C 55 25, 70 25, 70 45" stroke-width="4.5" /><line x1="50" y1="20" x2="50" y2="78" stroke-width="5" /><circle cx="50" cy="78" r="8" stroke-width="4.5" />'),
      notes: "Combined '木' (wood/foliage), '艸' (sprouts), and '日' (sun)."
    },
    funFact: "The Shang year began with the plowing ceremony in early spring, when the king personally furrowed the sacred royal field."
  },
  {
    id: "char_xia_summer",
    modern: "夏",
    pinyin: "xià",
    category: "human",
    difficulty: "hard",
    categoryName: { en: "Human & Life", zh: "人体生活" },
    meaning: { en: "Summer / Grand", zh: "夏季 / 华夏" },
    description: "A ceremonial masked dancer with waving hands, expressive eyes, and dancing legs celebrating the midsummer solstice.",
    oracle_bone: {
      svg: createOracleSvg('<circle cx="50" cy="24" r="12" stroke-width="4.5" /><circle cx="50" cy="24" r="4" fill="currentColor" /><path d="M 30 45 Q 50 35, 70 45 M 50 36 L 50 65" stroke-width="5" /><path d="M 50 65 L 32 85 M 50 65 L 68 85" stroke-width="5" />'),
      notes: "A celebratory ceremonial dance figure."
    },
    funFact: "'夏' is the legendary namesake of China's earliest dynasty, the Xia Dynasty (夏朝)."
  },
  {
    id: "char_qiu_autumn",
    modern: "秋",
    pinyin: "qiū",
    category: "nature",
    difficulty: "hard",
    categoryName: { en: "Nature & Cosmos", zh: "自然天象" },
    meaning: { en: "Autumn / Harvest", zh: "秋季 / 金秋" },
    description: "A harvest locust or cricket toasted above ceremonial fire after the crop harvest to protect future grain yields.",
    oracle_bone: {
      svg: createOracleSvg('<ellipse cx="50" cy="35" rx="14" ry="18" stroke-width="4.5" /><path d="M 36 25 L 25 15 M 64 25 L 75 15" stroke-width="4" /><path d="M 36 50 Q 20 60, 25 75 M 64 50 Q 80 60, 75 75" stroke-width="4" /><path d="M 50 62 L 40 85 M 50 62 L 60 85" stroke-width="4.5" />'),
      notes: "The insect graph '秋' represented the autumn season when locusts swarm."
    },
    funFact: "In ancient times, roasting crickets after the harvest was both a festive delicacy and pest-control ritual."
  },
  {
    id: "char_dong_winter",
    modern: "冬",
    pinyin: "dōng",
    category: "nature",
    difficulty: "hard",
    categoryName: { en: "Nature & Cosmos", zh: "自然天象" },
    meaning: { en: "Winter / End", zh: "冬季 / 终结" },
    description: "Two knots tied at the extreme ends of a cord, signifying the final termination of the seasonal year.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="30" y1="50" x2="70" y2="50" stroke-width="5.5" /><circle cx="30" cy="50" r="7" fill="currentColor" /><circle cx="70" cy="50" r="7" fill="currentColor" />'),
      notes: "A tied string with both terminals knotted."
    },
    funFact: "The knot symbol of '冬' also generated the character '终' (end / terminus)."
  },

  // ==========================================
  // === 6. HUMAN BODY & RELATIONS ===
  // ==========================================
  {
    id: "char_shen_body",
    modern: "身",
    pinyin: "shēn",
    category: "human",
    difficulty: "medium",
    categoryName: { en: "Human & Life", zh: "人体生活" },
    meaning: { en: "Body / Torso", zh: "身体 / 身躯" },
    description: "A human standing in profile with an exaggerated, protruding pregnant belly.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 45 20 C 45 20, 40 40, 40 60 L 40 85 M 40 38 C 75 38, 75 62, 40 62" stroke-width="5" /><circle cx="45" cy="18" r="6" />'),
      notes: "The swollen midsection highlights the human torso and womb."
    },
    funFact: "In classical Chinese, '有身' directly meant 'to be pregnant'."
  },
  {
    id: "char_gu_bone",
    modern: "骨",
    pinyin: "gǔ",
    category: "human",
    difficulty: "hard",
    categoryName: { en: "Human & Life", zh: "人体生活" },
    meaning: { en: "Bone / Skeleton", zh: "骨骼 / 脊骨" },
    description: "Interlocking animal joints and vertebrae stripped of flesh for oracle inscription.",
    oracle_bone: {
      svg: createOracleSvg('<rect x="32" y="20" width="36" height="28" rx="4" stroke-width="4.5" /><rect x="38" y="48" width="24" height="34" stroke-width="4.5" /><line x1="32" y1="34" x2="68" y2="34" stroke-width="4" />'),
      notes: "A joint socket connected to marrow bone."
    },
    funFact: "Oracle bones were predominantly bovine shoulder blades (ox scapulae) and turtle bottom shells (plastrons)."
  },
  {
    id: "char_chi_teeth",
    modern: "齿",
    pinyin: "chǐ",
    category: "human",
    difficulty: "medium",
    categoryName: { en: "Human & Life", zh: "人体生活" },
    meaning: { en: "Teeth", zh: "牙齿 / 齿轮" },
    description: "An open mouth prominently displaying pointed incisors and chewing teeth inside.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 30 35 C 30 70, 70 70, 70 35 Z" stroke-width="5" /><line x1="42" y1="35" x2="42" y2="55" stroke-width="4" /><line x1="58" y1="35" x2="58" y2="55" stroke-width="4" /><line x1="30" y1="45" x2="70" y2="45" stroke-width="4" />'),
      notes: "Rows of teeth bared within open lips."
    },
    funFact: "Because teeth grow and wear with age, '齿' was used to measure a person's age ('年龄/齿序')."
  },
  {
    id: "char_mei_eyebrow",
    modern: "眉",
    pinyin: "méi",
    category: "human",
    difficulty: "medium",
    categoryName: { en: "Human & Life", zh: "人体生活" },
    meaning: { en: "Eyebrow", zh: "眉毛 / 蛾眉" },
    description: "A prominent, elegant curved hair arch positioned directly above a wide human eye '目'.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 25 32 Q 50 18, 75 32" stroke-width="5.5" /><path d="M 28 48 C 40 40, 60 40, 72 48 C 60 56, 40 56, 28 48 Z" stroke-width="4.5" /><circle cx="50" cy="48" r="4" fill="currentColor" /><path d="M 35 26 L 38 32 M 50 22 L 50 30 M 65 26 L 62 32" stroke-width="3.5" />'),
      notes: "Eyebrow hairs bristling above the pupil."
    },
    funFact: "Long eyebrows were associated with venerable longevity, leading to the phrase '眉寿' (long life) in bronze inscriptions."
  },
  {
    id: "char_zhao_claw",
    modern: "爪",
    pinyin: "zhǎo",
    category: "human",
    difficulty: "easy",
    categoryName: { en: "Human & Life", zh: "人体生活" },
    meaning: { en: "Claw / Grasping Hand", zh: "爪子 / 抓取" },
    description: "A human hand or predatory bird's talon reaching downward with three curved grasping fingers.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="50" y1="18" x2="50" y2="60" stroke-width="5" /><path d="M 50 40 Q 30 55, 30 75 M 50 40 Q 70 55, 70 75" stroke-width="5" />'),
      notes: "Hand reaching down from above to seize."
    },
    funFact: "'爪' is the top component of many action verbs involving taking or plucking, such as '采' (gather) and '受' (receive)."
  },
  {
    id: "char_she_tongue",
    modern: "舌",
    pinyin: "shé",
    category: "human",
    difficulty: "easy",
    categoryName: { en: "Human & Life", zh: "人体生活" },
    meaning: { en: "Tongue / Speech", zh: "舌头 / 口舌" },
    description: "A curved, snake-like or pointed tongue sticking out from an open mouth.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 30 55 C 30 75, 70 75, 70 55 L 70 45 L 30 45 Z" stroke-width="5" /><path d="M 50 45 C 50 25, 40 20, 50 15 C 60 20, 50 25, 50 45" stroke-width="4.5" />'),
      notes: "Tongue projecting out through the lips."
    },
    funFact: "'舌' combined with '甘' (sweet) and '言' (words) underlines the role of the tongue in tasting and speaking."
  },
  {
    id: "char_mu_mother",
    modern: "母",
    pinyin: "mǔ",
    category: "human",
    difficulty: "easy",
    categoryName: { en: "Human & Life", zh: "人体生活" },
    meaning: { en: "Mother", zh: "母亲 / 慈母" },
    description: "A kneeling woman with folded arms, distinguished by two pronounced breast dots representing breastfeeding.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 50 22 C 35 35, 35 55, 50 78 M 38 48 L 62 48" stroke-width="5" /><circle cx="44" cy="40" r="3.5" fill="currentColor" /><circle cx="56" cy="40" r="3.5" fill="currentColor" />'),
      notes: "Derived from '女' (woman) by adding nursing breast marks."
    },
    funFact: "Shang kings offered frequent wine sacrifices to deceased royal ancestral mothers (如母庚, 母辛)."
  },
  {
    id: "char_xiong_brother",
    modern: "兄",
    pinyin: "xiōng",
    category: "human",
    difficulty: "easy",
    categoryName: { en: "Human & Life", zh: "人体生活" },
    meaning: { en: "Elder Brother", zh: "兄长 / 哥哥" },
    description: "A kneeling person crowned with a huge open mouth, chanting prayers and invoking ancestral blessings on behalf of siblings.",
    oracle_bone: {
      svg: createOracleSvg('<rect x="32" y="18" width="36" height="26" rx="4" stroke-width="5" /><path d="M 50 44 L 50 68 C 50 82, 35 82, 35 72 M 50 62 L 68 82" stroke-width="5" />'),
      notes: "Combines '口' (mouth) atop '人' (person)."
    },
    funFact: "In Shang succession rules, royal power often passed from elder brother to younger brother before passing to sons."
  },
  {
    id: "char_fu_father",
    modern: "父",
    pinyin: "fù",
    category: "human",
    difficulty: "easy",
    categoryName: { en: "Human & Life", zh: "人体生活" },
    meaning: { en: "Father / Patriarch", zh: "父亲 / 严父" },
    description: "A strong right hand firmly grasping a stone axe or staff of discipline and tribal leadership.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="35" y1="20" x2="35" y2="80" stroke-width="5.5" /><path d="M 65 35 L 35 50 M 65 65 L 35 50" stroke-width="5" />'),
      notes: "Hand holding a disciplinary staff."
    },
    funFact: "In ancestor worship, '父' signified paternal ancestors of the preceding generation (如父丁, 父乙)."
  },
  {
    id: "char_chen_vassal",
    modern: "臣",
    pinyin: "chén",
    category: "human",
    difficulty: "medium",
    categoryName: { en: "Human & Life", zh: "人体生活" },
    meaning: { en: "Minister / Vassal", zh: "臣仆 / 臣下" },
    description: "A wide human eye turned vertically on end, looking humbly downward in submissive obedience before the ruler.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 38 20 C 30 35, 30 65, 38 80 C 65 80, 65 20, 38 20 Z" stroke-width="5" /><circle cx="48" cy="50" r="5" fill="currentColor" />'),
      notes: "The eye rotated 90 degrees expresses deference."
    },
    funFact: "Captives of war who served in the palace or worked royal fields were called '臣'."
  },
  {
    id: "char_wang_king",
    modern: "王",
    pinyin: "wáng",
    category: "human",
    difficulty: "easy",
    categoryName: { en: "Human & Life", zh: "人体生活" },
    meaning: { en: "King / Monarch", zh: "君王 / 帝王" },
    description: "The broad, curved cutting blade of a ceremonial bronze battle axe denoting supreme military command and royal sovereignty.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="30" y1="20" x2="70" y2="20" stroke-width="5" /><line x1="50" y1="20" x2="50" y2="78" stroke-width="5.5" /><path d="M 22 78 C 35 68, 65 68, 78 78 Z" stroke-width="5.5" fill="none" />'),
      notes: "The axe edge rests firmly at the base."
    },
    funFact: "The philosopher Dong Zhongshu interpreted '王' as the one vertical stroke connecting the three realms of Heaven, Earth, and Man."
  },
  {
    id: "char_lao_elder",
    modern: "老",
    pinyin: "lǎo",
    category: "human",
    difficulty: "medium",
    categoryName: { en: "Human & Life", zh: "人体生活" },
    meaning: { en: "Elder / Old", zh: "长者 / 老人" },
    description: "A stooped elder with long flowing hair leaning forward upon a wooden walking staff for support.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 50 18 Q 30 25, 45 40 Q 55 50, 40 75" stroke-width="5" /><line x1="55" y1="35" x2="75" y2="85" stroke-width="5.5" /><path d="M 40 22 L 25 18 M 42 26 L 25 25" stroke-width="4" />'),
      notes: "Disheveled long hair and a walking cane."
    },
    funFact: "Shang society practiced deep filial reverence towards village elders and council sages."
  },

  // ==========================================
  // === 7. ACTIONS & GESTURES ===
  // ==========================================
  {
    id: "char_li_stand",
    modern: "立",
    pinyin: "lì",
    category: "human",
    difficulty: "easy",
    categoryName: { en: "Human & Life", zh: "人体生活" },
    meaning: { en: "Stand Upright", zh: "站立 / 挺立" },
    description: "A frontal human standing tall with arms spread and feet planted firmly upon the solid ground line.",
    oracle_bone: {
      svg: createOracleSvg('<circle cx="50" cy="22" r="7" /><line x1="22" y1="42" x2="78" y2="42" stroke-width="5" /><line x1="50" y1="29" x2="50" y2="60" stroke-width="5.5" /><path d="M 50 60 L 32 80 M 50 60 L 68 80" stroke-width="5" /><line x1="18" y1="80" x2="82" y2="80" stroke-width="5.5" />'),
      notes: "The horizontal line at the base is the surface of the earth."
    },
    funFact: "'立' marks the beginning of the solar terms: 立春 (Beginning of Spring), 立夏, 立秋, and 立冬."
  },
  {
    id: "char_zou_walk",
    modern: "走",
    pinyin: "zǒu",
    category: "human",
    difficulty: "easy",
    categoryName: { en: "Human & Life", zh: "人体生活" },
    meaning: { en: "Run / Walk", zh: "奔走 / 快跑" },
    description: "A person swinging both arms in rapid motion with a foot '止' bounding forward below.",
    oracle_bone: {
      svg: createOracleSvg('<circle cx="45" cy="20" r="7" /><path d="M 45 27 L 45 52 M 25 35 Q 45 42, 65 30" stroke-width="5" /><path d="M 45 52 L 32 75 L 55 75 M 40 68 L 48 85" stroke-width="5" />'),
      notes: "In classical Chinese, '走' specifically meant 'to run'."
    },
    funFact: "The famous saying '走马观花' (viewing flowers from a galloping horse) preserves the ancient meaning of running."
  },
  {
    id: "char_zuo_sit",
    modern: "坐",
    pinyin: "zuò",
    category: "human",
    difficulty: "medium",
    categoryName: { en: "Human & Life", zh: "人体生活" },
    meaning: { en: "Sit Down", zh: "端坐 / 席地而坐" },
    description: "Two people sitting face to face on their knees upon a raised earthen platform.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 32 30 C 32 45, 20 50, 20 62 L 38 62 M 68 30 C 68 45, 80 50, 80 62 L 62 62" stroke-width="5" /><line x1="15" y1="78" x2="85" y2="78" stroke-width="5.5" /><line x1="50" y1="62" x2="50" y2="78" stroke-width="5" />'),
      notes: "Kneeling figures seated respectfully on woven mats."
    },
    funFact: "Before chairs became widespread during the Song Dynasty, Chinese people sat kneeling on mats ('跪坐')."
  },
  {
    id: "char_wo_recline",
    modern: "卧",
    pinyin: "wò",
    category: "human",
    difficulty: "hard",
    categoryName: { en: "Human & Life", zh: "人体生活" },
    meaning: { en: "Recline / Lie Down", zh: "卧倒 / 躺卧" },
    description: "A person lying flat in horizontal rest with their eye turned sideways looking down.",
    oracle_bone: {
      svg: createOracleSvg('<circle cx="25" cy="40" r="8" /><line x1="33" y1="40" x2="75" y2="40" stroke-width="5.5" /><path d="M 75 40 L 75 65 M 55 40 L 55 60" stroke-width="5" />'),
      notes: "A horizontal sleeping posture."
    },
    funFact: "The ancient idiom '卧薪尝胆' (sleeping on brushwood and tasting gall) celebrates perseverance in hardship."
  },
  {
    id: "char_bai_worship",
    modern: "拜",
    pinyin: "bài",
    category: "human",
    difficulty: "medium",
    categoryName: { en: "Human & Life", zh: "人体生活" },
    meaning: { en: "Bow / Worship", zh: "跪拜 / 礼拜" },
    description: "Two reverent hands lifted upward in unison by a kneeling worshipper before an ancestral shrine.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 35 65 L 35 30 L 45 42 M 65 65 L 65 30 L 55 42" stroke-width="5" /><line x1="28" y1="75" x2="72" y2="75" stroke-width="5" />'),
      notes: "Clasped hands raised high in deference."
    },
    funFact: "'拜' remains the primary character for greeting festivals, paying respects to elders, and diplomatic visits."
  },
  {
    id: "char_wu_dance",
    modern: "舞",
    pinyin: "wǔ",
    category: "human",
    difficulty: "hard",
    categoryName: { en: "Human & Life", zh: "人体生活" },
    meaning: { en: "Dance / Performance", zh: "乐舞 / 翩翩起舞" },
    description: "A ritual dancer holding fluttering ox-tail props in both hands, leaping rhythmically in rainmaking rituals.",
    oracle_bone: {
      svg: createOracleSvg('<circle cx="50" cy="18" r="7" /><line x1="50" y1="25" x2="50" y2="60" stroke-width="5" /><path d="M 25 35 Q 50 45, 75 35" stroke-width="5" /><path d="M 22 35 L 18 60 M 78 35 L 82 60" stroke-width="4.5" /><path d="M 50 60 L 32 85 M 50 60 L 68 85" stroke-width="5" />'),
      notes: "Waving ox tails attached to arms."
    },
    funFact: "Rain dances ('雩舞') were among the most frequent ceremonies recorded in Yinxu oracle bone divinations."
  },
  {
    id: "char_ge_sing",
    modern: "歌",
    pinyin: "gē",
    category: "human",
    difficulty: "hard",
    categoryName: { en: "Human & Life", zh: "人体生活" },
    meaning: { en: "Sing / Chant", zh: "歌咏 / 唱诵" },
    description: "A person with head tilted upward and mouth open wide, emitting ascending puffs of breath in melody.",
    oracle_bone: {
      svg: createOracleSvg('<circle cx="40" cy="25" r="8" /><rect x="52" y="18" width="22" height="18" rx="3" stroke-width="4.5" /><path d="M 40 33 L 40 65 L 28 85 M 40 65 L 55 85" stroke-width="5" /><path d="M 75 22 Q 88 15, 82 28" stroke-width="3.5" />'),
      notes: "Sound breaths escaping from an open throat."
    },
    funFact: "The oldest Chinese poetry collection, the Shijing (Book of Songs), originated as sung oral melodies."
  },
  {
    id: "char_ku_cry",
    modern: "哭",
    pinyin: "kū",
    category: "human",
    difficulty: "medium",
    categoryName: { en: "Human & Life", zh: "人体生活" },
    meaning: { en: "Cry / Weep", zh: "哀哭 / 痛哭" },
    description: "An open wailing mouth shedding falling tear drops in mourning.",
    oracle_bone: {
      svg: createOracleSvg('<circle cx="50" cy="30" r="14" stroke-width="5" /><line x1="50" y1="44" x2="50" y2="75" stroke-width="5" /><circle cx="38" cy="48" r="3" fill="currentColor" /><circle cx="62" cy="48" r="3" fill="currentColor" /><path d="M 50 75 L 35 85 M 50 75 L 65 85" stroke-width="5" />'),
      notes: "Tears streaming down from an agonized face."
    },
    funFact: "Shang funeral rites included formal lamentation sessions led by designated mourners."
  },
  {
    id: "char_jian_see",
    modern: "见",
    pinyin: "jiàn",
    category: "human",
    difficulty: "easy",
    categoryName: { en: "Human & Life", zh: "人体生活" },
    meaning: { en: "See / Perceive", zh: "看见 / 视见" },
    description: "A kneeling human body crowned by an enormous, wide-open eye '目', symbolizing keen visual observation.",
    oracle_bone: {
      svg: createOracleSvg('<ellipse cx="50" cy="30" rx="20" ry="14" stroke-width="5" /><circle cx="50" cy="30" r="5" fill="currentColor" /><path d="M 50 44 L 50 65 C 50 80, 35 80, 35 70 M 50 60 L 65 80" stroke-width="5" />'),
      notes: "The eye is enlarged three times larger than the body to emphasize the act of looking."
    },
    funFact: "Combined with '手' (hand) shading the eye, it becomes '看' (look)."
  },
  {
    id: "char_wen_hear",
    modern: "闻",
    pinyin: "wén",
    category: "human",
    difficulty: "medium",
    categoryName: { en: "Human & Life", zh: "人体生活" },
    meaning: { en: "Hear / Listen", zh: "听闻 / 闻达" },
    description: "A person with a massive, cupped ear turned attentively toward incoming sounds.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 45 18 C 30 18, 30 45, 45 45 C 50 45, 55 35, 55 30" stroke-width="5" /><line x1="45" y1="28" x2="45" y2="38" stroke-width="4" /><path d="M 55 45 L 55 68 C 55 82, 40 82, 40 72 M 55 60 L 70 82" stroke-width="5" />'),
      notes: "An oversized ear attached to a kneeling human frame."
    },
    funFact: "In ancient Chinese, '闻' meant 'to hear'; in modern vernacular it has shifted colloquially to mean 'to smell'."
  },
  {
    id: "char_qu_take",
    modern: "取",
    pinyin: "qǔ",
    category: "tools",
    difficulty: "hard",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Take / Capture Ear", zh: "收取 / 执耳" },
    description: "A warrior's hand slicing off an enemy's left ear on the battlefield to tally casualty counts.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 35 25 C 22 25, 22 55, 35 55 M 35 38 L 45 38" stroke-width="5" /><path d="M 65 30 L 45 45 L 65 60 M 55 45 L 75 45" stroke-width="5" />'),
      notes: "Hand (又) reaching to grasp the ear (耳)."
    },
    funFact: "Shang warriors presented severed left ears to the royal commander, a practice called '馘' (ear bounty)."
  },
  {
    id: "char_zheng_fight",
    modern: "争",
    pinyin: "zhēng",
    category: "human",
    difficulty: "hard",
    categoryName: { en: "Human & Life", zh: "人体生活" },
    meaning: { en: "Contend / Strive", zh: "竞争 / 争夺" },
    description: "Two opposing hands tugging furiously in opposite directions at both ends of a contested rope.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="50" y1="35" x2="50" y2="65" stroke-width="5.5" /><path d="M 30 25 L 50 35 L 70 20" stroke-width="5" /><path d="M 30 80 L 50 65 L 70 75" stroke-width="5" />'),
      notes: "Two hands clutched on a central cord."
    },
    funFact: "'争' represents the origin of competitive tug-of-war contests held during spring festivals."
  },

  // ==========================================
  // === 8. FAUNA & INSECTS (动物昆虫) ===
  // ==========================================
  {
    id: "char_tu_rabbit",
    modern: "兔",
    pinyin: "tù",
    category: "animals",
    difficulty: "easy",
    categoryName: { en: "Animals & Beasts", zh: "飞禽走兽" },
    meaning: { en: "Rabbit / Hare", zh: "野兔 / 玉兔" },
    description: "A crouching hare with long upright ears, an alert eye, a short puff tail, and tucked hind legs ready to leap.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 35 25 L 30 15 M 45 25 L 42 12" stroke-width="5" /><circle cx="45" cy="30" r="7" /><path d="M 45 37 C 65 35, 75 55, 70 75 L 40 75 C 35 65, 45 50, 40 40" stroke-width="5" /><circle cx="75" cy="65" r="3.5" fill="currentColor" />'),
      notes: "Notice the prominent twin ears and bobtail."
    },
    funFact: "In Chinese mythology, a Jade Rabbit (玉兔) lives on the moon grinding elixirs of immortality beneath the osmanthus tree."
  },
  {
    id: "char_shu_rat",
    modern: "鼠",
    pinyin: "shǔ",
    category: "animals",
    difficulty: "medium",
    categoryName: { en: "Animals & Beasts", zh: "飞禽走兽" },
    meaning: { en: "Mouse / Rat", zh: "老鼠 / 仓鼠" },
    description: "A small rodent with a pointed whiskered snout, nibbling at four scattered grains of grain spilling from a granary.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 35 30 C 35 20, 60 20, 60 35 L 60 65 L 40 65 Z" stroke-width="4.5" /><line x1="60" y1="65" x2="78" y2="80" stroke-width="4" /><circle cx="28" cy="30" r="2.5" fill="currentColor" /><circle cx="28" cy="40" r="2.5" fill="currentColor" /><circle cx="28" cy="50" r="2.5" fill="currentColor" /><circle cx="28" cy="60" r="2.5" fill="currentColor" />'),
      notes: "Dots represent dropped millet grains around its paws."
    },
    funFact: "The rat is the very first animal of the 12 Chinese zodiac signs (子鼠)."
  },
  {
    id: "char_she_snake",
    modern: "蛇",
    pinyin: "shé",
    category: "animals",
    difficulty: "easy",
    categoryName: { en: "Animals & Beasts", zh: "飞禽走兽" },
    meaning: { en: "Snake / Serpent", zh: "毒蛇 / 长蛇" },
    description: "An undulating, sinuous viper coiling through grass with a triangular venomous head raised to strike.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 35 25 C 25 15, 45 15, 50 25 C 50 45, 30 50, 45 70 C 60 85, 75 65, 70 50" stroke-width="5.5" />'),
      notes: "A dynamic S-curve depicting serpentine motion."
    },
    funFact: "The ancient graph for snake was originally written '它', which was later borrowed as the third-person pronoun 'it'."
  },
  {
    id: "char_hu_fox",
    modern: "狐",
    pinyin: "hú",
    category: "animals",
    difficulty: "medium",
    categoryName: { en: "Animals & Beasts", zh: "飞禽走兽" },
    meaning: { en: "Fox", zh: "白狐 / 赤狐" },
    description: "A slender wild canid featuring a pointed triangular muzzle, pointed ears, and a massive bushy tail.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 30 35 C 30 25, 42 25, 45 35 M 40 25 L 35 18 M 48 25 L 50 18" stroke-width="4.5" /><path d="M 45 35 L 65 45 L 60 75 M 45 55 L 42 75 M 55 55 L 58 75" stroke-width="4.5" /><path d="M 65 45 C 85 45, 85 65, 72 70" stroke-width="5" />'),
      notes: "The fluffy curled tail distinguishes it from a dog."
    },
    funFact: "In Chinese folklore, foxes could cultivate magical Daoist powers and transform into enchanting spirits (狐狸精)."
  },
  {
    id: "char_lang_wolf",
    modern: "狼",
    pinyin: "láng",
    category: "animals",
    difficulty: "medium",
    categoryName: { en: "Animals & Beasts", zh: "飞禽走兽" },
    meaning: { en: "Wolf", zh: "野狼 / 豺狼" },
    description: "A fierce canine predator depicted with a wide howling jaw, bared teeth, and lean predatory hindquarters.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 35 30 L 25 20 M 35 35 L 22 35" stroke-width="4.5" /><path d="M 35 30 C 50 25, 60 40, 60 65 L 50 82 M 45 55 L 38 82" stroke-width="5" /><path d="M 60 55 C 75 55, 75 75, 68 85" stroke-width="4.5" />'),
      notes: "A gaping predatory snout."
    },
    funFact: "Shang hunters organized massive royal hunts (田猎) to track wolf packs across the central plains."
  },
  {
    id: "char_he_crane",
    modern: "鹤",
    pinyin: "hè",
    category: "animals",
    difficulty: "medium",
    categoryName: { en: "Animals & Beasts", zh: "飞禽走兽" },
    meaning: { en: "Crane / Stork", zh: "仙鹤 / 白鹤" },
    description: "A graceful wading water bird with an elongated S-curved neck, a long beak, and stilt-like slender legs.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 45 18 C 35 25, 45 35, 40 45 L 32 18" stroke-width="4.5" /><ellipse cx="50" cy="55" rx="14" ry="12" stroke-width="4.5" /><line x1="46" y1="67" x2="42" y2="85" stroke-width="4.5" /><line x1="54" y1="67" x2="58" y2="85" stroke-width="4.5" />'),
      notes: "Long neck and stilt wading legs."
    },
    funFact: "The crane is a universal symbol of lofty Daoist immortality and purity in Chinese culture."
  },
  {
    id: "char_yan_goose",
    modern: "雁",
    pinyin: "yàn",
    category: "animals",
    difficulty: "medium",
    categoryName: { en: "Animals & Beasts", zh: "飞禽走兽" },
    meaning: { en: "Wild Goose", zh: "大雁 / 飞雁" },
    description: "A wild migratory goose gliding with outstretched wings beneath the eaves of a shelter.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 25 25 L 75 25 L 35 50" stroke-width="4.5" /><path d="M 45 42 C 45 35, 60 35, 65 45 C 70 58, 60 75, 45 75 Z" stroke-width="4.5" /><line x1="50" y1="75" x2="50" y2="85" stroke-width="4.5" />'),
      notes: "A goose sheltered beneath a rock cliff."
    },
    funFact: "Because wild geese fly in orderly V-formations and mate for life, they were traditional wedding gifts in ancient China."
  },
  {
    id: "char_zhui_bird",
    modern: "隹",
    pinyin: "zhuī",
    category: "animals",
    difficulty: "hard",
    categoryName: { en: "Animals & Beasts", zh: "飞禽走兽" },
    meaning: { en: "Short-tailed Bird", zh: "短尾鸟雀" },
    description: "A compact perching bird or sparrow with a small beak, a plump body, and short tail feathers.",
    oracle_bone: {
      svg: createOracleSvg('<circle cx="42" cy="28" r="8" /><path d="M 34 28 L 24 28" stroke-width="4.5" /><path d="M 48 34 C 65 40, 65 65, 45 75 L 35 75 Z" stroke-width="5" /><line x1="45" y1="75" x2="45" y2="85" stroke-width="4.5" /><line x1="55" y1="52" x2="72" y2="52" stroke-width="4" /><line x1="52" y1="62" x2="68" y2="62" stroke-width="4" />'),
      notes: "Contrasts with '鸟' (niǎo), which represents long-tailed birds like peacocks."
    },
    funFact: "'隹' is the radical component for dozens of bird characters including 雀 (sparrow), 雄 (male), and 难 (difficulty)."
  },
  {
    id: "char_can_worm",
    modern: "蚕",
    pinyin: "cán",
    category: "animals",
    difficulty: "medium",
    categoryName: { en: "Animals & Beasts", zh: "飞禽走兽" },
    meaning: { en: "Silkworm", zh: "桑蚕 / 蚕虫" },
    description: "A plump, segmented caterpillar crawling upward with a small rounded head and curled tail, spinning silk.",
    oracle_bone: {
      svg: createOracleSvg('<circle cx="50" cy="22" r="8" /><path d="M 50 30 C 35 40, 65 50, 45 65 C 35 75, 55 85, 65 80" stroke-width="5" /><line x1="38" y1="42" x2="48" y2="42" stroke-width="3.5" /><line x1="52" y1="55" x2="62" y2="55" stroke-width="3.5" />'),
      notes: "The wavy segmented rings indicate the caterpillar body."
    },
    funFact: "Sericulture (silk production) was a closely guarded state secret in ancient China, founded by the legendary Empress Leizu."
  },
  {
    id: "char_bei_shell",
    modern: "贝",
    pinyin: "bèi",
    category: "tools",
    difficulty: "easy",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Cowrie Shell / Currency", zh: "海贝 / 贝币" },
    description: "A ribbed marine cowrie shell showing its serrated opening, used across the Shang realm as commodity money.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 30 25 C 30 25, 50 15, 70 25 C 75 55, 65 78, 50 82 C 35 78, 25 55, 30 25 Z" stroke-width="5" /><line x1="50" y1="22" x2="50" y2="78" stroke-width="4" /><path d="M 38 45 L 46 45 M 54 45 L 62 45 M 38 60 L 46 60 M 54 60 L 62 60" stroke-width="3.5" />'),
      notes: "The serrated teeth of the cowrie shell opening."
    },
    funFact: "Nearly all Chinese financial terms contain the shell radical '贝': 财 (wealth), 贵 (expensive), 货 (goods), and 买 (buy)."
  },

  // ==========================================
  // === 9. FLORA & SUSTENANCE ===
  // ==========================================
  {
    id: "char_sang_tree",
    modern: "桑",
    pinyin: "sāng",
    category: "plants",
    difficulty: "medium",
    categoryName: { en: "Plants & Flora", zh: "植物花草" },
    meaning: { en: "Mulberry Tree", zh: "桑树 / 桑田" },
    description: "A sacred mulberry tree with branching limbs displaying three hand-picked leaves harvested for silkworms.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="50" y1="25" x2="50" y2="85" stroke-width="5" /><path d="M 50 50 L 30 35 M 50 50 L 70 35" stroke-width="4.5" /><circle cx="30" cy="30" r="5" fill="currentColor" /><circle cx="70" cy="30" r="5" fill="currentColor" /><circle cx="50" cy="20" r="5" fill="currentColor" /><path d="M 50 65 L 32 85 M 50 65 L 68 85" stroke-width="4.5" />'),
      notes: "A tree laden with lush mulberry leaves."
    },
    funFact: "'桑梓' (mulberry and catalpa) is an ancient poetic idiom referring lovingly to one's native hometown."
  },
  {
    id: "char_mai_wheat",
    modern: "麦",
    pinyin: "mài",
    category: "plants",
    difficulty: "medium",
    categoryName: { en: "Plants & Flora", zh: "植物花草" },
    meaning: { en: "Wheat / Grain", zh: "小麦 / 麦穗" },
    description: "A stalk of wheat with heavy grain awns drooping downward, carried by incoming feet '止' from western frontiers.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="50" y1="18" x2="50" y2="60" stroke-width="5" /><path d="M 30 30 L 50 20 L 70 30 M 25 45 L 50 35 L 75 45" stroke-width="4.5" /><path d="M 50 60 L 38 85 L 62 85" stroke-width="5" />'),
      notes: "The descending foot below indicates wheat arrived as an introduced crop."
    },
    funFact: "Wheat was introduced to the Yellow River Valley from Central Asia around 2000 BCE."
  },
  {
    id: "char_shu_millet",
    modern: "黍",
    pinyin: "shǔ",
    category: "plants",
    difficulty: "hard",
    categoryName: { en: "Plants & Flora", zh: "植物花草" },
    meaning: { en: "Broomcorn Millet", zh: "黍米 / 黄米" },
    description: "A heavy stalk of glutinous millet with dripping panicle tassels and sticky grains used to brew ceremonial ale.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="50" y1="18" x2="50" y2="85" stroke-width="5" /><path d="M 50 35 Q 25 35, 25 55 M 50 35 Q 75 35, 75 55" stroke-width="4.5" /><circle cx="25" cy="62" r="3" fill="currentColor" /><circle cx="75" cy="62" r="3" fill="currentColor" /><circle cx="50" cy="45" r="3" fill="currentColor" /><path d="M 50 65 L 32 85 M 50 65 L 68 85" stroke-width="4.5" />'),
      notes: "Sticky starch droplets indicated on the tassels."
    },
    funFact: "Millet was the primary staple crop feeding northern China's civilizations for over five millennia."
  },
  {
    id: "char_mi_rice",
    modern: "米",
    pinyin: "mǐ",
    category: "plants",
    difficulty: "easy",
    categoryName: { en: "Plants & Flora", zh: "植物花草" },
    meaning: { en: "Rice Grains", zh: "大米 / 谷粒" },
    description: "Scattered kernels of threshed cereal grain separated cleanly across a central winnowing line.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="20" y1="50" x2="80" y2="50" stroke-width="5.5" /><circle cx="35" cy="35" r="3.5" fill="currentColor" /><circle cx="50" cy="30" r="3.5" fill="currentColor" /><circle cx="65" cy="35" r="3.5" fill="currentColor" /><circle cx="35" cy="65" r="3.5" fill="currentColor" /><circle cx="50" cy="70" r="3.5" fill="currentColor" /><circle cx="65" cy="65" r="3.5" fill="currentColor" />'),
      notes: "Six scattered grains surrounding a partition."
    },
    funFact: "Rice was domesticated along the Yangtze River basin over 10,000 years ago."
  },
  {
    id: "char_ma_hemp",
    modern: "麻",
    pinyin: "má",
    category: "plants",
    difficulty: "hard",
    categoryName: { en: "Plants & Flora", zh: "植物花草" },
    meaning: { en: "Hemp Fiber", zh: "大麻 / 亚麻" },
    description: "Stripped ribbons of plant hemp fiber hung up to dry under a shed roof.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 22 25 L 78 25 L 22 80" stroke-width="5" /><line x1="42" y1="35" x2="42" y2="75" stroke-width="4.5" /><line x1="62" y1="35" x2="62" y2="75" stroke-width="4.5" /><path d="M 38 55 L 46 55 M 58 55 L 66 55" stroke-width="4" />'),
      notes: "Hemp was ancient China's universal fabric for commoner clothing before cotton."
    },
    funFact: "Because peeling hemp fibers requires stripping layers, '麻' later developed the medical sense of numbness."
  },
  {
    id: "char_cao_grass",
    modern: "草",
    pinyin: "cǎo",
    category: "plants",
    difficulty: "easy",
    categoryName: { en: "Plants & Flora", zh: "植物花草" },
    meaning: { en: "Grass / Flora", zh: "青草 / 花草" },
    description: "Two tender twin shoots of green vegetation springing up side by side from the moist ground.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 35 25 L 35 75 M 25 45 Q 35 35, 45 45" stroke-width="5" /><path d="M 65 25 L 65 75 M 55 45 Q 65 35, 75 45" stroke-width="5" />'),
      notes: "The root ancestor of the grass radical (艹)."
    },
    funFact: "Every herbal medicine character in Chinese contains this ancient twin grass radical."
  },
  {
    id: "char_gen_root",
    modern: "根",
    pinyin: "gēn",
    category: "plants",
    difficulty: "medium",
    categoryName: { en: "Plants & Flora", zh: "植物花草" },
    meaning: { en: "Tree Root", zh: "树根 / 根本" },
    description: "The subterranean base of a tree trunk with deep root tendrils anchoring it firmly into the soil.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="50" y1="20" x2="50" y2="60" stroke-width="5" /><path d="M 50 60 L 25 85 M 50 60 L 75 85 M 50 60 L 40 85 M 50 60 L 60 85" stroke-width="4.5" />'),
      notes: "Spreading subterranean roots below the ground."
    },
    funFact: "'根基' (foundation) and '根本' (fundamental) both trace directly to this tree root pictograph."
  },
  {
    id: "char_guo_fruit",
    modern: "果",
    pinyin: "guǒ",
    category: "plants",
    difficulty: "easy",
    categoryName: { en: "Plants & Flora", zh: "植物花草" },
    meaning: { en: "Fruit", zh: "鲜果 / 果实" },
    description: "Round, delicious fruit clusters hanging ripe from the top branches of a fruit tree.",
    oracle_bone: {
      svg: createOracleSvg('<circle cx="50" cy="30" r="14" stroke-width="5" /><circle cx="50" cy="30" r="4" fill="currentColor" /><line x1="50" y1="44" x2="50" y2="85" stroke-width="5.5" /><path d="M 50 65 L 30 85 M 50 65 L 70 85" stroke-width="4.5" />'),
      notes: "A circular fruit perched atop the trunk of '木'."
    },
    funFact: "Because fruit represents the outcome of a tree's growth, '果' extended to mean 'result' (结果, 效果)."
  },
  {
    id: "char_feng_harvest",
    modern: "丰",
    pinyin: "fēng",
    category: "tools",
    difficulty: "hard",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Bountiful Harvest", zh: "丰盛 / 丰收" },
    description: "A ritual chalice vessel piled high with luxuriant, overflowing ears of golden grain presented to the gods.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="50" y1="18" x2="50" y2="65" stroke-width="5" /><line x1="28" y1="28" x2="72" y2="28" stroke-width="4.5" /><line x1="24" y1="42" x2="76" y2="42" stroke-width="4.5" /><path d="M 35 65 L 65 65 L 58 82 L 42 82 Z" stroke-width="5" />'),
      notes: "Multiple tiers of grain stalks resting in a footed stand."
    },
    funFact: "A bumper crop was considered the ultimate sign of divine favor from Shangdi."
  },
  {
    id: "char_shi_food",
    modern: "食",
    pinyin: "shí",
    category: "tools",
    difficulty: "easy",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Food / Meal", zh: "饮食 / 粮食" },
    description: "A tall sacrificial serving bowl heaped with steaming grain, protected by a triangular pointed lid above.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 50 18 L 25 38 L 75 38 Z" stroke-width="4.5" /><path d="M 32 46 C 32 65, 68 65, 68 46" stroke-width="5" /><path d="M 40 64 L 35 82 M 60 64 L 65 82" stroke-width="5" />'),
      notes: "Lidded food bowl on pedestaled feet."
    },
    funFact: "The ancient saying declares: '民以食为天' (To the people, food is as paramount as Heaven)."
  },
  {
    id: "char_yin_drink",
    modern: "饮",
    pinyin: "yǐn",
    category: "human",
    difficulty: "medium",
    categoryName: { en: "Human & Life", zh: "人体生活" },
    meaning: { en: "Drink / Sip", zh: "痛饮 / 饮酒" },
    description: "A person bent forward with an outstretched tongue eagerly drinking wine from a fermentation jar.",
    oracle_bone: {
      svg: createOracleSvg('<rect x="52" y="38" width="28" height="42" rx="4" stroke-width="4.5" /><path d="M 35 25 C 25 35, 25 55, 35 75 M 35 32 L 52 38" stroke-width="5" /><circle cx="35" cy="22" r="6" />'),
      notes: "Man leaning over an amphora with tongue extended."
    },
    funFact: "Shang banquets were celebrated for copious libations of warming millet wine."
  },

  // ==========================================
  // === 10. ARCHITECTURE, WEAPONS & DIVINATION ===
  // ==========================================
  {
    id: "char_gong_palace",
    modern: "宫",
    pinyin: "gōng",
    category: "tools",
    difficulty: "medium",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Palace / Great Hall", zh: "宫室 / 王宫" },
    description: "A sweeping pitched roof enclosing multiple interconnected living halls and chambers.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 50 15 L 20 32 L 80 32 Z" stroke-width="4.5" /><rect x="35" y="38" width="30" height="20" rx="3" stroke-width="4.5" /><rect x="35" y="62" width="30" height="20" rx="3" stroke-width="4.5" />'),
      notes: "A roof sheltering multiple rooms (吕)."
    },
    funFact: "In the Shang capital at Anyang, royal palace foundations stretched over tens of thousands of square meters."
  },
  {
    id: "char_shi_room",
    modern: "室",
    pinyin: "shì",
    category: "tools",
    difficulty: "medium",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Room / Chamber", zh: "居室 / 室内" },
    description: "A house roof sheltering an arrow '至' that has arrived and settled inside its target room.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 50 18 L 22 35 L 78 35 Z" stroke-width="4.5" /><line x1="28" y1="35" x2="28" y2="82" stroke-width="4.5" /><line x1="72" y1="35" x2="72" y2="82" stroke-width="4.5" /><line x1="50" y1="42" x2="50" y2="75" stroke-width="4.5" />'),
      notes: "A protective domestic dwelling."
    },
    funFact: "'室家' in ancient texts referred to family harmony within one's home."
  },
  {
    id: "char_hu_door",
    modern: "户",
    pinyin: "hù",
    category: "tools",
    difficulty: "easy",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Single Door Leaf", zh: "单扇门 / 门户" },
    description: "One single swinging wooden door leaf with top and bottom pivot hinges, half of a double gate '门'.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="32" y1="18" x2="32" y2="85" stroke-width="5.5" /><path d="M 32 25 L 68 25 L 68 55 L 32 55" stroke-width="5" />'),
      notes: "Single door leaf mounted to a doorpost."
    },
    funFact: "'门当户对' (matching gates and doors) remains a famous idiom for social compatibility."
  },
  {
    id: "char_jing_well",
    modern: "井",
    pinyin: "jǐng",
    category: "tools",
    difficulty: "easy",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Water Well", zh: "水井 / 井台" },
    description: "Four interlocking squared wooden beams forming the protective box curbing surrounding a deep water well.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="20" y1="38" x2="80" y2="38" stroke-width="5.5" /><line x1="20" y1="62" x2="80" y2="62" stroke-width="5.5" /><line x1="38" y1="20" x2="38" y2="80" stroke-width="5.5" /><line x1="62" y1="20" x2="62" y2="80" stroke-width="5.5" />'),
      notes: "The timber grid prevented earth from collapsing into drinking water."
    },
    funFact: "The ancient communal land division system was called the 'Well-field system' (井田制) after this grid pattern."
  },
  {
    id: "char_yi_city",
    modern: "邑",
    pinyin: "yì",
    category: "tools",
    difficulty: "medium",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "City / Settlement", zh: "城邑 / 都邑" },
    description: "A fortified rampart wall '囗' standing above kneeling townspeople living within its safety.",
    oracle_bone: {
      svg: createOracleSvg('<rect x="32" y="20" width="36" height="28" rx="4" stroke-width="5" /><path d="M 50 48 L 50 68 C 50 82, 35 82, 35 72 M 50 62 L 68 82" stroke-width="5" />'),
      notes: "An enclosed defensive perimeter over people."
    },
    funFact: "Yinxu was often referred to in bone inscriptions as '大邑商' (The Great City of Shang)."
  },
  {
    id: "char_dun_shield",
    modern: "盾",
    pinyin: "dùn",
    category: "tools",
    difficulty: "medium",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Battle Shield", zh: "盾牌 / 战盾" },
    description: "An oval infantry battle shield reinforced with hardened leather, wooden ribbing, and an eyehole slit.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 30 20 L 70 20 L 75 70 C 75 82, 25 82, 25 70 Z" stroke-width="5" /><line x1="30" y1="45" x2="70" y2="45" stroke-width="4.5" /><line x1="50" y1="20" x2="50" y2="80" stroke-width="4.5" />'),
      notes: "A defensive war shield."
    },
    funFact: "The philosophical word for contradiction, '矛盾' (Máo-Dùn), derives from the parable of the unstoppable spear and impenetrable shield."
  },
  {
    id: "char_mao_spear",
    modern: "矛",
    pinyin: "máo",
    category: "tools",
    difficulty: "easy",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Spear / Lance", zh: "长矛 / 兵矛" },
    description: "A pointed leaf-bladed bronze spearhead mounted onto a long wooden thrusting pole with binding cords.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="50" y1="15" x2="50" y2="85" stroke-width="5.5" /><path d="M 35 32 C 35 15, 65 15, 65 32 L 50 45 Z" stroke-width="4.5" /><line x1="42" y1="52" x2="58" y2="52" stroke-width="4" />'),
      notes: "A sharp piercing spear blade."
    },
    funFact: "Bronze spears unearthed in Shang royal tombs retain razor-sharp edges after over 3,000 years."
  },
  {
    id: "char_yue_axe",
    modern: "钺",
    pinyin: "yuè",
    category: "tools",
    difficulty: "hard",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Ceremonial Broad Axe", zh: "王权大钺 / 军权" },
    description: "A colossal bronze executioner's broad axe inlaid with turquoise, symbolizing supreme royal command and military justice.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="32" y1="18" x2="32" y2="85" stroke-width="5.5" /><path d="M 32 25 L 75 32 C 82 55, 75 75, 32 78 Z" stroke-width="5" fill="none" /><circle cx="50" cy="52" r="5" fill="currentColor" />'),
      notes: "The royal axe was entrusted to generals as a commission of war."
    },
    funFact: "General Lady Fu Hao was buried with two massive bronze Yue axes weighing over 9 kg each."
  },
  {
    id: "char_fou_drum",
    modern: "缶",
    pinyin: "fǒu",
    category: "tools",
    difficulty: "hard",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Clay Drum / Vessel", zh: "陶瓦缶 / 乐器" },
    description: "A bulbous round earthenware jar with a wide mouth, struck with wooden beaters as a resonant percussion instrument.",
    oracle_bone: {
      svg: createOracleSvg('<ellipse cx="50" cy="55" rx="24" ry="20" stroke-width="5" /><rect x="36" y="22" width="28" height="15" rx="3" stroke-width="4.5" /><line x1="36" y1="36" x2="64" y2="36" stroke-width="4" />'),
      notes: "Clay jar tapped during ancient banquets."
    },
    funFact: "At the 2008 Beijing Olympics Opening Ceremony, 2,008 performers struck luminous ancient Fou drums in unison."
  },
  {
    id: "char_bu_divination",
    modern: "卜",
    pinyin: "bǔ",
    category: "tools",
    difficulty: "easy",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Divination Crack", zh: "甲骨裂纹 / 占卜" },
    description: "The classic T-shaped vertical fracture and horizontal spur created by scorching turtle plastrons with red-hot bronze rods.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="50" y1="15" x2="50" y2="85" stroke-width="6" /><line x1="50" y1="42" x2="78" y2="35" stroke-width="6" />'),
      notes: "The authentic heat crack interpreted by Shang kings."
    },
    funFact: "The pronunciation 'bǔ' is an onomatopoeia mimicking the crisp 'bôk' sound of bone cracking under thermal stress."
  },
  {
    id: "char_zhao_omen",
    modern: "兆",
    pinyin: "zhào",
    category: "tools",
    difficulty: "hard",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Divination Fissures / Omen", zh: "卜兆 / 预兆" },
    description: "An intricate radiating network of fracture fissure veins bursting across scorched oracle bone surfaces.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="50" y1="15" x2="50" y2="85" stroke-width="5.5" /><path d="M 50 35 L 75 25 M 50 55 L 75 45 M 50 42 L 25 52 M 50 65 L 25 75" stroke-width="5" />'),
      notes: "Multiple cracking veins analyzed for auspiciousness."
    },
    funFact: "Because the fractures were too numerous to count easily, '兆' later became the numeral for a trillion."
  },
  {
    id: "char_zhen_inquire",
    modern: "贞",
    pinyin: "zhēn",
    category: "tools",
    difficulty: "hard",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Inquire / Divine Truth", zh: "卜问 / 贞卜" },
    description: "A bronze divination tripod cauldron inscribed with the sacred question posed to the royal spirits.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="50" y1="18" x2="50" y2="45" stroke-width="5" /><line x1="50" y1="32" x2="72" y2="26" stroke-width="5" /><path d="M 32 45 L 68 45 L 62 78 L 38 78 Z" stroke-width="5" /><line x1="38" y1="78" x2="35" y2="88" stroke-width="4.5" /><line x1="62" y1="78" x2="65" y2="88" stroke-width="4.5" />'),
      notes: "Combines the '卜' fracture above a cauldron vessel."
    },
    funFact: "Almost every Shang oracle inscription begins with the ritual formula: '某日卜，某贞' (On day X, Diviner Y tested)."
  },
  {
    id: "char_zhu_priest",
    modern: "祝",
    pinyin: "zhù",
    category: "human",
    difficulty: "medium",
    categoryName: { en: "Human & Life", zh: "人体生活" },
    meaning: { en: "Invocator / Priest", zh: "祝官祭司 / 祈祷" },
    description: "A temple priest kneeling with an open mouth chanting prayers and blessings directly before the ancestral stone altar '示'.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 25 25 L 55 25 M 40 25 L 40 60 L 30 78 M 40 60 L 50 78" stroke-width="4.5" /><rect x="62" y="32" width="20" height="16" rx="3" stroke-width="4.5" /><path d="M 72 48 L 72 68 C 72 78, 62 78, 62 70" stroke-width="4.5" />'),
      notes: "Altar on left, worshipper with mouth on right."
    },
    funFact: "'祝' were official high ministers in charge of state prayers, surviving today in '祝愿' (blessings/wishes)."
  },
  {
    id: "char_shi_altar",
    modern: "示",
    pinyin: "shì",
    category: "tools",
    difficulty: "medium",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Sacred Altar / Manifest", zh: "祭坛 / 昭示" },
    description: "A consecrated T-shaped stone sacrificial altar table with droplets of sacred wine dripping down from the upper slab.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="28" y1="20" x2="72" y2="20" stroke-width="5.5" /><line x1="50" y1="20" x2="50" y2="78" stroke-width="5.5" /><line x1="22" y1="35" x2="78" y2="35" stroke-width="5.5" /><circle cx="35" cy="55" r="3" fill="currentColor" /><circle cx="65" cy="55" r="3" fill="currentColor" />'),
      notes: "The altar table where gifts were revealed to spirits."
    },
    funFact: "'示' is the radical for virtually all sacred and spiritual characters: 神 (god), 礼 (ritual), 祖 (ancestor), and 福 (blessing)."
  },
  {
    id: "char_zong_shrine",
    modern: "宗",
    pinyin: "zōng",
    category: "tools",
    difficulty: "medium",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Ancestral Temple", zh: "宗庙 / 祖宗" },
    description: "A pitched roof of a temple building sheltering the sacred stone altar of the clan ancestors inside.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 50 18 L 22 36 L 78 36 Z" stroke-width="4.5" /><line x1="35" y1="48" x2="65" y2="48" stroke-width="5" /><line x1="50" y1="48" x2="50" y2="78" stroke-width="5" /><circle cx="38" cy="65" r="3" fill="currentColor" /><circle cx="62" cy="65" r="3" fill="currentColor" />'),
      notes: "Altar '示' sheltered beneath the temple roof '宀'."
    },
    funFact: "The '宗' temple was the spiritual heart of the royal clan, where dynastic treaties and coronation decrees were ratified."
  },
  {
    id: "char_zu_ancestor",
    modern: "祖",
    pinyin: "zǔ",
    category: "human",
    difficulty: "medium",
    categoryName: { en: "Human & Life", zh: "人体生活" },
    meaning: { en: "Ancestor", zh: "祖先 / 烈祖" },
    description: "An upright carved phallic totem or consecrated stone spirit tablet embodying the lineage of ancestral fathers.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 40 22 C 40 15, 60 15, 60 22 L 60 75 L 40 75 Z" stroke-width="5" /><line x1="30" y1="75" x2="70" y2="75" stroke-width="5.5" /><line x1="40" y1="45" x2="60" y2="45" stroke-width="4" />'),
      notes: "A carved wooden or stone ancestral tablet (神主牌位)."
    },
    funFact: "Shang kings viewed their ancestors not as distant memory, but as active deities controlling rain, victory, and health."
  },
  {
    id: "char_di_god",
    modern: "帝",
    pinyin: "dì",
    category: "human",
    difficulty: "hard",
    categoryName: { en: "Human & Life", zh: "人体生活" },
    meaning: { en: "High Sovereign / Shangdi", zh: "上帝 / 天帝" },
    description: "Carefully bundled sacrificial firewood logs bound with cords, prepared for a burnt offering directly to Heaven.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="30" y1="22" x2="70" y2="22" stroke-width="5" /><line x1="50" y1="22" x2="50" y2="82" stroke-width="5.5" /><path d="M 32 45 L 68 45 M 25 60 L 75 60" stroke-width="5" /><path d="M 32 45 L 25 82 M 68 45 L 75 82" stroke-width="4.5" />'),
      notes: "The burnt altar wood sending smoke to the High God."
    },
    funFact: "'帝' (Shangdi) was the supreme cosmic ruler of the Shang pantheon who held power over storms and foreign armies."
  },
  {
    id: "char_gui_ghost",
    modern: "鬼",
    pinyin: "guǐ",
    category: "human",
    difficulty: "medium",
    categoryName: { en: "Human & Life", zh: "人体生活" },
    meaning: { en: "Spirit / Ghost", zh: "鬼魂 / 鬼神" },
    description: "A human figure donning an eerie, monstrous ritual mask with curling horns and a supernatural presence.",
    oracle_bone: {
      svg: createOracleSvg('<circle cx="50" cy="30" r="16" stroke-width="5" /><circle cx="44" cy="28" r="3" fill="currentColor" /><circle cx="56" cy="28" r="3" fill="currentColor" /><path d="M 50 46 L 50 68 C 50 82, 35 82, 35 72 M 50 60 L 68 82" stroke-width="5" />'),
      notes: "An oversized terrifying mask over a human body."
    },
    funFact: "In ancient belief, while benevolent spirits of ancestors were worshipped, wandering ghosts (鬼) were appeased with apotropaic rites."
  }
];
