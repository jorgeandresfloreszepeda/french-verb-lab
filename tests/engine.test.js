// engine.test.js — tests for js/engine.js
import { describe, it, expect } from 'vitest';
import { nextExercise, checkAnswer } from '../js/engine.js';
import { VERBS } from '../js/data.js';

const PRONOUNS = ["je", "tu", "il/elle", "nous", "vous", "ils/elles"];

// Deterministic rng: cycles through 0.0, 0.1, 0.2, ... so picks differ per call
function makeSeededRng(sequence) {
  let i = 0;
  return () => sequence[i++ % sequence.length];
}

describe('engine.js — nextExercise()', () => {
  // P2: Sin repetición de pronombre dentro del ciclo
  it('P2: 6 llamadas consecutivas desde estado null producen los 6 pronombres distintos', () => {
    // rng values spread across [0,1) to hit different indices across 6 calls
    const rng = makeSeededRng([0.0, 0.17, 0.33, 0.5, 0.67, 0.83]);
    let state = null;
    const pronouns = [];

    for (let i = 0; i < 6; i++) {
      const { exercise, nextState } = nextExercise('être', 'présent', state, rng);
      pronouns.push(exercise.pronoun);
      state = nextState;
    }

    expect(new Set(pronouns).size).toBe(6);
    expect(pronouns.sort()).toEqual([...PRONOUNS].sort());
  });

  // P3: Anti-colisión entre ciclos
  it('P3: el primer pronombre del nuevo ciclo ≠ el último del ciclo anterior', () => {
    const rng = makeSeededRng([0.0, 0.17, 0.33, 0.5, 0.67, 0.83, 0.1]);
    let state = null;
    let lastPronounOfCycle;

    // Complete first full cycle of 6
    for (let i = 0; i < 6; i++) {
      const { exercise, nextState } = nextExercise('être', 'présent', state, rng);
      lastPronounOfCycle = exercise.pronoun;
      state = nextState;
    }

    // First call of the new cycle
    const { exercise: firstOfNewCycle } = nextExercise('être', 'présent', state, rng);

    expect(firstOfNewCycle.pronoun).not.toBe(lastPronounOfCycle);
  });
});

describe('engine.js — checkAnswer()', () => {
  const etre = { verb: 'être', tense: 'présent', pronoun: 'je' };
  const etreVous = { verb: 'être', tense: 'présent', pronoun: 'vous' };

  // P4: Normalización no penaliza espaciado ni capitalización
  it('P4: "  SUIS " con être/présent/je → correcto', () => {
    expect(checkAnswer(etre, '  SUIS ')).toEqual({ resultado: 'correcto' });
  });

  it('P4: "suis" con être/présent/je → correcto', () => {
    expect(checkAnswer(etre, 'suis')).toEqual({ resultado: 'correcto' });
  });

  // P5: Los acentos son obligatorios
  it('P5: "etes" con être/présent/vous → incorrecto (acento requerido)', () => {
    const result = checkAnswer(etreVous, 'etes');
    expect(result.resultado).toBe('incorrecto');
  });

  it('P5: "êtes" con être/présent/vous → correcto', () => {
    expect(checkAnswer(etreVous, 'êtes')).toEqual({ resultado: 'correcto' });
  });

  // P6: Respuesta incorrecta devuelve la forma canónica intacta
  it('P6: esperado en resultado incorrecto es idéntico byte a byte a la forma en VERBS', () => {
    const canonical = VERBS['être']['présent']['vous'];
    const result = checkAnswer(etreVous, 'etes');
    expect(result.esperado).toBe(canonical);
  });

  // P7: Entrada vacía o solo espacios siempre es incorrecta
  it('P7: "" → incorrecto con esperado poblado', () => {
    const result = checkAnswer(etre, '');
    expect(result.resultado).toBe('incorrecto');
    expect(result.esperado).toBe(VERBS['être']['présent']['je']);
  });

  it('P7: "   " → incorrecto con esperado poblado', () => {
    const result = checkAnswer(etre, '   ');
    expect(result.resultado).toBe('incorrecto');
    expect(result.esperado).toBe(VERBS['être']['présent']['je']);
  });
});
