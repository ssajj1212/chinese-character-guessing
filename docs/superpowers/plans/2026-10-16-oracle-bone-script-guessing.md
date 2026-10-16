# Oracle Bone Script Guessing Game Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a gamified web application for guessing ancient Chinese characters from Oracle Bone Script (甲骨文) and simplified Chinese, featuring Wikipedia/Wikimedia character data, bilingual definitions, historical evolution timelines, scholar ranks, combo streaks, and a permanent artifact codex.

**Architecture:** Vite-powered modern client with Vanilla ES Modules and custom CSS design system. A Node.js scraper script compiles Oracle bone vector glyphs and etymology from Wikipedia/Wikimedia Commons into a self-contained offline dataset. Centralized reactive state drives the Quiz Engine, Web Audio chime synthesizer, and Museum Codex gallery, persisted via LocalStorage.

**Tech Stack:** Node.js, Vite, Vanilla JavaScript (ES2022), Modern Vanilla CSS, Web Audio API, Vitest (for TDD).

## Global Constraints
- Target workspace: `/Users/cshuangs/fun_projects/chinese_character_guessing`.
- No Tailwind CSS; use Vanilla CSS with CSS custom properties and responsive flex/grid.
- 100% offline-playable runtime once bundled (all character data, SVG glyphs, and audio procedurally synthesized).
- Bilingual options: English & Chinese (e.g. "Sun / Day (太阳、日子)").
- Scholar level progression: 5 titles from 见习考订生 (Novice Excavator) to 华夏文史大学士 (Grand Imperial Historian).

---

### Task 1: Project Scaffolding & Test Environment Setup

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `tests/setup.js`
- Test: `tests/sanity.test.js`

**Interfaces:**
- Produces: Project build toolchain, `npm run test` (Vitest), `npm run dev` (Vite dev server), `npm run build`.

- [ ] **Step 1: Write `package.json` with scripts and dependencies**

```json
{
  "name": "chinese-character-guessing",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest",
    "scrape": "node scripts/scrape_wikipedia.js"
  },
  "devDependencies": {
    "vite": "^5.4.0",
    "vitest": "^2.0.0",
    "jsdom": "^24.1.0"
  }
}
```

- [ ] **Step 2: Create `vite.config.js`**

```javascript
import { defineConfig } from 'vite';

export default defineConfig({
  root: './',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.js']
  }
});
```

- [ ] **Step 3: Create `tests/setup.js`**

```javascript
// Mock window.AudioContext for testing environments without Web Audio
if (typeof window !== 'undefined' && !window.AudioContext) {
  window.AudioContext = class MockAudioContext {
    constructor() {
      this.state = 'running';
      this.currentTime = 0;
    }
    createOscillator() {
      return {
        type: 'sine',
        frequency: { setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} },
        connect: () => {},
        start: () => {},
        stop: () => {}
      };
    }
    createGain() {
      return {
        gain: { setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {}, linearRampToValueAtTime: () => {} },
        connect: () => {}
      };
    }
    resume() {
      return Promise.resolve();
    }
  };
}
```

- [ ] **Step 4: Write failing sanity test in `tests/sanity.test.js`**

