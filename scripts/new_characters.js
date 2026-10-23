/**
 * Additional Intermediate & Advanced Oracle Bone Characters
 * Expands dataset with composite ideographs (会意字) and ritual/abstract characters.
 */

export function createOracleSvg(paths, viewBox = "0 0 100 100") {
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

export const NEW_CHARACTERS = [
  // === INTERMEDIATE (MEDIUM) ===
  {
    id: "char_xiu",
    modern: "休",
    pinyin: "xiū",
    category: "human",
    difficulty: "medium",
    categoryName: { en: "Human & Life", zh: "人体生活" },
    meaning: { en: "Rest / Cease", zh: "休息 / 止息" },
    description: "A famous composite ideograph (会意字) showing a human (人) leaning under the protective shade of a tree (木) to rest after hard labor.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 32 30 C 32 30, 24 45, 24 75 M 32 46 C 36 60, 44 75, 44 75" /><line x1="68" y1="20" x2="68" y2="82" stroke-width="5" /><path d="M 52 42 Q 68 50, 84 42 M 52 75 Q 68 65, 84 75" />'),
      notes: "The person reclines against the tree trunk, perfectly visualizing respite."
    },
    funFact: "In ancient Shang agricultural life, resting under trees was a vital respite during the scorching midday heat."
  },
  {
    id: "char_ming_bird",
    modern: "鸣",
    pinyin: "míng",
    category: "animals",
    difficulty: "medium",
    categoryName: { en: "Animals & Beasts", zh: "飞禽走兽" },
    meaning: { en: "Chirp / Bird Call", zh: "鸣叫 / 禽啼" },
    description: "Combines an open crying mouth (口) with a perched bird (鸟), visually capturing the call or alarm cry of birds.",
    oracle_bone: {
      svg: createOracleSvg('<rect x="18" y="32" width="18" height="22" rx="4" /><path d="M 60 22 C 60 16, 72 16, 72 24 C 72 32, 60 36, 60 48 L 60 76 M 60 32 L 84 32 C 84 50, 72 65, 60 65 M 68 76 L 68 84" />'),
      notes: "The mouth is deliberately placed in front of the bird's beak."
    },
    funFact: "Birds crying out or fleeing trees were recorded by Shang diviners as omens regarding approaching rain storms."
  },
  {
    id: "char_she_wade",
    modern: "涉",
    pinyin: "shè",
    category: "nature",
    difficulty: "medium",
    categoryName: { en: "Nature & Cosmos", zh: "自然天象" },
    meaning: { en: "Wade / Cross Stream", zh: "涉水 / 趟河" },
    description: "Features two human footprints (止) striding directly through ripples of flowing river water (水), showing a river crossing.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 50 18 Q 44 48, 50 82 M 40 28 Q 36 50, 40 72 M 60 28 Q 64 50, 60 72" stroke-width="4.5" /><path d="M 22 36 L 22 55 M 22 45 L 30 40 M 76 50 L 76 70 M 76 60 L 68 55" />'),
      notes: "Footprints flanking both sides of the stream."
    },
    funFact: "Without bridges over the Huan River at Anyang, Shang royal armies regularly waded across shallow shoals."
  },
  {
    id: "char_zhu_chase",
    modern: "逐",
    pinyin: "zhú",
    category: "animals",
    difficulty: "medium",
    categoryName: { en: "Animals & Beasts", zh: "飞禽走兽" },
    meaning: { en: "Pursue / Chase", zh: "追逐 / 围猎" },
    description: "Depicts a running foot (止) chasing right behind a fleeing wild boar (豕), representing active tracking of game during royal hunts.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 30 25 L 30 48 M 30 36 L 40 30" /><path d="M 55 45 C 55 35, 75 35, 78 45 C 78 65, 68 75, 55 75 L 55 45 M 78 48 L 88 45 M 60 75 L 60 85 M 72 75 L 72 85" stroke-width="5" />'),
      notes: "The hunter's foot pursues the wild pig."
    },
    funFact: "King Wu Ding's hunting divination bones extensively record 逐 in campaigns bagging boars, deer, and wild oxen."
  },
  {
    id: "char_she_shoot",
    modern: "射",
    pinyin: "shè",
    category: "tools",
    difficulty: "medium",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Shoot / Archery", zh: "射箭 / 发射" },
    description: "Depicts an arrow (矢) notched onto a drawn composite bow (弓) and drawn by a steady hand (又).",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 34 22 C 18 36, 18 64, 34 78" /><line x1="24" y1="50" x2="72" y2="50" stroke-width="5" /><path d="M 64 42 L 74 50 L 64 58" /><path d="M 60 62 L 68 72 M 60 72 L 72 62" stroke-width="4.5" />'),
      notes: "The dynamic tension of the drawn bowstring is clearly visible."
    },
    funFact: "Archery was the preeminent military skill of the Shang warrior nobility, vital for hunting and territorial defense."
  },
  {
    id: "char_lao_pen",
    modern: "牢",
    pinyin: "láo",
    category: "animals",
    difficulty: "medium",
    categoryName: { en: "Animals & Beasts", zh: "飞禽走兽" },
    meaning: { en: "Enclosure / Animal Pen", zh: "牛牢 / 圈养" },
    description: "Shows an ox with curved horns (牛) safely contained inside an enclosed wooden corral or stable (宀).",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 22 80 L 22 28 L 78 28 L 78 80" stroke-width="5" /><path d="M 40 44 C 40 38, 50 38, 50 50 M 60 44 C 60 38, 50 38, 50 50 M 50 50 L 50 72" stroke-width="4.5" />'),
      notes: "An ox protected inside stockade fencing."
    },
    funFact: "The Shang court maintained massive sacrificial livestock pens (Tai-lao 太牢 and Shao-lao 少牢) for state divinations."
  },
  {
    id: "char_long_dragon",
    modern: "龙",
    pinyin: "lóng",
    category: "animals",
    difficulty: "medium",
    categoryName: { en: "Animals & Beasts", zh: "飞禽走兽" },
    meaning: { en: "Dragon / Divine Serpent", zh: "神龙 / 龙王" },
    description: "An awe-inspiring Shang depiction of the mythical dragon with gaping jaws, antler-like horns, and a winding serpentine scaly body.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 42 22 L 42 32 M 36 26 L 48 26" /><path d="M 32 36 C 32 28, 50 28, 55 36 C 60 45, 45 52, 45 60 C 45 74, 70 74, 75 62" stroke-width="5" /><circle cx="38" cy="38" r="3" fill="currentColor" />'),
      notes: "The horned head and coiled tail define the classic Shang dragon motif."
    },
    funFact: "Jade coiled dragons excavated from Fu Hao's tomb at Anyang match this exact Oracle Bone script form."
  },
  {
    id: "char_feng_phoenix",
    modern: "凤",
    pinyin: "fèng",
    category: "animals",
    difficulty: "medium",
    categoryName: { en: "Animals & Beasts", zh: "飞禽走兽" },
    meaning: { en: "Phoenix / Divine Bird", zh: "神凤 / 凤凰" },
    description: "Depicts the mythical solar bird crowned with an ornamental crest atop its head, graceful body, and long flowing tail feathers.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 50 16 L 50 24 M 44 20 L 56 20" /><path d="M 50 28 C 42 34, 42 46, 50 52 C 58 58, 58 70, 50 82" stroke-width="5" /><path d="M 50 36 C 65 36, 75 48, 75 60 C 75 75, 62 82, 50 82" />'),
      notes: "Distinguished from regular birds by its regal head crest."
    },
    funFact: "In Shang divination theology, the Phoenix was the divine messenger associated with the warm South Wind."
  },
  {
    id: "char_yan_swallow",
    modern: "燕",
    pinyin: "yàn",
    category: "animals",
    difficulty: "medium",
    categoryName: { en: "Animals & Beasts", zh: "飞禽走兽" },
    meaning: { en: "Swallow Bird", zh: "燕子 / 春燕" },
    description: "Captures the distinctive silhouette of a swallow: spread pointed wings, round body, and bifurcated scissor-like tail.",
    oracle_bone: {
      svg: createOracleSvg('<circle cx="50" cy="24" r="8" /><path d="M 18 44 C 32 40, 50 44, 50 44 C 50 44, 68 40, 82 44" stroke-width="5" /><ellipse cx="50" cy="54" rx="10" ry="14" /><path d="M 44 68 L 32 85 M 56 68 L 68 85" stroke-width="5" />'),
      notes: "The scissor-tail makes the swallow instantly identifiable."
    },
    funFact: "Shang royal mythology traces their ancestral origin to the mythical black swallow (天命玄鸟，降而生商)."
  },
  {
    id: "char_guan_wash",
    modern: "盥",
    pinyin: "guàn",
    category: "human",
    difficulty: "medium",
    categoryName: { en: "Human & Life", zh: "人体生活" },
    meaning: { en: "Wash Hands / Ritual Cleansing", zh: "盥洗 / 净手" },
    description: "Shows two hands washing over a ceremonial basin, letting pure water droplets cleanse the body before sacred temple rites.",
    oracle_bone: {
      svg: createOracleSvg('<ellipse cx="50" cy="68" rx="34" ry="12" /><path d="M 32 30 L 32 48 M 26 38 L 32 44 M 68 30 L 68 48 M 74 38 L 68 44" stroke-width="4.5" /><circle cx="50" cy="42" r="3" fill="currentColor" /><circle cx="50" cy="52" r="3" fill="currentColor" />'),
      notes: "Two hands rinsing over an oval washbasin."
    },
    funFact: "Ritual purity was mandatory before handling sacred bones; ornate bronze basins (盘) were cast specifically for this duty."
  },

  // === MASTER (HARD) ===
  {
    id: "char_jue_vessel",
    modern: "爵",
    pinyin: "jué",
    category: "tools",
    difficulty: "hard",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Ritual Wine Vessel", zh: "爵杯 / 青铜爵" },
    description: "The definitive Shang bronze libation vessel: features a long pouring spout, tail, two column posts on the rim, and three splayed legs.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 28 28 L 28 44 C 28 54, 72 54, 72 44 L 72 28" /><line x1="38" y1="28" x2="38" y2="18" stroke-width="5" /><line x1="62" y1="28" x2="62" y2="18" stroke-width="5" /><path d="M 34 52 L 24 82 M 50 54 L 50 82 M 66 52 L 76 82" stroke-width="5" />'),
      notes: "Spout, rim posts, and tripod legs replicate bronze casting."
    },
    funFact: "Used by Shang kings to warm and pour aromatic herbal wine as an offering to supreme deity Di (帝)."
  },
  {
    id: "char_li_cauldron",
    modern: "鬲",
    pinyin: "lì",
    category: "tools",
    difficulty: "hard",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Hollow-Legged Tripod", zh: "陶鬲 / 鬲鼎" },
    description: "An archaic cooking vessel with three bulbous hollow legs that maximized surface contact with hot fire coals.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="26" y1="26" x2="74" y2="26" stroke-width="6" /><path d="M 32 26 C 24 50, 24 65, 30 82 C 38 82, 42 65, 50 56 C 58 65, 62 82, 70 82 C 76 65, 76 50, 68 26" stroke-width="5" />'),
      notes: "The three hollow udder-like feet are the key identifying trait."
    },
    funFact: "The hollow legs of the 鬲 were a brilliant prehistoric thermal engineering innovation in Chinese pottery."
  },
  {
    id: "char_fa_strike",
    modern: "伐",
    pinyin: "fá",
    category: "tools",
    difficulty: "hard",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Slay / Strike with Halberd", zh: "征伐 / 砍斫" },
    description: "Combines a human captive (人) with a dagger-axe halberd (戈) aimed at the neck, depicting punitive military expeditions.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 32 26 C 32 26, 26 45, 26 78 M 32 44 C 38 58, 44 78, 44 78" /><circle cx="32" cy="22" r="6" /><path d="M 72 22 L 72 82 M 42 36 L 72 36 M 52 48 L 72 48" stroke-width="5" />'),
      notes: "Halberd blade positioned at the human neck."
    },
    funFact: "Frequently inscribed on oracle bones detailing military expeditions (伐羌) against hostile western frontier tribes."
  },
  {
    id: "char_si_sacrifice",
    modern: "祀",
    pinyin: "sì",
    category: "human",
    difficulty: "hard",
    categoryName: { en: "Human & Life", zh: "人体生活" },
    meaning: { en: "Sacrificial Rite / Annual Cycle", zh: "祭祀 / 岁祀" },
    description: "Shows a spirit ancestral altar (示) beside a devout kneeling worshipper (巳), the root of ancestral veneration.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="24" y1="24" x2="52" y2="24" stroke-width="5" /><line x1="38" y1="24" x2="38" y2="78" stroke-width="5" /><path d="M 28 45 L 38 52 L 48 45" /><path d="M 68 32 C 68 24, 80 24, 80 36 C 80 52, 64 60, 64 78 L 84 78" stroke-width="5" />'),
      notes: "The altar table receives worship from the figure."
    },
    funFact: "In the late Shang, 祀 also denoted a complete liturgical calendar year, serving as regnal dating."
  },
  {
    id: "char_qi_notch",
    modern: "契",
    pinyin: "qì",
    category: "tools",
    difficulty: "hard",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Carve / Divination Notch", zh: "刻契 / 契约" },
    description: "Depicts an incising knife scoring record-keeping tallies or divination grooving notches into wooden or bone slats.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="28" y1="24" x2="28" y2="58" /><line x1="20" y1="34" x2="36" y2="34" /><line x1="20" y1="46" x2="36" y2="46" /><path d="M 58 20 L 58 78 C 58 84, 72 84, 72 78 L 72 20" stroke-width="5" />'),
      notes: "Notched tally slat alongside the carving blade."
    },
    funFact: "Before pyromancy, diviners chiseled hollow grooves (契) into the reverse of turtle shells to guide cracking."
  },
  {
    id: "char_mo_dusk",
    modern: "莫",
    pinyin: "mò",
    category: "nature",
    difficulty: "hard",
    categoryName: { en: "Nature & Cosmos", zh: "自然天象" },
    meaning: { en: "Dusk / Sunset in Grass", zh: "日落 / 暮色" },
    description: "Original character for 暮 (dusk): depicts the solar disc (日) setting low beneath tall grassland thickets (艸).",
    oracle_bone: {
      svg: createOracleSvg('<circle cx="50" cy="50" r="16" /><line x1="42" y1="50" x2="58" y2="50" stroke-width="4" /><path d="M 28 22 L 28 36 M 22 28 L 34 28 M 72 22 L 72 36 M 66 28 L 78 28" stroke-width="4.5" /><path d="M 28 66 L 28 80 M 22 72 L 34 72 M 72 66 L 72 80 M 66 72 L 78 72" stroke-width="4.5" />'),
      notes: "The sun is surrounded by grass clumps above and below."
    },
    funFact: "Shang day-reckoning split daylight into segments; 莫 marked the dim dusk hour when court divinations ceased."
  },
  {
    id: "char_dou_ladle",
    modern: "斗",
    pinyin: "dǒu",
    category: "tools",
    difficulty: "hard",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Ladle / Dipper / Measure", zh: "量斗 / 北斗" },
    description: "Depicts a deep grain scoop with an elongated pouring handle, which inspired the name for the Big Dipper constellation.",
    oracle_bone: {
      svg: createOracleSvg('<rect x="22" y="24" width="34" height="28" rx="4" stroke-width="5" /><line x1="56" y1="52" x2="84" y2="80" stroke-width="6" /><line x1="84" y1="80" x2="88" y2="76" stroke-width="5" />'),
      notes: "The bowl and angled handle formed the standard grain scoop."
    },
    funFact: "Shang astronomers mapped the North Star and Ursa Major ladle to align royal palace architecture to true north."
  },
  {
    id: "char_ren_blade",
    modern: "刃",
    pinyin: "rèn",
    category: "tools",
    difficulty: "hard",
    categoryName: { en: "Tools & Objects", zh: "器物礼器" },
    meaning: { en: "Blade Edge", zh: "刀刃 / 锋芒" },
    description: "An indicative symbol (指事字): draws a sharp curved knife (刀) with a prominent dot accentuating its razor cutting edge.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 44 18 L 44 50 C 44 70, 28 82, 28 82 L 52 82 C 64 70, 64 50, 64 18 Z" stroke-width="5" /><circle cx="34" cy="50" r="5" fill="currentColor" />'),
      notes: "The dot highlights the sharp cutting edge of the knife."
    },
    funFact: "Shang bronze knives discovered at Yinxu show high tin alloy ratios specifically along the edge for razor sharpness."
  },
  {
    id: "char_ben_root",
    modern: "本",
    pinyin: "běn",
    category: "plants",
    difficulty: "hard",
    categoryName: { en: "Plants & Flora", zh: "植物花草" },
    meaning: { en: "Root / Origin", zh: "树根 / 根本" },
    description: "An indicative character: shows a tree (木) with an added horizontal stroke marking the subterranean base roots.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="50" y1="16" x2="50" y2="84" stroke-width="5" /><path d="M 22 38 Q 50 48, 78 38 M 22 74 Q 50 62, 78 74" /><line x1="32" y1="84" x2="68" y2="84" stroke-width="6" stroke="#ffb703" />'),
      notes: "The bottom bar emphasizes the underground root network."
    },
    funFact: "The metaphor from physical tree root to philosophical 'origin' dates back to early Shang and Zhou thought."
  },
  {
    id: "char_mo_tip",
    modern: "末",
    pinyin: "mò",
    category: "plants",
    difficulty: "hard",
    categoryName: { en: "Plants & Flora", zh: "植物花草" },
    meaning: { en: "Treetop / End / Tip", zh: "树梢 / 末梢" },
    description: "Contrasting with 本: draws a tree with a prominent horizontal bar placed across the highest branches, denoting the tip.",
    oracle_bone: {
      svg: createOracleSvg('<line x1="50" y1="18" x2="50" y2="84" stroke-width="5" /><path d="M 24 44 Q 50 52, 76 44 M 24 76 Q 50 64, 76 76" /><line x1="20" y1="20" x2="80" y2="20" stroke-width="6" stroke="#ffb703" />'),
      notes: "The top bar points to the summit of the canopy."
    },
    funFact: "Paired with 本 to form the classical phrase 本末 (origins and endings, essentials and incidentals)."
  },
  {
    id: "char_gan_sweet",
    modern: "甘",
    pinyin: "gān",
    category: "human",
    difficulty: "hard",
    categoryName: { en: "Human & Life", zh: "人体生活" },
    meaning: { en: "Sweet / Delicious", zh: "甘甜 / 美味" },
    description: "An indicative ideograph depicting an open mouth (口) with a delectable food morsel held inside the lips, signifying sweetness.",
    oracle_bone: {
      svg: createOracleSvg('<path d="M 26 34 C 26 34, 50 22, 74 34 C 74 60, 62 76, 50 80 C 38 76, 26 60, 26 34 Z" stroke-width="5" /><line x1="36" y1="48" x2="64" y2="48" stroke-width="6" stroke="#ffb703" />'),
      notes: "A mouth holding a tasty sweet object."
    },
    funFact: "Shang royal banquets featured wild honey and sweet fermented millet wine, praised as pleasant to ancestral spirits."
  }
];

