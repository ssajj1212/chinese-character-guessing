# Oracle Bone Script Guessing Game (甲骨文猜字识古) — Design Specification

## 1. Overview & Vision
The **Oracle Bone Script Guessing Game (甲骨文猜字识古)** is an engaging, gamified educational web application where players explore the origins of Chinese writing. Players are presented with ancient Oracle Bone Script glyphs (甲骨文, Shang dynasty ~1200 BCE) alongside their modern simplified Chinese characters (简体字), and guess their meanings from bilingual options (English & Chinese). Upon answering, players discover the character's Pinyin, historical script evolution across four major eras (Oracle Bone ➔ Bronze ➔ Small Seal ➔ Regular/Modern), and the pictographic origin story behind the character.

Players advance through Scholar Ranks, build combo score multipliers, and unlock discovered characters into a permanent Ancient Artifact Codex (museum gallery).

---

## 2. Technical Stack & Architecture

### 2.1 Technology Stack
- **Bundler & Dev Server**: Vite (lightweight, rapid HMR, non-blocking zero-overhead build).
- **Core Logic**: Vanilla ES Modules (`import`/`export`), structured into clear single-responsibility modules.
- **Styling**: Modern Vanilla CSS with CSS Custom Properties, flexbox/grid, CSS animations, and high-performance hardware-accelerated transforms. No heavyweight CSS frameworks.
- **Audio**: Web Audio API for synthetic, authentic bronze bell chimes and feedback tones (no external audio file dependencies or network latency).
- **Persistence**: Browser `localStorage` for progress, unlocked characters, high scores, and scholar ranks.
- **Data Pipeline**: Node.js automated scraper (`scripts/scrape_wikipedia.js`) to extract Oracle Bone script SVGs, character meanings, pinyin, and evolution stages from Wikipedia / Wikimedia Commons into a static, offline-ready JSON database.

### 2.2 Directory Structure
```
chinese_character_guessing/
├── data/
│   ├── characters.json              # Bundled offline database with full metadata
│   └── glyphs/                      # High-resolution SVGs for Oracle Bone, Bronze, Seal scripts
├── docs/
│   └── superpowers/
│       └── specs/
│           └── 2026-10-16-oracle-bone-script-guessing-design.md
├── scripts/
│   └── scrape_wikipedia.js          # Scrapes Wikipedia/Wikimedia for glyphs & metadata
├── src/
│   ├── assets/                      # Textures, background motifs, icons
│   │   ├── textures/
│   │   └── icons/
│   ├── css/
│   │   ├── variables.css            # Ancient color palette tokens (parchment, cinnabar, bronze)
│   │   ├── base.css                 # Typography, resets, scrollbars
│   │   ├── game.css                 # Question arena, glyph rubbing card, choice buttons
│   │   ├── reveal.css               # Post-answer evolution modal / drawer
│   │   ├── codex.css                # Ancient Museum gallery & artifact viewer
│   │   └── animations.css           # Streak flames, flip effects, bell chime ripples
│   ├── js/
│   │   ├── main.js                  # App bootstrap and view router (Quiz vs. Codex)
│   │   ├── engine.js                # Quiz generator, distractor selector, timer
│   │   ├── state.js                 # Central reactive state (score, streak, XP, level)
│   │   ├── storage.js               # LocalStorage read/write & synchronization
│   │   ├── audio.js                 # Web Audio API chime & sound synthesizer
│   │   └── codex.js                 # Museum collection renderer and modal viewer
│   └── index.html                   # Semantic HTML5 entry page
├── package.json
└── vite.config.js
```

---

## 3. Data Pipeline & Character Schema

