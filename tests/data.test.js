// data.test.js — tests for js/data.js
import { describe, it, expect } from 'vitest';
import { VERB_LIST, TENSE_LIST, VERBS } from '../js/data.js';

const EXPECTED_PRONOUNS = ["je", "tu", "il/elle", "nous", "vous", "ils/elles"];

describe('data.js', () => {
  it('VERB_LIST contiene exactamente 12 verbos', () => {
    expect(VERB_LIST).toHaveLength(12);
  });

  it('TENSE_LIST contiene exactamente 4 tiempos verbales', () => {
    expect(TENSE_LIST).toHaveLength(4);
  });

  it('cada combinación (verbo, tiempo) tiene exactamente los 6 pronombres esperados', () => {
    for (const verb of VERB_LIST) {
      for (const tense of TENSE_LIST) {
        const keys = Object.keys(VERBS[verb][tense]);
        expect(keys.sort()).toEqual([...EXPECTED_PRONOUNS].sort());
      }
    }
  });

  it('el módulo se importa sin errores en Node.js (smoke test)', () => {
    expect(VERBS).toBeDefined();
    expect(typeof VERBS).toBe('object');
  });
});
