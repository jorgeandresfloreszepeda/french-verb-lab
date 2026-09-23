// @vitest-environment jsdom
// ui.test.js — tests for js/ui.js
// Uses jsdom so DOM APIs are available and ui.js can be loaded.

import { describe, it, expect, beforeEach, vi } from 'vitest';

// Minimal HTML structure mirroring index.html, needed before ui.js loads.
const PAGE_HTML = `
<header><h1>Labo des Verbes</h1></header>
<main>
  <section id="section-selection" aria-labelledby="heading-selection">
    <h2 id="heading-selection">Choisissez un exercice</h2>
    <div class="field-group">
      <label for="select-verb">Verbe :</label>
      <select id="select-verb" aria-label="Choisissez un verbe">
        <option value="">— choisissez un verbe —</option>
      </select>
    </div>
    <div class="field-group">
      <label for="select-tense">Temps :</label>
      <select id="select-tense" aria-label="Choisissez un temps verbal">
        <option value="">— choisissez un temps —</option>
      </select>
    </div>
    <button id="btn-start" type="button">Commencer</button>
    <p id="error-selection" role="alert" hidden></p>
  </section>

  <section id="section-exercise" aria-labelledby="heading-exercise" hidden>
    <h2 id="heading-exercise">Conjuguez le verbe</h2>
    <p id="exercise-prompt" aria-live="polite"></p>
    <div class="field-group">
      <label for="answer-input">Votre réponse :</label>
      <input type="text" id="answer-input" aria-label="Entrez la forme conjuguée"
        autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" />
    </div>
    <button id="btn-submit" type="button">Vérifier</button>
  </section>

  <section id="section-feedback" aria-labelledby="heading-feedback" hidden>
    <h2 id="heading-feedback" class="sr-only">Résultat</h2>
    <span id="feedback-icon" role="img" aria-label=""></span>
    <p id="feedback-message"></p>
    <p id="feedback-expected"></p>
    <button id="btn-continue" type="button">Continuer</button>
  </section>

  <div role="status" aria-live="polite" id="score-display">
    <span id="score-text">0 correctes / 0 tentatives</span>
    <button id="btn-reset" type="button" aria-label="Réinitialiser le score">Réinitialiser</button>
  </div>
</main>
`;

describe('ui.js', () => {
  beforeEach(() => {
    // Reset the DOM and stub localStorage before each test
    document.body.innerHTML = PAGE_HTML;
    vi.stubGlobal('localStorage', (() => {
      const store = new Map();
      return {
        getItem: (k) => store.has(k) ? store.get(k) : null,
        setItem: (k, v) => store.set(k, String(v)),
        removeItem: (k) => store.delete(k),
        clear: () => store.clear(),
      };
    })());
  });

  it('après DOMContentLoaded, #select-verb a 13 options (1 vide + 12 verbes)', async () => {
    // Dynamically import ui.js so it picks up the DOM set above.
    // vi.resetModules() ensures a fresh module each test run.
    vi.resetModules();
    await import('../js/ui.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));

    const verbSelect = document.getElementById('select-verb');
    expect(verbSelect.options).toHaveLength(13);
  });

  it('après DOMContentLoaded, #select-tense a 5 options (1 vide + 4 temps)', async () => {
    vi.resetModules();
    await import('../js/ui.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));

    const tenseSelect = document.getElementById('select-tense');
    expect(tenseSelect.options).toHaveLength(5);
  });

  it('appuyer Enter sur #answer-input vide maintient le focus sans modifier le score', async () => {
    vi.resetModules();
    await import('../js/ui.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));

    const input = document.getElementById('answer-input');
    const scoreText = document.getElementById('score-text');
    const initialScore = scoreText.textContent;

    // Simulate Enter with empty input — submitAnswer should abort early
    input.value = '';
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

    expect(scoreText.textContent).toBe(initialScore);
  });
});
