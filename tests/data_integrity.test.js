import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Character Dataset Integrity', () => {
  const dataPath = path.resolve(__dirname, '../data/characters.json');

  it('dataset file must exist and contain at least 70 characters', () => {
    expect(fs.existsSync(dataPath)).toBe(true);
    const raw = fs.readFileSync(dataPath, 'utf-8');
    const characters = JSON.parse(raw);
    expect(Array.isArray(characters)).toBe(true);
    expect(characters.length).toBeGreaterThanOrEqual(70);
  });

  it('each character must have valid structure, svg glyph, and bilingual meanings', () => {
    const raw = fs.readFileSync(dataPath, 'utf-8');
    const characters = JSON.parse(raw);

    const categories = new Set();
    const difficulties = new Set();

    for (const char of characters) {
      expect(char.id).toBeDefined();
      expect(char.modern).toBeDefined();
      expect(char.pinyin).toBeDefined();
      expect(char.meaning.en).toBeTruthy();
      expect(char.meaning.zh).toBeTruthy();
      expect(char.oracle_bone.svg).toContain('<svg');
      expect(Array.isArray(char.evolution)).toBe(true);
      expect(char.evolution.length).toBe(4);
      expect(['easy', 'medium', 'hard']).toContain(char.difficulty);

      categories.add(char.category);
      difficulties.add(char.difficulty);
    }

    // Verify 5 distinct categories
    expect(categories.size).toBe(5);
    // Verify 3 distinct difficulties (easy, medium, hard)
    expect(difficulties.size).toBe(3);
  });

  it('evolution stages must have renderable SVGs for ancient scripts to prevent blank/tofu boxes', () => {
    const raw = fs.readFileSync(dataPath, 'utf-8');
    const characters = JSON.parse(raw);

    for (const char of characters) {
      expect(char.evolution.length).toBe(4);
      // Stage 0: Oracle Bone (甲骨文) must be SVG
      expect(char.evolution[0].glyph).toContain('<svg');
      // Stage 1: Bronze Script (金文) must be SVG
      expect(char.evolution[1].glyph).toContain('<svg');
      // Stage 2: Small Seal Script (小篆) must be SVG
      expect(char.evolution[2].glyph).toContain('<svg');
      // Stage 3: Modern Regular Script (楷书) must be the modern character
      expect(char.evolution[3].glyph).toBe(char.modern);
    }
  });
});
