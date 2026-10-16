/**
 * Application Entrypoint & Main Coordinator
 * Oracle Bone Script Guessing Game (甲骨探幽)
 */

import characters from '../../data/characters.json';
import { GameState } from './state.js';
import { QuizEngine } from './engine.js';
import { SoundEngine } from './audio.js';
import { CodexManager } from './codex.js';

class AppController {
  constructor() {
    this.state = new GameState();
    this.sound = new SoundEngine();
    this.engine = new QuizEngine(characters, this.state);

    this.timerInterval = null;
    this.remainingTime = 15;
    this.isAnsweringAllowed = true;
    this.currentQuestionData = null;

    this._cacheDom();
    this._bindEvents();

    this.codex = new CodexManager(characters, this.state, (char) => {
      this.showCharacterInspection(char);
    });

    this.updateHeaderUI();
    this.loadNextQuestion();
  }

  _cacheDom() {
    // Navigation & Tabs
    this.tabPlay = document.getElementById('tab-play');
    this.tabCodex = document.getElementById('tab-codex');
    this.gameView = document.getElementById('game-view');
    this.codexView = document.getElementById('codex-view');

    // Controls
    this.btnSound = document.getElementById('btn-sound');
    this.btnReset = document.getElementById('btn-reset');

    // Scholar Status
    this.scholarBadge = document.getElementById('scholar-badge');
    this.scholarTitleZh = document.getElementById('scholar-title-zh');
    this.scholarTitleEn = document.getElementById('scholar-title-en');
    this.xpText = document.getElementById('xp-text');
    this.xpFill = document.getElementById('xp-fill');
    this.scoreDisplay = document.getElementById('score-display');
    this.streakIndicator = document.getElementById('streak-indicator');
    this.streakCount = document.getElementById('streak-count');

    // Game Arena
    this.roundCounter = document.getElementById('round-counter');
    this.categoryTag = document.getElementById('category-tag');
    this.timerFill = document.getElementById('timer-fill');
    this.oracleGlyphContainer = document.getElementById('oracle-glyph-container');
    this.modernCharBadge = document.getElementById('modern-char');
    this.choiceBtns = [
      document.getElementById('choice-0'),
      document.getElementById('choice-1'),
      document.getElementById('choice-2'),
      document.getElementById('choice-3')
    ];

    // Reveal Modal
    this.revealModal = document.getElementById('reveal-modal');
    this.verdictTitle = document.getElementById('verdict-title');
    this.verdictIcon = document.getElementById('verdict-icon');
    this.verdictText = document.getElementById('verdict-text');
    this.verdictScore = document.getElementById('verdict-score');
    this.revealModernGlyph = document.getElementById('reveal-modern-glyph');
    this.revealPinyin = document.getElementById('reveal-pinyin');
    this.revealMeaning = document.getElementById('reveal-meaning');
    this.btnPronounce = document.getElementById('btn-pronounce');
    this.evolutionStepper = document.getElementById('evolution-stepper');
    this.etymologyText = document.getElementById('etymology-text');
    this.funFactText = document.getElementById('fun-fact-text');
    this.btnNext = document.getElementById('btn-next');

    // Level Up Modal
    this.levelUpModal = document.getElementById('level-up-modal');
    this.promotedBadge = document.getElementById('promoted-badge');
    this.promotedTitle = document.getElementById('promoted-title');
    this.promotedDesc = document.getElementById('promoted-desc');
    this.btnLevelDismiss = document.getElementById('btn-level-dismiss');
  }

