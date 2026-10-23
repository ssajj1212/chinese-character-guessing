import { describe, it, expect, beforeEach } from 'vitest';
import { QuizEngine } from '../src/js/engine.js';
import { GameState } from '../src/js/state.js';

const mockCharacters = [
  {
    id: 'char_ri',
    modern: '日',
    pinyin: 'rì',
    category: 'nature',
    difficulty: 'easy',
    categoryName: { en: 'Nature', zh: '自然' },
    meaning: { en: 'Sun / Day', zh: '太阳 / 日子' },
    description: 'Ancient pictograph of the sun.',
    oracle_bone: { svg: '<svg></svg>', notes: 'Solar disc' },
    evolution: [
      { era: '商代', stage: '甲骨文', glyph: '☉' },
      { era: '现代', stage: '楷书', glyph: '日' }
    ],
    funFact: 'Sun fact'
  },
  {
    id: 'char_yue',
    modern: '月',
    pinyin: 'yuè',
    category: 'nature',
    difficulty: 'easy',
    categoryName: { en: 'Nature', zh: '自然' },
    meaning: { en: 'Moon / Month', zh: '月亮 / 月份' },
    description: 'Crescent moon.',
    oracle_bone: { svg: '<svg></svg>', notes: 'Crescent' },
    evolution: [],
    funFact: 'Moon fact'
  },
  {
    id: 'char_shui',
    modern: '水',
    pinyin: 'shuǐ',
    category: 'nature',
    difficulty: 'easy',
    categoryName: { en: 'Nature', zh: '自然' },
    meaning: { en: 'Water / River', zh: '水流 / 河流' },
    oracle_bone: { svg: '<svg></svg>', notes: 'Water current' },
    evolution: [],
    funFact: 'Water fact'
  },
  {
    id: 'char_huo',
    modern: '火',
    pinyin: 'huǒ',
    category: 'nature',
    difficulty: 'easy',
    categoryName: { en: 'Nature', zh: '自然' },
    meaning: { en: 'Fire / Flame', zh: '火焰 / 火光' },
    oracle_bone: { svg: '<svg></svg>', notes: 'Flame tongues' },
    evolution: [],
    funFact: 'Fire fact'
  },
  {
    id: 'char_niu',
    modern: '牛',
    pinyin: 'niú',
    category: 'animals',
    difficulty: 'medium',
    categoryName: { en: 'Animals', zh: '动物' },
    meaning: { en: 'Ox / Cattle', zh: '牛 / 黄牛' },
    oracle_bone: { svg: '<svg></svg>', notes: 'Curved horns' },
    evolution: [],
    funFact: 'Ox fact'
  },
  {
    id: 'char_ding',
    modern: '鼎',
    pinyin: 'dǐng',
    category: 'tools',
    difficulty: 'hard',
    categoryName: { en: 'Tools', zh: '器物' },
    meaning: { en: 'Cauldron', zh: '鼎' },
    oracle_bone: { svg: '<svg></svg>', notes: 'Cauldron' },
    evolution: [],
    funFact: 'Ding fact'
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

    expect(correctOptions[0].meaningEn).toBeDefined();
    expect(correctOptions[0].meaningZh).toBeDefined();
  });

  it('awards score and updates streak on correct guess', () => {
    const q = engine.nextQuestion();
    const result = engine.submitAnswer(q.currentCharacter.id, 10);

    expect(result.correct).toBe(true);
    expect(result.scoreEarned).toBeGreaterThanOrEqual(100);
    expect(state.streak).toBe(1);
    expect(state.isUnlocked(q.currentCharacter.id)).toBe(true);
    expect(result.evolution).toBeDefined();
    expect(result.pinyin).toBeDefined();
    expect(result.modern).toBeDefined();
  });

  it('resets streak on incorrect guess and returns correct answer info', () => {
    state.setStreak(5);
    const q = engine.nextQuestion();
    const wrongOption = q.options.find(o => !o.isCorrect);
    const result = engine.submitAnswer(wrongOption.id, 10);

    expect(result.correct).toBe(false);
    expect(result.scoreEarned).toBe(0);
    expect(state.streak).toBe(0);
    expect(result.correctOption.id).toBe(q.currentCharacter.id);
  });

  it('cycles through characters without crashing', () => {
    for (let i = 0; i < 10; i++) {
      const q = engine.nextQuestion();
      expect(q.currentCharacter).toBeDefined();
      expect(q.options.length).toBe(4);
      engine.submitAnswer(q.currentCharacter.id, 5);
    }
  });

  it('filters questions by category when category filter is set', () => {
    engine.setCategoryFilter('nature');
    for (let i = 0; i < 5; i++) {
      const q = engine.nextQuestion();
      expect(q.currentCharacter.category).toBe('nature');
    }
  });

  it('allows picking a specific character to answer directly', () => {
    const q = engine.nextQuestion('char_niu');
    expect(q.currentCharacter.id).toBe('char_niu');
    expect(q.currentCharacter.modern).toBe('牛');
    expect(q.options.some(o => o.id === 'char_niu' && o.isCorrect)).toBe(true);
  });

  it('filters questions by difficulty when difficulty filter is set', () => {
    engine.setDifficultyFilter('easy');
    for (let i = 0; i < 5; i++) {
      const q = engine.nextQuestion();
      expect(q.currentCharacter.difficulty).toBe('easy');
    }
  });

  it('awards higher base XP for harder difficulty characters', () => {
    // Easy character (0 seconds remaining to isolate base score)
    const qEasy = engine.nextQuestion('char_ri');
    const resEasy = engine.submitAnswer(qEasy.currentCharacter.id, 0);

    // Hard character (0 seconds remaining)
    const qHard = engine.nextQuestion('char_ding');
    const resHard = engine.submitAnswer(qHard.currentCharacter.id, 0);

    expect(resHard.scoreEarned).toBeGreaterThan(resEasy.scoreEarned);
  });
});
