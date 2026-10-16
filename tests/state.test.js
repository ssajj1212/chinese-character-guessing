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
    expect(info.titleEn).toBe('Novice Excavator');
    expect(state.score).toBe(0);
    expect(state.streak).toBe(0);
  });

  it('calculates streak multipliers accurately', () => {
    state.setStreak(1);
    expect(state.getMultiplier()).toBe(1.0);
    state.setStreak(2);
    expect(state.getMultiplier()).toBe(1.0);
    state.setStreak(3);
    expect(state.getMultiplier()).toBe(1.5);
    state.setStreak(4);
    expect(state.getMultiplier()).toBe(1.5);
    state.setStreak(5);
    expect(state.getMultiplier()).toBe(2.0);
    state.setStreak(7);
    expect(state.getMultiplier()).toBe(2.0);
    state.setStreak(8);
    expect(state.getMultiplier()).toBe(3.0);
    state.setStreak(12);
    expect(state.getMultiplier()).toBe(3.0);
  });

  it('advances scholar levels as XP is gained and emits level-up event', () => {
    let leveledUp = false;
    let newLevel = null;
    state.on('levelUp', (lvl) => {
      leveledUp = true;
      newLevel = lvl;
    });

    state.addXp(450); // Exceeds level 2 threshold (400)
    expect(state.level).toBe(2);
    expect(state.getLevelInfo().titleZh).toBe('卜辞抄写手');
    expect(leveledUp).toBe(true);
    expect(newLevel).toBe(2);
  });

  it('records unlocked characters in a set and saves to localStorage', () => {
    state.unlockCharacter('char_ri');
    expect(state.isUnlocked('char_ri')).toBe(true);
    expect(state.isUnlocked('char_yue')).toBe(false);

    // Verify persistence across new instance
    const freshState = new GameState();
    expect(freshState.isUnlocked('char_ri')).toBe(true);
    expect(freshState.isUnlocked('char_yue')).toBe(false);
  });

  it('records high score and highest streak', () => {
    state.addScore(250);
    expect(state.score).toBe(250);
    expect(state.highScore).toBe(250);

    state.incrementStreak();
    state.incrementStreak();
    expect(state.streak).toBe(2);
    expect(state.highestStreak).toBe(2);

    state.resetStreak();
    expect(state.streak).toBe(0);
    expect(state.highestStreak).toBe(2);
  });
});