  _bindEvents() {
    // Tab switching
    this.tabPlay?.addEventListener('click', () => this.switchView('play'));
    this.tabCodex?.addEventListener('click', () => this.switchView('codex'));

    // Sound toggle
    this.btnSound?.addEventListener('click', () => {
      const isMuted = this.sound.toggleMute();
      this.btnSound.textContent = isMuted ? '🔕' : '🔔';
      this.btnSound.title = isMuted ? '已静音 (取消静音)' : '音效开启 (点击静音)';
    });

    // Reset progress
    this.btnReset?.addEventListener('click', () => {
      if (confirm('确认重置您的学士阅历与全部已解密甲骨字表吗？')) {
        this.state.resetAll();
        this.updateHeaderUI();
        this.codex.updateStats();
        this.codex.render();
        this.loadNextQuestion();
      }
    });

    // Choice selections
    this.choiceBtns.forEach((btn, idx) => {
      btn?.addEventListener('click', () => this.handleAnswer(idx));
    });

    // Next question from reveal modal
    this.btnNext?.addEventListener('click', () => {
      this.closeRevealModal();
      this.loadNextQuestion();
    });

    // Audio Pronunciation using Web Speech API
    this.btnPronounce?.addEventListener('click', () => {
      this.speakChineseCharacter();
    });

    // Level-up dismiss
    this.btnLevelDismiss?.addEventListener('click', () => {
      this.levelUpModal.classList.remove('active');
    });

    // State events
    this.state.on('scoreChange', () => this.updateHeaderUI());
    this.state.on('xpChange', () => this.updateHeaderUI());
    this.state.on('streakChange', () => this.updateHeaderUI());
    this.state.on('levelUp', () => this.handleLevelUp());

    // Keyboard controls (1-4 for options, Enter for next)
    window.addEventListener('keydown', (e) => {
      if (this.revealModal?.classList.contains('active')) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.closeRevealModal();
          this.loadNextQuestion();
        }
        return;
      }

      if (!this.isAnsweringAllowed || this.gameView.style.display === 'none') return;

      if (['1', '2', '3', '4'].includes(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        this.handleAnswer(idx);
      }
    });
  }

  switchView(viewName) {
    if (viewName === 'play') {
      this.tabPlay.classList.add('active');
      this.tabCodex.classList.remove('active');
      this.gameView.style.display = 'flex';
      this.codexView.style.display = 'none';
    } else {
      this.tabPlay.classList.remove('active');
      this.tabCodex.classList.add('active');
      this.gameView.style.display = 'none';
      this.codexView.style.display = 'flex';
      this.codex.render();
    }
  }

  updateHeaderUI() {
    const info = this.state.getLevelInfo();

    if (this.scholarBadge) this.scholarBadge.textContent = info.badge;
    if (this.scholarTitleZh) this.scholarTitleZh.textContent = info.titleZh;
    if (this.scholarTitleEn) this.scholarTitleEn.textContent = `${info.titleEn} · Lv.${info.level}`;

    if (this.xpText) {
      this.xpText.textContent = info.isMaxLevel ? `${this.state.xp} XP (文博大成)` : `${this.state.xp} / ${info.nextXp} XP`;
    }
    if (this.xpFill) {
      this.xpFill.style.width = `${info.progressPercent}%`;
    }
    if (this.scoreDisplay) {
      this.scoreDisplay.textContent = this.state.score.toLocaleString();
    }

    if (this.streakCount) {
      const mult = this.state.getMultiplier();
      this.streakCount.textContent = mult > 1 ? `${this.state.streak} 连击 (${mult}x)` : `${this.state.streak} 连击`;
    }
    if (this.streakIndicator) {
      if (this.state.streak >= 3) {
        this.streakIndicator.classList.add('streak-fire');
      } else {
        this.streakIndicator.classList.remove('streak-fire');
      }
    }
  }

  loadNextQuestion() {
    this.isAnsweringAllowed = true;
    this.currentQuestionData = this.engine.nextQuestion();
    const { roundNumber, currentCharacter, options } = this.currentQuestionData;

    // Reset button states
    this.choiceBtns.forEach((btn, idx) => {
      btn.disabled = false;
      btn.className = 'choice-btn';
      const opt = options[idx];
      const enEl = btn.querySelector('.choice-meaning-en');
      const zhEl = btn.querySelector('.choice-meaning-zh');
      if (enEl) enEl.textContent = opt.meaningEn;
      if (zhEl) zhEl.textContent = opt.meaningZh;
    });

    // Set round and category metadata
    if (this.roundCounter) this.roundCounter.textContent = `第 ${roundNumber} 题`;
    if (this.categoryTag) this.categoryTag.textContent = `${currentCharacter.categoryName.zh} · ${currentCharacter.categoryName.en}`;

    // Inject Oracle Bone SVG and modern character
    if (this.oracleGlyphContainer) {
      this.oracleGlyphContainer.innerHTML = currentCharacter.oracle_bone.svg;
    }
    if (this.modernCharBadge) {
      this.modernCharBadge.textContent = currentCharacter.modern;
    }

    // Reset and start countdown timer (15 seconds)
    this.startTimer();
  }

  startTimer() {
    clearInterval(this.timerInterval);
    this.remainingTime = 15;
    if (this.timerFill) {
      this.timerFill.style.transition = 'none';
      this.timerFill.style.width = '100%';
      // Force repaint
      void this.timerFill.offsetWidth;
      this.timerFill.style.transition = 'width 15s linear';
      this.timerFill.style.width = '0%';
    }

    this.timerInterval = setInterval(() => {
      this.remainingTime -= 1;
      if (this.remainingTime <= 0) {
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  handleAnswer(choiceIndex) {
    if (!this.isAnsweringAllowed || !this.currentQuestionData) return;
    this.isAnsweringAllowed = false;
    clearInterval(this.timerInterval);

    const selectedOption = this.currentQuestionData.options[choiceIndex];
    const result = this.engine.submitAnswer(selectedOption.id, this.remainingTime);

    // Apply button highlight styles
    this.choiceBtns.forEach((btn, idx) => {
      btn.disabled = true;
      const opt = this.currentQuestionData.options[idx];
      if (opt.isCorrect) {
        btn.classList.add('correct');
      } else if (idx === choiceIndex && !result.correct) {
        btn.classList.add('incorrect');
      }
    });

    // Sound feedback
    if (result.correct) {
      this.sound.playCorrect();
    } else {
      this.sound.playWrong();
    }

    // Open reveal modal after brief suspense delay
    setTimeout(() => {
      this.openRevealModal(result);
    }, 450);
  }

  openRevealModal(result) {
    if (!this.revealModal) return;

    if (result.correct) {
      this.verdictTitle.className = 'verdict-tag correct';
      this.verdictIcon.textContent = '✨';
      this.verdictText.textContent = '研判精辟 · 正确！';
      this.verdictScore.textContent = `+${result.scoreEarned} XP (倍率 ${result.multiplier}x)`;
    } else {
      this.verdictTitle.className = 'verdict-tag incorrect';
      this.verdictIcon.textContent = '📜';
      this.verdictText.textContent = `正解为：${result.correctOption.meaningZh}`;
      this.verdictScore.textContent = '+0 XP (连击中断)';
    }

    if (this.revealModernGlyph) this.revealModernGlyph.textContent = result.modern;
    if (this.revealPinyin) this.revealPinyin.textContent = result.pinyin;
    if (this.revealMeaning) this.revealMeaning.textContent = `${result.meaning.en} · ${result.meaning.zh}`;
    if (this.etymologyText) this.etymologyText.textContent = result.description;
    if (this.funFactText) this.funFactText.textContent = result.funFact;

    // Render evolution stepper
    if (this.evolutionStepper) {
      this.evolutionStepper.innerHTML = '';
      result.evolution.forEach(stage => {
        const card = document.createElement('div');
        card.className = 'evolution-stage-card';
        card.innerHTML = `
          <span class="stage-era">${stage.era}</span>
          <div class="stage-glyph-display">${stage.glyph}</div>
          <span class="stage-name">${stage.stage}</span>
        `;
        this.evolutionStepper.appendChild(card);
      });
    }

    this.btnNext.textContent = '参阅下一文字 (Next) ➔';
    this.btnNext.style.display = 'flex';
    this.revealModal.classList.add('active');
  }

  closeRevealModal() {
    if (this.revealModal) {
      this.revealModal.classList.remove('active');
    }
  }

  showCharacterInspection(char) {
    if (!this.revealModal) return;

    this.verdictTitle.className = 'verdict-tag correct';
    this.verdictIcon.textContent = '🏛️';
    this.verdictText.textContent = '甲骨典藏图册细读';
    this.verdictScore.textContent = `${char.categoryName.zh}`;

    if (this.revealModernGlyph) this.revealModernGlyph.textContent = char.modern;
    if (this.revealPinyin) this.revealPinyin.textContent = char.pinyin;
    if (this.revealMeaning) this.revealMeaning.textContent = `${char.meaning.en} · ${char.meaning.zh}`;
    if (this.etymologyText) this.etymologyText.textContent = char.description;
    if (this.funFactText) this.funFactText.textContent = char.funFact;

    if (this.evolutionStepper) {
      this.evolutionStepper.innerHTML = '';
      char.evolution.forEach(stage => {
        const card = document.createElement('div');
        card.className = 'evolution-stage-card';
        card.innerHTML = `
          <span class="stage-era">${stage.era}</span>
          <div class="stage-glyph-display">${stage.glyph}</div>
          <span class="stage-name">${stage.stage}</span>
        `;
        this.evolutionStepper.appendChild(card);
      });
    }

    this.btnNext.textContent = '关闭细读窗口 (Close)';
    this.btnNext.onclick = () => this.closeRevealModal();
    this.revealModal.classList.add('active');
  }

  speakChineseCharacter() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const textToSpeak = this.revealModernGlyph?.textContent || '';
      if (!textToSpeak) return;

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  }

  handleLevelUp() {
    const info = this.state.getLevelInfo();
    this.sound.playLevelUp();

    if (this.promotedBadge) this.promotedBadge.textContent = info.badge;
    if (this.promotedTitle) this.promotedTitle.textContent = info.titleZh;
    if (this.promotedDesc) this.promotedDesc.textContent = info.desc;

    if (this.levelUpModal) {
      this.levelUpModal.classList.add('active');
    }
  }
}

// Bootstrap on DOM load
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    new AppController();
  });
}