### 3.1 Data Sourcing
The data engine harvests 50+ classic pictographic characters (象形字) from:
- Wikimedia Commons: `Category:Oracle_bone_script_characters` and related SVG glyph repositories.
- Wikipedia & Wiktionary: Chinese character etymology tables, character evolution timelines (甲骨文, 金文, 小篆, 楷体), definitions, and Pinyin.
- The pipeline organizes characters into 5 distinct thematic categories:
  1. **Nature & Elements (自然天象)**: 日 (sun), 月 (moon), 水 (water), 火 (fire), 山 (mountain), 雨 (rain), 石 (stone), 川 (river).
  2. **Animals & Creatures (飞禽走兽)**: 牛 (ox), 羊 (sheep), 马 (horse), 鸟 (bird), 鱼 (fish), 虎 (tiger), 龟 (turtle), 鹿 (deer).
  3. **Human & Body (人体形貌)**: 人 (person), 目 (eye), 口 (mouth), 耳 (ear), 手 (hand), 足 (foot), 子 (child), 首 (head).
  4. **Plants & Earth (植物原野)**: 木 (tree/wood), 草 (grass), 禾 (grain), 竹 (bamboo), 田 (field).
  5. **Tools & Civilization (器物生息)**: 门 (door/gate), 车 (chariot), 舟 (boat), 刀 (knife), 矢 (arrow), 弓 (bow).

### 3.2 Dataset Schema (`characters.json`)
```json
{
  "id": "char_ri",
  "modern": "日",
  "pinyin": "rì",
  "category": "nature",
  "categoryName": { "en": "Nature", "zh": "自然天象" },
  "meaning": {
    "en": "Sun / Day",
    "zh": "太阳 / 日子"
  },
  "description": "An ancient pictograph depicting the sun as a circle or diamond with a central spot or line representing radiant energy.",
  "oracle_bone": {
    "svg": "<svg ...>...</svg>",
    "source": "Wikimedia Commons",
    "historicalNotes": "Discovered on turtle plastrons from Anyang, Yinxu."
  },
  "evolution": [
    { "era": "商代 (~1200 BCE)", "stage": "甲骨文 (Oracle Bone)", "glyph": "svg_or_char" },
    { "era": "周代 (~1000 BCE)", "stage": "金文 (Bronze Script)", "glyph": "svg_or_char" },
    { "era": "秦代 (~220 BCE)", "stage": "小篆 (Seal Script)", "glyph": "svg_or_char" },
    { "era": "汉代至今 (Modern)", "stage": "楷体 (Regular Script)", "glyph": "日" }
  ],
  "funFact": "The dot inside '日' was carved to indicate that it is a solid celestial body emitting light, preventing confusion with an empty circle."
}
```

---

## 4. Game Engine & Core Mechanics

### 4.1 Question Generation & Intelligent Distractors
- Each round selects an unmastered character from the database (prioritizing locked/unviewed characters).
- 4 multiple-choice options are presented:
  - 1 correct bilingual answer (e.g. `Sun / Day (太阳、日子)`).
  - 3 intelligent distractor options drawn from the same or related semantic category (e.g., `Moon / Month`, `Fire / Flame`, `Mountain / Peak`) to ensure meaningful pedagogical challenge rather than obvious random mismatches.
- Options are shuffled randomly on each turn.

### 4.2 Scoring & Streak Multipliers
- **Base Score**: 100 points per correct guess.
- **Speed Bonus**: A 15-second countdown timer grants up to +50 bonus points based on remaining time.
- **Combo Streak**:
  - Consecutive correct answers build the combo streak.
  - Multiplier thresholds:
    - 1-2 streak: 1.0x
    - 3-4 streak: 1.5x
    - 5-7 streak: 2.0x
    - 8+ streak: 3.0x (Flaming Oracle Bone mode)
- Incorrect answer resets the current streak to 0, but never penalizes existing total score or unlocked collection items.

### 4.3 Answer Reveal Card & Etymology Modal
Immediately after answering:
1. **Interactive Timeline**: Visual cards illustrating the transformation from Oracle Bone ➔ Bronze ➔ Seal ➔ Modern Regular script.
2. **Pronunciation**: Pinyin displayed with audio pronunciation feedback.
3. **Mnemonic Explanation**: Explains how the ancient drawing reflects human observation 3,000 years ago.
4. **Action**: "Next Inscription (下一题)" button to proceed.

---

## 5. Gamification & Progression

### 5.1 Scholar Level Progression
Players gain XP from score earned. Reaching XP thresholds unlocks prestigious archaeological titles:

