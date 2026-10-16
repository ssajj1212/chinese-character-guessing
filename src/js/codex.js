/**
 * Ancient Codex / Museum Gallery Manager
 * Handles artifact collection rendering, category filtering, and item inspection.
 */

export class CodexManager {
  constructor(characters, gameState, onInspectCallback) {
    this.characters = characters;
    this.state = gameState;
    this.onInspect = onInspectCallback;
    this.currentCategory = 'all';

    this.gridContainer = document.getElementById('codex-grid');
    this.progressCountEl = document.getElementById('codex-progress-text');
    this.progressPercentEl = document.getElementById('codex-progress-percent');
    this.filterChips = document.querySelectorAll('.filter-chip');

    this.init();
  }

  init() {
    this.filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        this.filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.currentCategory = chip.dataset.category || 'all';
        this.render();
      });
    });

    this.state.on('characterUnlocked', () => {
      this.updateStats();
      this.render();
    });

    this.updateStats();
    this.render();
  }

  updateStats() {
    const total = this.characters.length;
    const unlocked = this.state.unlockedCharacters.size;
    const percent = Math.round((unlocked / total) * 100);

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

      if (isUnlocked) {
        tile.innerHTML = `
          <div class="tile-oracle-svg">${char.oracle_bone.svg}</div>
          <div class="tile-modern-char">${char.modern}</div>
          <div class="tile-pinyin">${char.pinyin}</div>
        `;
        tile.setAttribute('title', `Inspect: ${char.modern} · ${char.meaning.en}`);
        tile.addEventListener('click', () => {
          if (typeof this.onInspect === 'function') {
            this.onInspect(char);
          }
        });
      } else {
        tile.innerHTML = `
          <div class="tile-mystery-glyph">？</div>
          <div class="tile-modern-char">Locked</div>
          <div class="tile-pinyin">${char.categoryName.en}</div>
        `;
        tile.setAttribute('title', 'Locked · Guess correctly in Play to decode');
      }

      this.gridContainer.appendChild(tile);
    });
  }
}
