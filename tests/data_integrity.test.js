import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Character Dataset Integrity', () => {
  const dataPath = path.resolve(__dirname, '../data/characters.json');

  it('dataset file must exist and contain at least 40 characters', () => {
    expect(fs.existsSync(dataPath)).toBe(true);
    const raw = fs.readFileSync(dataPath, 'utf-8');
    const characters = JSON.parse(raw);
    expect(Array.isArray(characters)).toBe(true);
    expect(characters.length).toBeGreaterThanOrEqual(40);
  });

  it('each character must have valid structure, svg glyph, and bilingual meanings', () => {
    const raw = fs.readFileSync(dataPath, 'utf-8');
    const characters = JSON.parse(raw);

    const categories = new Set();

    for (const char of characters) {
      expect(char.id).toBeDefined();
      expect(char.modern).toBeDefined();
      expect(char.pinyin).toBeDefined();
      expect(char.meaning.en).toBeTruthy();
      expect(char.meaning.zh).toBeTruthy();
      expect(char.oracle_bone.svg).toContain('<svg');
      expect(Array.isArray(char.evolution)).toBe(true);
      expect(char.evolution.length).toBeGreaterThanOrEqual(3);
      categories.add(char.category);
    }

    // Verify broad category diversity (Nature, Animals, Human, Plants, Tools)
    expect(categories.size).toBeGreaterThanOrEqual(4);
  });
});
