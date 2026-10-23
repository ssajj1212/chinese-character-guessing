import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CodexManager } from '../src/js/codex.js';
import { GameState } from '../src/js/state.js';

const mockCharacters = [
  {
    id: 'char_ri',
    modern: '日',
    pinyin: 'rì',
    category: 'nature',
    difficulty: 'easy',
    categoryName: { en: 'Nature', zh: '自然' },
    meaning: { en: 'Sun / Day', zh: '太阳' },
    description: 'Ancient sun pictograph.',
    oracle_bone: { svg: '<svg id="ri"></svg>' },
    evolution: []
  },
  {
    id: 'char_niu',
    modern: '牛',
    pinyin: 'niú',
    category: 'animals',
    difficulty: 'medium',
    categoryName: { en: 'Animals', zh: '动物' },
    meaning: { en: 'Ox / Cattle', zh: '牛' },
    description: 'Ancient ox pictograph.',
    oracle_bone: { svg: '<svg id="niu"></svg>' },
    evolution: []
  }
];

describe('CodexManager', () => {
  let state;
  let onInspect;
  let onChallenge;
  let onPracticeCategory;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="codex-progress-text">0 / 2</div>
      <div id="codex-progress-percent">(0%)</div>
      <div class="codex-filters">
        <button class="filter-chip active" data-category="all">All</button>
        <button class="filter-chip" data-category="nature">Nature</button>
        <button class="filter-chip" data-category="animals">Animals</button>
      </div>
      <div class="codex-diff-row">
        <button class="codex-diff-chip active" data-difficulty="all">All Tiers</button>
        <button class="codex-diff-chip" data-difficulty="easy">Easy</button>
        <button class="codex-diff-chip" data-difficulty="medium">Medium</button>
      </div>
      <button id="btn-practice-category">Practice Category</button>
      <div id="codex-grid"></div>
    `;

    localStorage.clear();
    state = new GameState();
    onInspect = vi.fn();
    onChallenge = vi.fn();
    onPracticeCategory = vi.fn();
  });

  it('renders all characters when category is all', () => {
    const codex = new CodexManager(mockCharacters, state, { onInspect, onChallenge, onPracticeCategory });
    const tiles = document.querySelectorAll('.codex-tile');
    expect(tiles.length).toBe(2);
  });

  it('filters characters when clicking a category chip', () => {
    const codex = new CodexManager(mockCharacters, state, { onInspect, onChallenge, onPracticeCategory });
    const natureChip = document.querySelector('[data-category="nature"]');
    natureChip.click();

    const tiles = document.querySelectorAll('.codex-tile');
    expect(tiles.length).toBe(1);
    expect(tiles[0].dataset.id).toBe('char_ri');
    expect(codex.currentCategory).toBe('nature');
  });

  it('filters characters when clicking a difficulty chip', () => {
    const codex = new CodexManager(mockCharacters, state, { onInspect, onChallenge, onPracticeCategory });
    const mediumChip = document.querySelector('[data-difficulty="medium"]');
    mediumChip.click();

    const tiles = document.querySelectorAll('.codex-tile');
    expect(tiles.length).toBe(1);
    expect(tiles[0].dataset.id).toBe('char_niu');
    expect(codex.currentDifficulty).toBe('medium');
  });

  it('calls onInspect when clicking an unlocked tile', () => {
    state.unlockCharacter('char_ri');
    const codex = new CodexManager(mockCharacters, state, { onInspect, onChallenge, onPracticeCategory });

    const tile = document.querySelector('[data-id="char_ri"]');
    expect(tile.classList.contains('unlocked')).toBe(true);
    tile.click();

    expect(onInspect).toHaveBeenCalledWith(expect.objectContaining({ id: 'char_ri' }), true);
  });

  it('calls onInspect when clicking a locked tile with isUnlocked=false', () => {
    const codex = new CodexManager(mockCharacters, state, { onInspect, onChallenge, onPracticeCategory });

    const tile = document.querySelector('[data-id="char_niu"]');
    expect(tile.classList.contains('locked')).toBe(true);
    tile.click();

    expect(onInspect).toHaveBeenCalledWith(expect.objectContaining({ id: 'char_niu' }), false);
  });

  it('triggers onPracticeCategory when clicking practice category button', () => {
    const codex = new CodexManager(mockCharacters, state, { onInspect, onChallenge, onPracticeCategory });
    const natureChip = document.querySelector('[data-category="nature"]');
    natureChip.click();

    const practiceBtn = document.getElementById('btn-practice-category');
    practiceBtn.click();

    expect(onPracticeCategory).toHaveBeenCalledWith('nature');
  });
});
