// Mock window.AudioContext and window.localStorage for test environments
if (typeof window !== 'undefined') {
  if (!window.AudioContext) {
    window.AudioContext = class MockAudioContext {
      constructor() {
        this.state = 'running';
        this.currentTime = 0;
        this.destination = {};
      }
      createOscillator() {
        return {
          type: 'sine',
          frequency: { setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} },
          connect: () => {},
          start: () => {},
          stop: () => {}
        };
      }
      createGain() {
        return {
          gain: { setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {}, linearRampToValueAtTime: () => {} },
          connect: () => {}
        };
      }
      resume() {
        return Promise.resolve();
      }
    };
  }

  // Ensure robust localStorage mock
  const storageMap = new Map();
  const mockStorage = {
    getItem: (key) => (storageMap.has(key) ? storageMap.get(key) : null),
    setItem: (key, val) => storageMap.set(key, String(val)),
    removeItem: (key) => storageMap.delete(key),
    clear: () => storageMap.clear(),
    get length() {
      return storageMap.size;
    },
    key: (i) => Array.from(storageMap.keys())[i] || null
  };

  Object.defineProperty(window, 'localStorage', {
    value: mockStorage,
    writable: true,
    configurable: true
  });
  globalThis.localStorage = mockStorage;
}
