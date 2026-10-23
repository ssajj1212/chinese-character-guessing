/**
 * Procedural Audio Synthesizer for Ancient Oracle Bone Experience
 * Uses Web Audio API to synthesize bronze chime bells (编钟), wooden temple blocks (木鱼),
 * and ceremonial fanfares without external audio dependencies.
 */

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

  /**
   * Resonant ancient bronze bell chime (编钟)
   * Fundamental frequency with metallic overtone decay
   */
  playCorrect() {
    if (this.muted) return;
    const ctx = this._getCtx();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Ancient bronze chime bell harmonics: Root + Fifth + Octave
      const harmonics = [
        { freq: 587.33, type: 'sine', gain: 0.28, decay: 1.4 },  // D5
        { freq: 880.00, type: 'triangle', gain: 0.18, decay: 1.1 }, // A5
        { freq: 1174.66, type: 'sine', gain: 0.12, decay: 0.8 }  // D6
      ];

      harmonics.forEach(({ freq, type, gain, decay }) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, now);

        gainNode.gain.setValueAtTime(gain, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + decay);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + decay);
      });
    } catch {
      // Audio fallback resilience
    }
  }

  /**
   * Wooden temple block (木鱼) tap on incorrect answer
   */
  playWrong() {
    if (this.muted) return;
    const ctx = this._getCtx();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.18);

      gainNode.gain.setValueAtTime(0.25, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.18);
    } catch {
      // Audio fallback resilience
    }
  }

  /**
   * Pentatonic fanfare for leveling up scholar ranks (宫商角徵羽)
   */
  playLevelUp() {
    if (this.muted) return;
    const ctx = this._getCtx();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Traditional pentatonic scale progression: C4, D4, E4, G4, A4, C5
      const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        const startTime = now + idx * 0.11;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gainNode.gain.setValueAtTime(0.24, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.9);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.9);
      });
    } catch {
      // Audio fallback resilience
    }
  }
}