// Difficulty assignments for original 51 characters
export const EXISTING_DIFFICULTIES = {
  char_ri: "easy",
  char_yue: "easy",
  char_shui: "easy",
  char_huo: "easy",
  char_shan: "easy",
  char_chuan: "easy",
  char_yu_rain: "easy",
  char_shi_stone: "easy",
  char_tu_earth: "easy",
  char_niu: "easy",
  char_yang: "easy",
  char_ma: "easy",
  char_yu_fish: "easy",
  char_niao: "easy",
  char_ren: "easy",
  char_mu_eye: "easy",
  char_kou: "easy",
  char_er: "easy",
  char_shou: "easy",
  char_mu_wood: "easy",
  char_men: "easy",
  char_dao: "easy",
  char_gong: "easy",
  char_wang: "easy",
  char_san: "easy",
  char_hu: "medium",
  char_lu: "medium",
  char_gui: "medium",
  char_quan: "medium",
  char_shi_pig: "medium",
  char_xiang: "medium",
  char_zi: "medium",
  char_nv: "medium",
  char_xin: "medium",
  char_da: "medium",
  char_shou_head: "medium",
  char_zu: "medium",
  char_tian: "medium",
  char_he: "medium",
  char_zhu: "medium",
  char_lin: "medium",
  char_cai: "medium",
  char_ming: "medium",
  char_che: "medium",
  char_zhou: "medium",
  char_shi_arrow: "medium",
  char_hu_pot: "medium",
  char_ge: "medium",
  char_lei: "medium",
  char_gu: "medium",
  char_ding: "hard"
};