```javascript
import { describe, it, expect } from 'vitest';

describe('Project Sanity Test', () => {
  it('should verify test runner environment works', () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 5: Install dependencies and run tests**

Run:
```bash
npm install
npm test
```
Expected: PASS 1 test.

- [ ] **Step 6: Commit**

```bash
git add package.json vite.config.js tests/package-lock.json tests/setup.js tests/sanity.test.js
git commit -m "chore: scaffold project structure with Vite and Vitest"
```

---

### Task 2: Wikipedia/Wikimedia Data Scraper & Curated Offline Dataset

**Files:**
- Create: `scripts/scrape_wikipedia.js`
- Create: `data/characters.json`
- Test: `tests/data_integrity.test.js`

**Interfaces:**
- Produces: `data/characters.json` (array of Character objects with `id`, `modern`, `pinyin`, `category`, `categoryName`, `meaning: { en, zh }`, `description`, `oracle_bone: { svg, notes }`, `evolution: [{ era, stage, glyph }]`, `funFact`).
- Consumes: Wikipedia / Wikimedia Commons API endpoints.

- [ ] **Step 1: Write failing data integrity test in `tests/data_integrity.test.js`**

```javascript
import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Character Dataset Integrity', () => {
  const dataPath = path.resolve(__dirname, '../data/characters.json');

  it('dataset file must exist and contain at least 40 characters', () => {
    expect(fs.existsSync(dataPath)).toBe(true);
    const raw = fs.readFileSync(dataPath, 'utf-8');
    const characters = JSON.parse(raw);
    expect(Array.isArray(characters)).toBe(true);
    expect(characters.length).toBeGreaterThanOrEqual(40);
  });

  it('each character must have valid structure, svg glyph, and bilingual meanings', () => {
    const raw = fs.readFileSync(dataPath, 'utf-8');
    const characters = JSON.parse(raw);

    const categories = new Set();

    for (const char of characters) {
      expect(char.id).toBeDefined();
      expect(char.modern).toBeDefined();
      expect(char.pinyin).toBeDefined();
      expect(char.meaning.en).toBeTruthy();
      expect(char.meaning.zh).toBeTruthy();
      expect(char.oracle_bone.svg).toContain('<svg');
      expect(Array.isArray(char.evolution)).toBe(true);
      expect(char.evolution.length).toBeGreaterThanOrEqual(3);
      categories.add(char.category);
    }

    // Verify broad category diversity (Nature, Animals, Human, Plants, Tools)
    expect(categories.size).toBeGreaterThanOrEqual(4);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test tests/data_integrity.test.js`
Expected: FAIL with `dataset file must exist`.

- [ ] **Step 3: Implement `scripts/scrape_wikipedia.js`**
Write a robust scraper that queries Wikimedia Commons and Wikipedia for Oracle Bone pictographs (including 日, 月, 水, 火, 山, 川, 雨, 木, 田, 人, 目, 口, 耳, 手, 足, 子, 牛, 羊, 马, 鸟, 鱼, 鹿, 虎, 龟, 门, 车, 舟, 刀, 弓, 矢, etc.), extracting their SVG glyphs, evolution stages, pinyin, and explanations. Include curated fallback records to guarantee an instant, high-quality, fully working database even if offline or if network limits are encountered.

- [ ] **Step 4: Execute scraper to populate `data/characters.json`**

Run: `node scripts/scrape_wikipedia.js`
Expected: Successfully generates `data/characters.json` with 50+ rich character records with embedded SVG glyphs and evolution timelines.

- [ ] **Step 5: Run data integrity tests to verify pass**

Run: `npm test tests/data_integrity.test.js`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add scripts/scrape_wikipedia.js data/characters.json tests/data_integrity.test.js
git commit -m "feat: add Wikipedia/Wikimedia character scraper and bundled dataset"
```

---

### Task 3: Procedural Audio Engine (Web Audio API)

**Files:**
- Create: `src/js/audio.js`
- Test: `tests/audio.test.js`

**Interfaces:**
- Produces: `SoundEngine` class with methods:
  - `playCorrect()`: Resonant ancient bronze chime (3 harmonics).
  - `playWrong()`: Subtle wooden temple block tap (percussive decay).
  - `playLevelUp()`: Ascending pentatonic chime fanfare.
  - `toggleMute()` / `isMuted()`: Audio state management.

- [ ] **Step 1: Write failing audio test in `tests/audio.test.js`**

```javascript
import { describe, it, expect, beforeEach } from 'vitest';
import { SoundEngine } from '../src/js/audio.js';

describe('SoundEngine', () => {
  let audio;

  beforeEach(() => {
    audio = new SoundEngine();
  });

  it('initializes in unmuted state', () => {
    expect(audio.isMuted()).toBe(false);
  });

  it('toggles mute state correctly', () => {
    expect(audio.toggleMute()).toBe(true);
    expect(audio.isMuted()).toBe(true);
    expect(audio.toggleMute()).toBe(false);
    expect(audio.isMuted()).toBe(false);
  });

  it('can trigger play methods without crashing', () => {
    expect(() => audio.playCorrect()).not.toThrow();
    expect(() => audio.playWrong()).not.toThrow();
    expect(() => audio.playLevelUp()).not.toThrow();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test tests/audio.test.js`
Expected: FAIL with "Cannot find module '../src/js/audio.js'".

- [ ] **Step 3: Implement `src/js/audio.js`**

```javascript
export class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  _getCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  isMuted() {
    return this.muted;
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  setMuted(val) {
    this.muted = Boolean(val);
  }

  playCorrect() {
    if (this.muted) return;
    const ctx = this._getCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Ancient bronze bell chime simulation: Root frequency + metallic harmonics
    const freqs = [523.25, 784.00, 1046.50]; // C5, G5, C6 (clear chime)
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.2 / (idx + 1), now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 1.2);
    });
  }

  playWrong() {
    if (this.muted) return;
    const ctx = this._getCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Wooden drum tap simulation (木鱼)
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.15);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  }

  playLevelUp() {
    if (this.muted) return;
    const ctx = this._getCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Pentatonic ascending chime (Gong, Shang, Jiao, Zhi, Yu: C, D, E, G, A, high C)
    const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = now + i * 0.1;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.25, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.8);
    });
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test tests/audio.test.js`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/js/audio.js tests/audio.test.js
git commit -m "feat: implement Web Audio procedural bell and chime sound engine"
```

---

### Task 4: State Management & LocalStorage Persistence

**Files:**
- Create: `src/js/storage.js`
- Create: `src/js/state.js`
- Test: `tests/state.test.js`

**Interfaces:**
- Produces: `GameState` class managing:
  - `score`, `highScore`, `streak`, `highestStreak`, `xp`, `level`, `unlockedCharacters` (Set of IDs).
  - Scholar titles: `getLevelInfo(xp)` returning `{ level, titleEn, titleZh, nextXp, progressPercent }`.
  - Event subscription (`subscribe(listener)`).
  - `save()` and `load()` via `StorageService`.

- [ ] **Step 1: Write failing state and storage test in `tests/state.test.js`**

```javascript
import { describe, it, expect, beforeEach } from 'vitest';
import { GameState, SCHOLAR_LEVELS } from '../src/js/state.js';

describe('GameState & Scholar Progression', () => {
  let state;

  beforeEach(() => {
    localStorage.clear();
    state = new GameState();
  });

  it('starts with initial level 1 (见习考订生)', () => {
    const info = state.getLevelInfo();
    expect(info.level).toBe(1);
    expect(info.titleZh).toBe('见习考订生');
    expect(state.score).toBe(0);
    expect(state.streak).toBe(0);
  });

  it('calculates streak multipliers accurately', () => {
    state.setStreak(1);
    expect(state.getMultiplier()).toBe(1.0);
    state.setStreak(4);
    expect(state.getMultiplier()).toBe(1.5);
    state.setStreak(6);
    expect(state.getMultiplier()).toBe(2.0);
    state.setStreak(10);
    expect(state.getMultiplier()).toBe(3.0);
  });

  it('advances scholar levels as XP is gained and emits level-up event', () => {
    let leveledUp = false;
    state.on('levelUp', (lvl) => { leveledUp = true; });

    state.addXp(500); // Exceeds level 2 threshold (400)
    expect(state.level).toBe(2);
    expect(state.getLevelInfo().titleZh).toBe('卜辞抄写手');
    expect(leveledUp).toBe(true);
  });

  it('records unlocked characters in a set and saves to localStorage', () => {
    state.unlockCharacter('char_ri');
    expect(state.isUnlocked('char_ri')).toBe(true);
    expect(state.isUnlocked('char_yue')).toBe(false);

    // Verify persistence across new instance
    const freshState = new GameState();
    expect(freshState.isUnlocked('char_ri')).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test tests/state.test.js`
Expected: FAIL with "Cannot find module '../src/js/state.js'".

- [ ] **Step 3: Implement `src/js/storage.js` and `src/js/state.js`**
Write clean LocalStorage wrapper handling serialization, versioning, error resilience, and reactive GameState event emitter.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test tests/state.test.js`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/js/storage.js src/js/state.js tests/state.test.js
git commit -m "feat: implement game state, scholar rank progression, and storage persistence"
```

---

### Task 5: Quiz Engine & Intelligent Distractor Generator

**Files:**
- Create: `src/js/engine.js`
- Test: `tests/engine.test.js`

**Interfaces:**
- Produces: `QuizEngine` class:
  - `constructor(characters, state)`
  - `nextQuestion()`: Returns `{ currentCharacter, options, timeLeft }` where options contains 1 correct and 3 intelligent distractors with bilingual meanings `{ en, zh, id, isCorrect }`.
  - `submitAnswer(selectedId)`: Evaluates answer, calculates score (`base * multiplier + speedBonus`), records unlocked character, returns `{ correct, scoreEarned, correctOption, evolution, description, pinyin, modern, funFact }`.
  - `getRemainingCharactersCount()`

- [ ] **Step 1: Write failing engine test in `tests/engine.test.js`**

```javascript
import { describe, it, expect, beforeEach } from 'vitest';
import { QuizEngine } from '../src/js/engine.js';
import { GameState } from '../src/js/state.js';

const mockCharacters = [
  {
    id: 'char_ri',
    modern: '日',
    pinyin: 'rì',
    category: 'nature',
    meaning: { en: 'Sun / Day', zh: '太阳 / 日子' },
    oracle_bone: { svg: '<svg></svg>' },
    evolution: []
  },
  {
    id: 'char_yue',
    modern: '月',
    pinyin: 'yuè',
    category: 'nature',
    meaning: { en: 'Moon / Month', zh: '月亮 / 月份' },
    oracle_bone: { svg: '<svg></svg>' },
    evolution: []
  },
  {
    id: 'char_shui',
    modern: '水',
    pinyin: 'shuǐ',
    category: 'nature',
    meaning: { en: 'Water / River', zh: '水流 / 河流' },
    oracle_bone: { svg: '<svg></svg>' },
    evolution: []
  },
  {
    id: 'char_huo',
    modern: '火',
    pinyin: 'huǒ',
    category: 'nature',
    meaning: { en: 'Fire / Flame', zh: '火焰 / 火光' },
    oracle_bone: { svg: '<svg></svg>' },
    evolution: []
  },
  {
    id: 'char_niu',
    modern: '牛',
    pinyin: 'niú',
    category: 'animals',
    meaning: { en: 'Ox / Cow', zh: '牛 / 黄牛' },
    oracle_bone: { svg: '<svg></svg>' },
    evolution: []
  }
];

describe('QuizEngine', () => {
  let state;
  let engine;

  beforeEach(() => {
    localStorage.clear();
    state = new GameState();
    engine = new QuizEngine(mockCharacters, state);
  });

  it('generates a question with 4 unique bilingual options containing exactly 1 correct answer', () => {
    const q = engine.nextQuestion();
    expect(q.options.length).toBe(4);
    const correctOptions = q.options.filter(o => o.isCorrect);
    expect(correctOptions.length).toBe(1);
    expect(correctOptions[0].id).toBe(q.currentCharacter.id);

    // Verify option labels are bilingual
    expect(correctOptions[0].meaningEn).toBeDefined();
    expect(correctOptions[0].meaningZh).toBeDefined();
  });

  it('awards score and updates streak on correct guess', () => {
    const q = engine.nextQuestion();
    const result = engine.submitAnswer(q.currentCharacter.id, 10); // 10s remaining

    expect(result.correct).toBe(true);
    expect(result.scoreEarned).toBeGreaterThan(100);
    expect(state.streak).toBe(1);
    expect(state.isUnlocked(q.currentCharacter.id)).toBe(true);
  });

  it('resets streak on incorrect guess', () => {
    state.setStreak(5);
    const q = engine.nextQuestion();
    const wrongOption = q.options.find(o => !o.isCorrect);
    const result = engine.submitAnswer(wrongOption.id, 10);

    expect(result.correct).toBe(false);
    expect(state.streak).toBe(0);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test tests/engine.test.js`
Expected: FAIL with "Cannot find module '../src/js/engine.js'".

- [ ] **Step 3: Implement `src/js/engine.js`**
Write `QuizEngine` with category-aware distractor sampling, speed bonus scoring formula, question queue prioritization (unlocked vs. locked), and round result packaging.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test tests/engine.test.js`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/js/engine.js tests/engine.test.js
git commit -m "feat: implement quiz engine with intelligent distractors and score calculation"
```

---

### Task 6: Ancient Inscription Visual Design System (CSS & HTML Structure)

**Files:**
- Create: `src/css/variables.css`
- Create: `src/css/base.css`
- Create: `src/css/game.css`
- Create: `src/css/reveal.css`
- Create: `src/css/codex.css`
- Create: `src/css/animations.css`
- Create: `index.html`

**Interfaces:**
- Produces: Visual interface compliant with ancient stone rubbing & bone parchment aesthetic, dark mode obsidian background, cinnabar red accents, golden typography, responsive flex/grid layout, and accessible element IDs.

- [ ] **Step 1: Create `src/css/variables.css`**
Define CSS tokens for color palette (`--bg-primary: #121214`, `--bg-card: #1a1920`, `--parchment-rubbing: #24222d`, `--cinnabar-red: #c93b2b`, `--imperial-gold: #d4af37`, `--bone-white: #f5f0e6`, `--ink-shadow`), transitions, and typography fonts.

- [ ] **Step 2: Create `src/css/base.css`**
Set up typography rules, Noto Serif SC calligraphy headings, container max-widths, flex header with scholar rank bar, XP track, streak flame badge, and mute button.

- [ ] **Step 3: Create `src/css/game.css` & `src/css/animations.css`**
Style question card:
- Ancient Oracle Bone rubbing showcase card with delicate stone texture, high-contrast SVG glyph container, and floating modern character badge.
- 2x2 grid of bilingual choice buttons with hover elevation, cinnabar active states, correct gold flash, and wrong shake animations.
- Countdown bonus timer bar.

- [ ] **Step 4: Create `src/css/reveal.css`**
Style post-answer discovery drawer / modal:
- Evolution stages timeline (Oracle Bone ➔ Bronze ➔ Seal ➔ Modern Regular).
- Pinyin badge with audio pronunciation button.
- Etymology and pictographic explanation parchment box.
- "Next Inscription (下一题)" gold call-to-action button.

- [ ] **Step 5: Create `src/css/codex.css`**
Style Ancient Codex (Museum Gallery):
- Category filter pills (All, Nature, Animals, Human, Plants, Tools).
- Character tiles grid with mystery stone silhouette for locked items and illuminated gold/jade for unlocked items.
- Detail modal with full historical glyph zoom and etymological notes.

- [ ] **Step 6: Create `index.html`**
Write clean semantic HTML with header (Title, Scholar Level bar, Streak indicator, Sound toggle, Codex toggle), main play arena `#game-view`, discovery card `#reveal-modal`, and codex gallery `#codex-view`.

- [ ] **Step 7: Commit**

```bash
git add src/css/ index.html
git commit -m "feat: create ancient stone rubbing design system and HTML layout"
```

---

### Task 7: Game Controller & Interactive Views Integration

**Files:**
- Create: `src/js/codex.js`
- Create: `src/js/main.js`
- Test: `tests/integration.test.js`

**Interfaces:**
- Consumes: `QuizEngine`, `GameState`, `SoundEngine`, `data/characters.json`.
- Produces: Full interactive web application wiring all user events, view switching, audio feedback, reveal transitions, and codex browsing.

- [ ] **Step 1: Write integration test in `tests/integration.test.js`**

```javascript
import { describe, it, expect, beforeEach } from 'vitest';
import { GameState } from '../src/js/state.js';
import { QuizEngine } from '../src/js/engine.js';
import characters from '../data/characters.json';

describe('App Integration Flow', () => {
  let state;
  let engine;

  beforeEach(() => {
    localStorage.clear();
    state = new GameState();
    engine = new QuizEngine(characters, state);
  });

  it('runs a complete 3-question game loop with XP progression and codex unlocks', () => {
    for (let round = 0; round < 3; round++) {
      const q = engine.nextQuestion();
      expect(q.currentCharacter).toBeDefined();
      expect(q.options.length).toBe(4);

      const result = engine.submitAnswer(q.currentCharacter.id, 12);
      expect(result.correct).toBe(true);
      expect(state.isUnlocked(q.currentCharacter.id)).toBe(true);
    }

    expect(state.score).toBeGreaterThan(300);
    expect(state.streak).toBe(3);
    expect(state.unlockedCharacters.size).toBe(3);
  });
});
```

- [ ] **Step 2: Implement `src/js/codex.js`**
Write gallery renderer with category filtering, completion percentage calculation, and interactive character detail viewer.

- [ ] **Step 3: Implement `src/js/main.js`**
Wire all DOM elements, countdown timer interval, choice click handlers, reveal modal triggers, sound effects, level-up celebrations, and view switching.

- [ ] **Step 4: Run all tests to verify integration**

Run: `npm test`
Expected: ALL test suites PASS.

- [ ] **Step 5: Commit**

```bash
git add src/js/codex.js src/js/main.js tests/integration.test.js
git commit -m "feat: connect game controller, interactive codex gallery, and audio feedback"
```

---

### Task 8: Production Build & Browser End-to-End Verification

**Files:**
- Modify: `vite.config.js` (if needed for asset copying)
- Output: `dist/`

**Interfaces:**
- Produces: Production build verifying zero build errors, zero runtime warnings, and smooth browser gameplay.

- [ ] **Step 1: Build production bundle**

Run: `npm run build`
Expected: Clean build without errors, outputs to `dist/`.

- [ ] **Step 2: Start preview dev server and perform browser validation**

Run: `npm run preview` or launch dev server.
Verify:
1. Oracle Bone glyph and simplified character render crisply.
2. 4 bilingual options are clearly clickable.
3. Answering displays pinyin, historical script evolution timeline, and pictographic story.
4. Correct answers trigger bronze bell chime and increase Scholar XP bar.
5. "Ancient Codex" tab opens gallery displaying unlocked characters and mystery tablets.
6. LocalStorage preserves progress upon page refresh.

- [ ] **Step 3: Commit final build assets and documentation updates**

```bash
git add -A
git commit -m "chore: verify production build and complete end-to-end integration"
```
