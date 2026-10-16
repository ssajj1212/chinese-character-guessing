/**
 * Ancient Codex / Museum Gallery Manager
 * Handles artifact collection rendering, category filtering, and item inspection/challenges.
 */

export class CodexManager {
  constructor(characters, gameState, callbacks = {}) {
    this.characters = characters;
    this.state = gameState;
    
    if (typeof callbacks === 'function') {
      this.onInspect = callbacks;
      this.onChallenge = null;
      this.onPracticeCategory = null;
    } else {
      this.onInspect = callbacks.onInspect;
      this.onChallenge = callbacks.onChallenge;
      this.onPracticeCategory = callbacks.onPracticeCategory;
    }

    this.currentCategory = 'all';

    this.gridContainer = document.getElementById('codex-grid');
    this.progressCountEl = document.getElementById('codex-progress-text');
    this.progressPercentEl = document.getElementById('codex-progress-percent');
    this.filterChips = document.querySelectorAll('.codex-filters .filter-chip');
    this.btnPracticeCategory = document.getElementById('btn-practice-category');

    this.init();
  }

  init() {
    this.filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        this.filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.currentCategory = chip.dataset.category || 'all';
        this.updatePracticeBtnLabel();
        this.render();
      });
    });

    if (this.btnPracticeCategory) {
      this.btnPracticeCategory.addEventListener('click', () => {
        if (typeof this.onPracticeCategory === 'function') {
          this.onPracticeCategory(this.currentCategory);
        }
      });
    }

    this.state.on('characterUnlocked', () => {
      this.updateStats();
      this.render();
    });

    this.updateStats();
    this.updatePracticeBtnLabel();
    this.render();
  }

  updatePracticeBtnLabel() {
    if (!this.btnPracticeCategory) return;
    const catLabels = {
      all: 'Practice All Categories',
      nature: 'Practice Nature & Cosmos',
      animals: 'Practice Animals',
      human: 'Practice Human & Life',
      plants: 'Practice Plants & Flora',
      tools: 'Practice Tools & Objects'
    };
    const label = catLabels[this.currentCategory] || 'Practice Category';
    this.btnPracticeCategory.textContent = `⚔️ ${label}`;
  }

  updateStats() {
    const total = this.characters.length;
    const unlocked = this.state.unlockedCharacters.size;
    const percent = total > 0 ? Math.round((unlocked / total) * 100) : 0;

    if (this.progressCountEl) {
      this.progressCountEl.textContent = `${unlocked} / ${total}`;
    }
    if (this.progressPercentEl) {
      this.progressPercentEl.textContent = `(${percent}%)`;
    }
  }

  render() {
    if (!this.gridContainer) return;

    this.gridContainer.innerHTML = '';

    const filtered = this.characters.filter(char => {
      if (this.currentCategory === 'all') return true;
      return char.category === this.currentCategory;
    });

    filtered.forEach(char => {
      const isUnlocked = this.state.isUnlocked(char.id);
      const tile = document.createElement('div');
      tile.className = `codex-tile ${isUnlocked ? 'unlocked' : 'locked'}`;
      tile.dataset.id = char.id;
      tile.tabIndex = 0;
      tile.setAttribute('role', 'button');

      if (isUnlocked) {
        tile.innerHTML = `
          <div class="tile-oracle-svg">${char.oracle_bone.svg}</div>
          <div class="tile-modern-char">${char.modern}</div>
          <div class="tile-pinyin">${char.pinyin}</div>
          <div class="tile-tag">Decoded</div>
        `;
        tile.setAttribute('title', `Inspect: ${char.modern} · ${char.meaning.en}`);
        tile.addEventListener('click', () => {
          if (typeof this.onInspect === 'function') {
            this.onInspect(char, true);
          }
        });
      } else {
        tile.innerHTML = `
          <div class="tile-mystery-glyph">？</div>
          <div class="tile-modern-char">Undiscovered</div>
          <div class="tile-pinyin">${char.categoryName.en}</div>
          <div class="tile-tag challenge-tag">⚔️ Challenge</div>
        `;
        tile.setAttribute('title', `Click to challenge and decode this ${char.categoryName.en} character`);
        tile.addEventListener('click', () => {
          if (typeof this.onInspect === 'function') {
            this.onInspect(char, false);
          }
        });
      }

      // Enter key accessibility
      tile.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          tile.click();
        }
      });

      this.gridContainer.appendChild(tile);
    });
  }
}
