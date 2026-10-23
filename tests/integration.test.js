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
      expect(result.evolution.length).toBe(4);
      expect(result.evolution[0].glyph).toContain('<svg');
      expect(result.evolution[1].glyph).toContain('<svg');
      expect(result.evolution[2].glyph).toContain('<svg');
    }

    expect(state.score).toBeGreaterThan(300);
    expect(state.streak).toBe(3);
    expect(state.unlockedCharacters.size).toBe(3);
  });

  it('promotes scholar rank when reaching 400 XP', () => {
    let promoted = false;
    state.on('levelUp', () => {
      promoted = true;
    });

    while (state.xp < 450) {
      const q = engine.nextQuestion();
      engine.submitAnswer(q.currentCharacter.id, 14);
    }

    expect(state.level).toBeGreaterThanOrEqual(2);
    expect(promoted).toBe(true);
  });

  it('allows challenging a targeted character directly from codex', () => {
    const target = characters.find(c => c.category === 'animals');
    expect(target).toBeDefined();

    const q = engine.nextQuestion(target.id);
    expect(q.currentCharacter.id).toBe(target.id);
    expect(q.options.some(o => o.id === target.id && o.isCorrect)).toBe(true);

    const result = engine.submitAnswer(target.id, 10);
    expect(result.correct).toBe(true);
    expect(state.isUnlocked(target.id)).toBe(true);
  });

  it('filters questions by category properly in play session', () => {
    engine.setCategoryFilter('nature');
    for (let i = 0; i < 5; i++) {
      const q = engine.nextQuestion();
      expect(q.currentCharacter.category).toBe('nature');
    }

    engine.setCategoryFilter('tools');
    for (let i = 0; i < 5; i++) {
      const q = engine.nextQuestion();
      expect(q.currentCharacter.category).toBe('tools');
    }
  });
});
