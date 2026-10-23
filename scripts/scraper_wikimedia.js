/**
 * Automated Wikimedia Commons Scraper for Ancient Chinese Characters
 * 
 * Fetches, caches, and parses authentic Oracle Bone, Bronze, and Seal script
 * vector SVGs from Wikimedia Commons (Ancient Chinese Characters Project).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CACHE_DIR = path.resolve(__dirname, '../data/scraped_cache');

export class WikimediaScraper {
  constructor(options = {}) {
    this.userAgent = options.userAgent || 'OracleBoneGameScraper/1.0 (https://github.com/ssajj1212/chinese-character-guessing)';
    this.cacheDir = options.cacheDir || CACHE_DIR;
    this.ensureCacheDir();
  }

  ensureCacheDir() {
    if (!fs.existsSync(this.cacheDir)) {
      fs.mkdirSync(this.cacheDir, { recursive: true });
    }
  }

  getCachePath(char, stage) {
    return path.join(this.cacheDir, `${char}-${stage}.svg`);
  }

  hasCached(char, stage) {
    return fs.existsSync(this.getCachePath(char, stage));
  }

  getCached(char, stage) {
    if (this.hasCached(char, stage)) {
      return fs.readFileSync(this.getCachePath(char, stage), 'utf-8');
    }
    return null;
  }

  saveCache(char, stage, content) {
    fs.writeFileSync(this.getCachePath(char, stage), content, 'utf-8');
  }

  /**
   * Resolves the direct Wikimedia Commons URL for a given character and script stage.
   * @param {string} char Modern Hanzi (e.g. '天', '馬')
   * @param {'oracle'|'bronze'|'seal'} stage Ancient script stage
   * @returns {Promise<string|null>}
   */
  async resolveFileUrl(char, stage) {
    const candidates = [
      `File:${char}-${stage}.svg`,
      `File:${char}-${stage}-shang.svg`,
      `File:Character ${char} ${stage === 'oracle' ? 'Oracle' : stage}.svg`,
      `File:Chinese character Shang oracle ${char}.svg`
    ];

    for (const title of candidates) {
      const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url&format=json`;
      try {
        const res = await fetch(url, { headers: { 'User-Agent': this.userAgent } });
        if (!res.ok) continue;
        const data = await res.json();
        const pages = data?.query?.pages || {};
        const page = Object.values(pages)[0];
        if (page && page.imageinfo && page.imageinfo[0]?.url) {
          return page.imageinfo[0].url;
        }
      } catch (err) {
        // network issue or rate limit
      }
    }
    return null;
  }

  /**
   * Fetches the SVG text from Wikimedia Commons, using local cache first.
   * @param {string} char
   * @param {'oracle'|'bronze'|'seal'} stage
   * @returns {Promise<string|null>}
   */
  async fetchSvg(char, stage = 'oracle') {
    const cached = this.getCached(char, stage);
    if (cached) {
      return cached;
    }

    const fileUrl = await this.resolveFileUrl(char, stage);
    if (!fileUrl) {
      return null;
    }

    try {
      const res = await fetch(fileUrl, { headers: { 'User-Agent': this.userAgent } });
      if (!res.ok) return null;
      const svgText = await res.text();
      if (svgText && svgText.includes('<svg')) {
        this.saveCache(char, stage, svgText);
        return svgText;
      }
    } catch (err) {
      console.warn(`[WikimediaScraper] Failed to download SVG for ${char} (${stage}):`, err.message);
    }
    return null;
  }

  /**
   * Extracts inner elements and normalizes viewBox for integration into game UI.
   * @param {string} rawSvg 
   * @returns {{ innerXml: string, viewBox: string, isFilled: boolean }}
   */
  extractGeometry(rawSvg) {
    if (!rawSvg) return null;
    
    // Extract viewBox or width/height
    let viewBox = '0 0 300 300';
    const vbMatch = rawSvg.match(/viewBox=["']([^"']+)["']/i);
    if (vbMatch) {
      viewBox = vbMatch[1];
    } else {
      const wMatch = rawSvg.match(/width=["'](\d+)["']/i);
      const hMatch = rawSvg.match(/height=["'](\d+)["']/i);
      if (wMatch && hMatch) {
        viewBox = `0 0 ${wMatch[1]} ${hMatch[1]}`;
      }
    }

    // Extract inside of <svg>...</svg>
    const innerMatch = rawSvg.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
    let inner = innerMatch ? innerMatch[1].trim() : rawSvg;

    // Remove XML comments & metadata tags
    inner = inner.replace(/<!--[\s\S]*?-->/g, '')
                 .replace(/<metadata[\s\S]*?<\/metadata>/gi, '')
                 .replace(/<title[\s\S]*?<\/title>/gi, '')
                 .replace(/<desc[\s\S]*?<\/desc>/gi, '');

    const isFilled = inner.includes('fill=') || !inner.includes('stroke=');

    return {
      innerXml: inner,
      viewBox,
      isFilled
    };
  }

  /**
   * Formats the extracted geometry into our application's glowing bone rubbing aesthetic.
   */
  wrapToOracleRubbing(geometry) {
    if (!geometry) return null;
    const { innerXml, viewBox, isFilled } = geometry;

    if (isFilled) {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="100%" height="100%" class="oracle-glyph-svg">
  <defs>
    <filter id="bone-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#d4af37" flood-opacity="0.35"/>
    </filter>
  </defs>
  <g fill="currentColor" filter="url(#bone-glow)">
    ${innerXml}
  </g>
</svg>`;
    } else {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="100%" height="100%" class="oracle-glyph-svg">
  <defs>
    <filter id="bone-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#d4af37" flood-opacity="0.35"/>
    </filter>
  </defs>
  <g fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#bone-glow)">
    ${innerXml}
  </g>
</svg>`;
    }
  }

  /**
   * Scans a list of characters and pre-populates the cache.
   */
  async syncBatch(charList, stages = ['oracle', 'bronze', 'seal']) {
    console.log(`[WikimediaScraper] Beginning batch sync for ${charList.length} characters...`);
    let successCount = 0;

    for (const char of charList) {
      for (const stage of stages) {
        if (this.hasCached(char, stage)) {
          successCount++;
          continue;
        }
        const svg = await this.fetchSvg(char, stage);
        if (svg) {
          successCount++;
          console.log(`✓ Fetched ${char} (${stage})`);
        }
        // Small delay to be polite to Wikipedia API
        await new Promise(r => setTimeout(r, 150));
      }
    }
    console.log(`[WikimediaScraper] Sync completed. Cached items: ${successCount}`);
  }
}

// CLI test runner
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const scraper = new WikimediaScraper();
  const targetChar = process.argv[2] || '天';
  console.log(`Testing automated scraper for: ${targetChar}`);
  scraper.fetchSvg(targetChar, 'oracle').then(svg => {
    if (svg) {
      const geo = scraper.extractGeometry(svg);
      const wrapped = scraper.wrapToOracleRubbing(geo);
      console.log('✓ Successfully retrieved & wrapped Oracle SVG for', targetChar);
      console.log(wrapped.slice(0, 200) + '...');
    } else {
      console.log('No SVG found on Commons for', targetChar);
    }
  });
}
