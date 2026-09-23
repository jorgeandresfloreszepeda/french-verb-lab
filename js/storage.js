// storage.js — localStorage read/write (only module allowed to access localStorage)

const SCORE_KEY = 'fvl_score';

const DEFAULT_SCORE = { correct: 0, total: 0 };

/**
 * Reads and parses the score from localStorage.
 * Returns { correct: 0, total: 0 } if the key is absent or the stored value is invalid JSON.
 * @returns {{ correct: number, total: number }}
 */
export function loadScore() {
  try {
    const raw = localStorage.getItem(SCORE_KEY);
    if (raw === null) return { ...DEFAULT_SCORE };
    return JSON.parse(raw);
  } catch (err) {
    console.warn('storage.js: error al leer la puntuación desde localStorage', err);
    return { ...DEFAULT_SCORE };
  }
}

/**
 * Persists the score to localStorage immediately.
 * Silently warns (via console.warn) if storage is unavailable (private mode, quota exceeded).
 * @param {{ correct: number, total: number }} score
 */
export function saveScore(score) {
  try {
    localStorage.setItem(SCORE_KEY, JSON.stringify(score));
  } catch (err) {
    console.warn('storage.js: error al guardar la puntuación en localStorage', err);
  }
}

/**
 * Resets the persisted score to zero.
 */
export function resetScore() {
  saveScore({ correct: 0, total: 0 });
}
