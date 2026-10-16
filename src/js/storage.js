/**
 * LocalStorage wrapper with error handling and fallback
 */

const STORAGE_KEY = 'oracle_bone_game_data_v1';

export class StorageService {
  static load() {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return null;
      }
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      console.warn('StorageService load error:', e);
      return null;
    }
  }

  static save(data) {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return false;
      }
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (e) {
      console.warn('StorageService save error:', e);
      return false;
    }
  }

  static clear() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.warn('StorageService clear error:', e);
    }
  }
}
