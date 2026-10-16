/**
 * Central Reactive Game State & Scholar Progression
 */

import { StorageService } from './storage.js';

export const SCHOLAR_LEVELS = [
  { level: 1, requiredXp: 0, titleZh: '见习考订生', titleEn: 'Novice Excavator', badge: '🪨', desc: '刚入殷墟的青涩学子，开始辨认天地万物之初形' },
  { level: 2, requiredXp: 400, titleZh: '卜辞抄写手', titleEn: 'Inscription Scribe', badge: '🖌️', desc: '笔墨初成，能摹写龟甲兽骨上的先民刀痕' },
  { level: 3, requiredXp: 1000, titleZh: '殷墟识字郎', titleEn: 'Yin Ruins Cryptographer', badge: '🗡️', desc: '贯通象形指事之理，能识辨百余甲骨原形' },
  { level: 4, requiredXp: 2000, titleZh: '商周大贞人', titleEn: 'Shang Royal Diviner', badge: '🐢', desc: '知悉上古占卜奥秘，领悟甲骨演变流转之妙' },
  { level: 5, requiredXp: 3500, titleZh: '华夏文史大学士', titleEn: 'Grand Imperial Historian', badge: '📜', desc: '学究天人，通晓三千年华夏汉字源流文脉' }
];

export class GameState {
  constructor() {
    this.listeners = new Map();
    this.score = 0;
    this.highScore = 0;
    this.xp = 0;
    this.level = 1;
    this.streak = 0;
    this.highestStreak = 0;
    this.unlockedCharacters = new Set();
    this.soundEnabled = true;

    this.load();
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);
    return () => this.listeners.get(event).delete(callback);
  }

  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(cb => {
        try {
          cb(data);
        } catch (e) {
          console.error(`Error in listener for ${event}:`, e);
        }
      });
    }
  }

  load() {
    const saved = StorageService.load();
    if (saved) {
      this.score = saved.score || 0;
      this.highScore = saved.highScore || 0;
      this.xp = saved.xp || 0;
      this.level = saved.level || 1;
      this.streak = saved.streak || 0;
      this.highestStreak = saved.highestStreak || 0;
      this.soundEnabled = saved.soundEnabled !== undefined ? saved.soundEnabled : true;
      if (Array.isArray(saved.unlockedCharacters)) {
        this.unlockedCharacters = new Set(saved.unlockedCharacters);
      }
    }
    this._recalculateLevel(false);
  }

  save() {
    StorageService.save({
      score: this.score,
      highScore: this.highScore,
      xp: this.xp,
      level: this.level,
      streak: this.streak,
      highestStreak: this.highestStreak,
      soundEnabled: this.soundEnabled,
      unlockedCharacters: Array.from(this.unlockedCharacters)
    });
  }

  addScore(pts) {
    this.score += pts;
    if (this.score > this.highScore) {
      this.highScore = this.score;
    }
    this.addXp(pts);
    this.save();
    this.emit('scoreChange', { score: this.score, highScore: this.highScore });
  }

  setStreak(val) {
    this.streak = Math.max(0, val);
    if (this.streak > this.highestStreak) {
      this.highestStreak = this.streak;
    }
    this.save();
    this.emit('streakChange', { streak: this.streak, multiplier: this.getMultiplier() });
  }

  incrementStreak() {
    this.setStreak(this.streak + 1);
  }

  resetStreak() {
    this.setStreak(0);
  }

  getMultiplier() {
    if (this.streak >= 8) return 3.0;
    if (this.streak >= 5) return 2.0;
    if (this.streak >= 3) return 1.5;
    return 1.0;
  }

  addXp(amount) {
    this.xp += Math.max(0, amount);
    this._recalculateLevel(true);
    this.save();
    this.emit('xpChange', { xp: this.xp, levelInfo: this.getLevelInfo() });
  }

  _recalculateLevel(notify = true) {
    let currentLvl = 1;
    for (let i = SCHOLAR_LEVELS.length - 1; i >= 0; i--) {
      if (this.xp >= SCHOLAR_LEVELS[i].requiredXp) {
        currentLvl = SCHOLAR_LEVELS[i].level;
        break;
      }
    }

    if (currentLvl > this.level) {
      this.level = currentLvl;
      if (notify) {
        this.emit('levelUp', this.level);
      }
    } else {
      this.level = currentLvl;
    }
  }

  getLevelInfo() {
    const current = SCHOLAR_LEVELS.find(l => l.level === this.level) || SCHOLAR_LEVELS[0];
    const nextIdx = SCHOLAR_LEVELS.findIndex(l => l.level === this.level) + 1;
    const next = nextIdx < SCHOLAR_LEVELS.length ? SCHOLAR_LEVELS[nextIdx] : null;

    let progressPercent = 100;
    let xpToNext = 0;

    if (next) {
      const span = next.requiredXp - current.requiredXp;
      const progressInSpan = this.xp - current.requiredXp;
      progressPercent = Math.min(100, Math.max(0, Math.round((progressInSpan / span) * 100)));
      xpToNext = Math.max(0, next.requiredXp - this.xp);
    }

    return {
      level: current.level,
      titleZh: current.titleZh,
      titleEn: current.titleEn,
      badge: current.badge,
      desc: current.desc,
      currentXp: this.xp,
      nextXp: next ? next.requiredXp : current.requiredXp,
      xpToNext,
      progressPercent,
      isMaxLevel: !next
    };
  }

  unlockCharacter(charId) {
    if (!this.unlockedCharacters.has(charId)) {
      this.unlockedCharacters.add(charId);
      this.save();
      this.emit('characterUnlocked', charId);
      return true;
    }
    return false;
  }

  isUnlocked(charId) {
    return this.unlockedCharacters.has(charId);
  }

  resetAll() {
    this.score = 0;
    this.highScore = 0;
    this.xp = 0;
    this.level = 1;
    this.streak = 0;
    this.highestStreak = 0;
    this.unlockedCharacters.clear();
    StorageService.clear();
    this.emit('reset', null);
  }
}
