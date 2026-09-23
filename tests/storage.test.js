// storage.test.js — tests for js/storage.js
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { loadScore, saveScore, resetScore } from '../js/storage.js';

// Map-backed localStorage stub
function makeLocalStorageStub() {
  const store = new Map();
  return {
    getItem: (key) => store.has(key) ? store.get(key) : null,
    setItem: (key, value) => store.set(key, String(value)),
    removeItem: (key) => store.delete(key),
    clear: () => store.clear(),
  };
}

describe('storage.js', () => {
  beforeEach(() => {
    // Replace the global localStorage with a clean stub before each test
    vi.stubGlobal('localStorage', makeLocalStorageStub());
  });

  describe('loadScore()', () => {
    it('devuelve { correct: 0, total: 0 } cuando localStorage está vacío', () => {
      expect(loadScore()).toEqual({ correct: 0, total: 0 });
    });

    it('devuelve { correct: 0, total: 0 } cuando el JSON almacenado es inválido', () => {
      localStorage.setItem('fvl_score', 'esto-no-es-json');
      expect(loadScore()).toEqual({ correct: 0, total: 0 });
    });
  });

  describe('saveScore() + loadScore() — round-trip', () => {
    it('persiste y recupera los valores correctamente', () => {
      saveScore({ correct: 3, total: 5 });
      expect(loadScore()).toEqual({ correct: 3, total: 5 });
    });

    it('sobrescribe una puntuación previa', () => {
      saveScore({ correct: 1, total: 2 });
      saveScore({ correct: 7, total: 10 });
      expect(loadScore()).toEqual({ correct: 7, total: 10 });
    });
  });

  describe('resetScore()', () => {
    it('escribe { correct: 0, total: 0 } después de una puntuación positiva', () => {
      saveScore({ correct: 14, total: 20 });
      resetScore();
      expect(loadScore()).toEqual({ correct: 0, total: 0 });
    });

    it('no lanza errores si el almacén ya estaba vacío', () => {
      expect(() => resetScore()).not.toThrow();
      expect(loadScore()).toEqual({ correct: 0, total: 0 });
    });
  });

  describe('manejo de errores de localStorage', () => {
    it('loadScore() advierte con console.warn y devuelve el valor por defecto si getItem lanza', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      vi.stubGlobal('localStorage', {
        getItem: () => { throw new Error('acceso denegado'); },
        setItem: () => {},
      });
      expect(loadScore()).toEqual({ correct: 0, total: 0 });
      expect(warnSpy).toHaveBeenCalled();
      warnSpy.mockRestore();
    });

    it('saveScore() advierte con console.warn si setItem lanza (modo privado / cuota)', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      vi.stubGlobal('localStorage', {
        getItem: () => null,
        setItem: () => { throw new DOMException('QuotaExceededError'); },
      });
      expect(() => saveScore({ correct: 1, total: 1 })).not.toThrow();
      expect(warnSpy).toHaveBeenCalled();
      warnSpy.mockRestore();
    });
  });
});
