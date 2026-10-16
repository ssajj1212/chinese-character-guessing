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
      expect(result.evolution.length).toBeGreaterThanOrEqual(3);
    }

    expect(state.score).toBeGreaterThan(300);
    expect(state.streak).toBe(3);
    expect(state.unlockedCharacters.size).toBe(3);
  });

  it('promotes scholar rank when reaching 400 XP', () => {
    let promoted = false;
    state.on('levelUp', (lvl) => {
      promoted = true;
    });

    // Answer enough questions to pass 400 XP
    while (state.xp < 450) {
      const q = engine.nextQuestion();
      engine.submitAnswer(q.currentCharacter.id, 14);
    }

    expect(state.level).toBeGreaterThanOrEqual(2);
    expect(promoted).toBe(true);
  });
});
