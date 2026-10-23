/**
 * Quiz Engine & Distractor Generator
 * Selects Oracle Bone characters and builds challenging bilingual options.
 */

export class QuizEngine {
  constructor(characters, gameState) {
    if (!Array.isArray(characters) || characters.length < 4) {
      throw new Error('QuizEngine requires at least 4 characters');
    }
    this.characters = characters;
    this.state = gameState;
    this.recentIds = [];
    this.currentQuestion = null;
    this.roundCount = 0;
    this.categoryFilter = 'all';
    this.difficultyFilter = 'all';
  }

  setCategoryFilter(category) {
    this.categoryFilter = category || 'all';
  }

  setDifficultyFilter(difficulty) {
    this.difficultyFilter = difficulty || 'all';
  }

  /**
   * Generates the next question.
   * If specificTargetId is provided, forces that character as the target.
   * Otherwise respects categoryFilter and difficultyFilter, prioritizing unvisited characters.
   */
  nextQuestion(specificTargetId = null) {
    this.roundCount++;

    let target = null;
    if (specificTargetId) {
      target = this.characters.find(c => c.id === specificTargetId);
    }

    if (!target) {
      let candidates = this.characters;

      // Filter by category if set
      if (this.categoryFilter && this.categoryFilter !== 'all') {
        const catFiltered = candidates.filter(c => c.category === this.categoryFilter);
        if (catFiltered.length > 0) {
          candidates = catFiltered;
        }
      }

      // Filter by difficulty if set
      if (this.difficultyFilter && this.difficultyFilter !== 'all') {
        const diffFiltered = candidates.filter(c => c.difficulty === this.difficultyFilter);
        if (diffFiltered.length > 0) {
          candidates = diffFiltered;
        }
      }

      // Partition into candidate pools
      const unlockedSet = this.state.unlockedCharacters;
      const lockedChars = candidates.filter(c => !unlockedSet.has(c.id) && !this.recentIds.includes(c.id));
      const unvisitedAvailable = candidates.filter(c => !this.recentIds.includes(c.id));

      const pool = lockedChars.length > 0 ? lockedChars : (unvisitedAvailable.length > 0 ? unvisitedAvailable : candidates);
      target = pool[Math.floor(Math.random() * pool.length)];
    }

    // Track recently seen (keep last 6)
    this.recentIds.push(target.id);
    if (this.recentIds.length > Math.min(6, this.characters.length - 1)) {
      this.recentIds.shift();
    }

    // Generate 3 intelligent distractors
    const distractors = this._selectDistractors(target, 3);

    // Build the 4 multiple choice options
    const options = [
      {
        id: target.id,
        meaningEn: target.meaning.en,
        meaningZh: target.meaning.zh,
        isCorrect: true
      },
      ...distractors.map(d => ({
        id: d.id,
        meaningEn: d.meaning.en,
        meaningZh: d.meaning.zh,
        isCorrect: false
      }))
    ];

    // Shuffle options using Fisher-Yates
    this._shuffle(options);

    this.currentQuestion = {
      roundNumber: this.roundCount,
      currentCharacter: target,
      options
    };

    return this.currentQuestion;
  }

  _selectDistractors(target, count = 3) {
    // Priority 1: Same category distractors
    const sameCategory = this.characters.filter(c => c.id !== target.id && c.category === target.category);
    this._shuffle(sameCategory);

    const selected = [];
    for (const char of sameCategory) {
      if (selected.length < count) {
        selected.push(char);
      }
    }

    // Priority 2: Other categories if needed
    if (selected.length < count) {
      const otherCategories = this.characters.filter(c => c.id !== target.id && !selected.some(s => s.id === c.id));
      this._shuffle(otherCategories);
      for (const char of otherCategories) {
        if (selected.length < count) {
          selected.push(char);
        }
      }
    }

    return selected;
  }

  _shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  /**
   * Evaluates the submitted answer and updates player game state
   */
  submitAnswer(selectedId, remainingTimeSeconds = 0) {
    if (!this.currentQuestion) {
      throw new Error('No active question to submit answer for');
    }

    const { currentCharacter, options } = this.currentQuestion;
    const isCorrect = selectedId === currentCharacter.id;
    const correctOption = options.find(o => o.isCorrect);
    const selectedOption = options.find(o => o.id === selectedId);

    let scoreEarned = 0;
    let multiplier = this.state.getMultiplier();

    if (isCorrect) {
      const difficulty = currentCharacter.difficulty || 'easy';
      const basePoints = { easy: 100, medium: 150, hard: 200 };
      const base = basePoints[difficulty] || 100;

      const speedBonus = Math.round((Math.max(0, Math.min(15, remainingTimeSeconds)) / 15) * 50);
      scoreEarned = Math.round((base + speedBonus) * multiplier);

      this.state.incrementStreak();
      this.state.addScore(scoreEarned);
      this.state.unlockCharacter(currentCharacter.id);
    } else {
      this.state.resetStreak();
    }

    return {
      correct: isCorrect,
      scoreEarned,
      multiplier,
      selectedOption,
      correctOption,
      currentCharacter,
      difficulty: currentCharacter.difficulty || 'easy',
      pinyin: currentCharacter.pinyin,
      modern: currentCharacter.modern,
      meaning: currentCharacter.meaning,
      description: currentCharacter.description,
      evolution: currentCharacter.evolution,
      funFact: currentCharacter.funFact
    };
  }
}
