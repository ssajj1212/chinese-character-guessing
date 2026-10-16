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

  it('sets mute state directly', () => {
    audio.setMuted(true);
    expect(audio.isMuted()).toBe(true);
    audio.setMuted(false);
    expect(audio.isMuted()).toBe(false);
  });

  it('can trigger play methods without crashing in jsdom mock environment', () => {
    expect(() => audio.playCorrect()).not.toThrow();
    expect(() => audio.playWrong()).not.toThrow();
    expect(() => audio.playLevelUp()).not.toThrow();
  });
});
