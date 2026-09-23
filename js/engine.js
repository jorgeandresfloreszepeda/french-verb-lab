// engine.js — exercise logic and answer validation
// Pure functions only — no DOM, no localStorage references.

import { VERBS } from './data.js';

const PRONOUNS = ["je", "tu", "il/elle", "nous", "vous", "ils/elles"];

/** Initialise a blank cycle state when none is provided. */
function initState() {
  return { used: [], lastPronoun: null };
}

/**
 * Pick a random element from an array using the provided rng.
 * rng must be a function returning a float in [0, 1).
 */
function pick(arr, rng) {
  return arr[Math.floor(rng() * arr.length)];
}

/**
 * Select the next pronoun for an exercise, cycling through all six without
 * repeating and avoiding an immediate repeat across cycle boundaries.
 *
 * @param {string} verb
 * @param {string} tense
 * @param {{ used: string[], lastPronoun: string|null }|null} cycleState
 * @param {() => number} rng  — injectable for deterministic tests
 * @returns {{ exercise: { verb, tense, pronoun }, nextState }}
 */
export function nextExercise(verb, tense, cycleState, rng = Math.random) {
  let { used, lastPronoun } = cycleState ?? initState();

  // Start a new cycle when all six pronouns have been used.
  if (used.length === PRONOUNS.length) {
    used = [];
  }

  // Candidates = unused pronouns, minus lastPronoun when starting a fresh cycle.
  const candidates = PRONOUNS.filter(
    p => !used.includes(p) && (used.length > 0 || p !== lastPronoun)
  );

  // If the anti-collision filter left no candidates (only happens when all remaining
  // is exactly lastPronoun after a reset), fall back to all unused pronouns.
  const pool = candidates.length > 0 ? candidates : PRONOUNS.filter(p => !used.includes(p));

  const pronoun = pick(pool, rng);
  const nextState = { used: [...used, pronoun], lastPronoun: pronoun };

  return { exercise: { verb, tense, pronoun }, nextState };
}

/**
 * Validate the student's raw input against the canonical conjugation form.
 *
 * Normalisation: trim + toLowerCase.  Accents are preserved and significant.
 *
 * @param {{ verb: string, tense: string, pronoun: string }} exercise
 * @param {string} rawInput
 * @returns {{ resultado: 'correcto'|'incorrecto', esperado?: string }}
 */
export function checkAnswer(exercise, rawInput) {
  const canonical = VERBS[exercise.verb][exercise.tense][exercise.pronoun];

  if (rawInput.trim() === '') {
    return { resultado: 'incorrecto', esperado: canonical };
  }

  const normalised = rawInput.trim().toLowerCase();
  const expected   = canonical.trim().toLowerCase();

  if (normalised === expected) {
    return { resultado: 'correcto' };
  }

  return { resultado: 'incorrecto', esperado: canonical };
}