| Level | Title (Chinese) | Title (English) | Required XP | Badge / Reward |
|-------|-----------------|-----------------|-------------|----------------|
| 1 | 见习考订生 | Novice Excavator | 0 XP | Stone Chisel |
| 2 | 卜辞抄写手 | Inscription Scribe | 400 XP | Bamboo Brush |
| 3 | 殷墟识字郎 | Yin Ruins Cryptographer | 1,000 XP | Bronze Dagger-Axe |
| 4 | 商周大贞人 | Shang Royal Diviner | 2,000 XP | Sacred Turtle Shell |
| 5 | 华夏文史大学士 | Grand Imperial Historian | 3,500 XP | Golden Oracle Tablet |

A dynamic XP bar displays progress toward the next title, triggering an ancient banner celebration upon promotion.

### 5.2 Ancient Codex (Museum Collection)
- **Status Tracking**: Tracks total unlocked characters (e.g. `24 / 50 Unlocked - 48% Completed`).
- **Interactive Exhibit**:
  - Filter by category (Nature, Animals, Body, Plants, Tools).
  - Filter by status (All, Unlocked, Undiscovered).
  - Clicking any unlocked tile displays the full archaeological report, SVG vector glyphs, and evolution timeline.

---

## 6. UI/UX & Visual Design System

### 6.1 Theme & Aesthetics
- **Style Concept**: "Ancient Imperial Inscription Archive & Oracle Bone Rubbing".
- **Color Palette**:
  - **Background Base**: Deep obsidian rubbing stone (`#141416`) with subtle parchment stone texture.
  - **Surface Cards**: Layered warm bone parchment (`#1f1e24` and `#2a2832`) with frosted glassmorphism borders (`rgba(212, 175, 55, 0.2)`).
  - **Primary Accent**: Cinnabar vermilion red (`#d13b2e`) reminiscent of traditional Chinese seal paste (印泥).
  - **Secondary Accent**: Imperial aged gold / bronze (`#d4af37` and `#e6ca65`).
  - **Text Colors**: Ivory silk (`#f5f0e6`) for headings, soft mist gray (`#b8b2a7`) for secondary descriptions.
- **Typography**:
  - Chinese characters: Classical serif / Kai-inspired typography (`"Noto Serif SC"`, `"Songti SC"`, serif).
  - English & Numbers: Elegant modern grotesque (`"Inter"`, system-ui).

### 6.2 Micro-Interactions & Audio
- **Audio Feedback (Web Audio API)**:
  - Correct answer: Resonant 3-tone bronze bell chime (simulated ancient chime bells / 编钟).
  - Wrong answer: Soft low wooden drum tap (木鱼/木柝).
  - Level Up: Flourishing pentatonic chime progression.
  - Mute toggle in the top bar.
- **Animations**:
  - Smooth card flip when transitioning from question to answer reveal.
  - Glowing flame aura when on a 3x streak.
  - Ink splash particle effect on correct answers.

---

## 7. State Management & Storage

### 7.1 LocalStorage Schema
Stored under key `oracle_bone_game_data_v1`:
```json
{
  "totalScore": 1450,
  "highScore": 2300,
  "xp": 1450,
  "level": 3,
  "highestStreak": 7,
  "unlockedCharacters": ["char_ri", "char_yue", "char_shan"],
  "soundEnabled": true,
  "stats": {
    "gamesPlayed": 18,
    "correctAnswers": 15,
    "accuracy": 83.3
  }
}
```

---

## 8. Verification & Quality Assurance Strategy
1. **Scraper Validation**: Verify that the scraper generates well-formed SVG glyphs, valid Unicode characters, non-empty definitions, and correct historical evolutions.
2. **Zero-Error Console**: Application loads without runtime warnings or unhandled exceptions.
3. **Gameplay Loop Testing**: Verify that clicking answers records score, adjusts streak, updates XP, triggers audio, and unlocks items in the Codex.
4. **Responsive Layout Check**: Test at desktop (1440x900) and mobile viewports (390x844 iPhone) to verify flex/grid layout adaptability.
5. **Persistence Check**: Refreshing the browser preserves player XP, rank, and unlocked Codex collection.
