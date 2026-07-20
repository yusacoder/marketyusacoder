// Benchmark script to compare the old vs new Favorites implementation behavior
const { PerformanceObserver, performance } = require('perf_hooks');

// Mock localStorage
const store = {
  gm_favorites: JSON.stringify(Array.from({ length: 500 }, (_, i) => `PROD-${i}`))
};
const localStorage = {
  getItem: (key) => store[key] || null,
  setItem: (key, val) => { store[key] = val; }
};

// 1. Old approach: Always parse and look up in Array
const OldFavorites = {
  KEY: 'gm_favorites',
  get() {
    try { return JSON.parse(localStorage.getItem(this.KEY)) || []; }
    catch { return []; }
  },
  has(id) { return this.get().includes(id); }
};

// 2. New optimized Set cache approach
const NewFavorites = {
  KEY: 'gm_favorites',
  _cache: null,

  _initCache() {
    if (this._cache !== null) return;
    try {
      const arr = JSON.parse(localStorage.getItem(this.KEY));
      this._cache = new Set(Array.isArray(arr) ? arr : []);
    } catch {
      this._cache = new Set();
    }
  },

  has(id) {
    this._initCache();
    return this._cache.has(id);
  }
};

const RUNS = 10000;

console.log(`Starting performance benchmark (${RUNS} operations)...`);

// Benchmark Old approach
const startOld = performance.now();
for (let i = 0; i < RUNS; i++) {
  const targetId = `PROD-${Math.floor(Math.random() * 600)}`;
  OldFavorites.has(targetId);
}
const endOld = performance.now();
const durationOld = endOld - startOld;

// Benchmark New approach
const startNew = performance.now();
for (let i = 0; i < RUNS; i++) {
  const targetId = `PROD-${Math.floor(Math.random() * 600)}`;
  NewFavorites.has(targetId);
}
const endNew = performance.now();
const durationNew = endNew - startNew;

console.log(`Old Favorites.has duration: ${durationOld.toFixed(4)} ms`);
console.log(`New Favorites.has (Cached Set) duration: ${durationNew.toFixed(4)} ms`);
console.log(`Performance improvement: ~${(durationOld / durationNew).toFixed(1)}x faster`);
