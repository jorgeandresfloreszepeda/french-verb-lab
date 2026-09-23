// ui.js — DOM rendering and event handling
// Entry point: wired via DOMContentLoaded. No exported functions.

import { VERB_LIST, TENSE_LIST } from './data.js';
import { nextExercise, checkAnswer } from './engine.js';
import { loadScore, saveScore, resetScore } from './storage.js';

// ── Module-level state ────────────────────────────────────────────────────────

let currentVerb     = '';
let currentTense    = '';
let currentExercise = null;
let cycleState      = null;
let score           = { correct: 0, total: 0 };

// ── DOM references ────────────────────────────────────────────────────────────

const sectionSelection = document.getElementById('section-selection');
const sectionExercise  = document.getElementById('section-exercise');
const sectionFeedback  = document.getElementById('section-feedback');

const selectVerb       = document.getElementById('select-verb');
const selectTense      = document.getElementById('select-tense');
const btnStart         = document.getElementById('btn-start');
const errorSelection   = document.getElementById('error-selection');

const exercisePrompt   = document.getElementById('exercise-prompt');
const answerInput      = document.getElementById('answer-input');
const btnSubmit        = document.getElementById('btn-submit');

const feedbackIcon     = document.getElementById('feedback-icon');
const feedbackMessage  = document.getElementById('feedback-message');
const feedbackExpected = document.getElementById('feedback-expected');
const btnContinue      = document.getElementById('btn-continue');

const scoreText        = document.getElementById('score-text');
const btnReset         = document.getElementById('btn-reset');

// ── Helpers ───────────────────────────────────────────────────────────────────

function show(el) { el.hidden = false; }
function hide(el) { el.hidden = true;  }

function appendOptions(selectEl, items) {
  for (const item of items) {
    const opt = document.createElement('option');
    opt.value = item;
    opt.textContent = item;
    selectEl.appendChild(opt);
  }
}

// ── Core functions ────────────────────────────────────────────────────────────

function initSelectors() {
  appendOptions(selectVerb,  VERB_LIST);
  appendOptions(selectTense, TENSE_LIST);
}

function updateScoreDisplay() {
  score = loadScore();
  scoreText.textContent = `${score.correct} correctes / ${score.total} tentatives`;
}

function renderExercise(exercise) {
  const description = `${exercise.verb} — ${exercise.tense} — ${exercise.pronoun}`;
  exercisePrompt.textContent = description;

  const label = document.querySelector('label[for="answer-input"]');
  if (label) label.textContent = `Conjuguez « ${exercise.verb} » au ${exercise.tense} (${exercise.pronoun}) :`;

  answerInput.setAttribute('aria-label',
    `Entrez la forme conjuguée de ${exercise.verb} au ${exercise.tense} pour ${exercise.pronoun}`);
  answerInput.value = '';
}

function loadNextExercise() {
  const { exercise, nextState } = nextExercise(currentVerb, currentTense, cycleState);
  cycleState      = nextState;
  currentExercise = exercise;
  renderExercise(exercise);
  hide(sectionFeedback);
  show(sectionExercise);
  answerInput.focus();
}

function scheduleNext() {
  const timer = setTimeout(loadNextExercise, 1500);
  btnContinue.onclick = () => { clearTimeout(timer); loadNextExercise(); };
}

function showFeedback(result) {
  const { resultado, esperado } = result;

  if (resultado !== 'correcto' && resultado !== 'incorrecto') {
    console.error('ui.js: résultat inattendu du moteur :', resultado);
    return;
  }

  hide(sectionExercise);
  show(sectionFeedback);

  if (resultado === 'correcto') {
    feedbackIcon.setAttribute('aria-label', 'Correct !');
    feedbackIcon.classList.add('feedback--correct');
    feedbackIcon.classList.remove('feedback--incorrect');
    feedbackMessage.textContent = 'Bravo, c\'est correct !';
    feedbackExpected.textContent = '';
  } else {
    feedbackIcon.setAttribute('aria-label', 'Incorrect');
    feedbackIcon.classList.add('feedback--incorrect');
    feedbackIcon.classList.remove('feedback--correct');
    feedbackMessage.textContent = `Incorrect. Votre réponse : « ${answerInput.value} »`;
    feedbackExpected.textContent = `Forme correcte : « ${esperado} »`;
  }

  scheduleNext();
}

function submitAnswer() {
  if (answerInput.value.trim() === '') {
    answerInput.focus();
    return;
  }

  const result   = checkAnswer(currentExercise, answerInput.value);
  const newScore = {
    correct: score.correct + (result.resultado === 'correcto' ? 1 : 0),
    total:   score.total + 1,
  };

  saveScore(newScore);
  score = newScore;
  updateScoreDisplay();
  showFeedback(result);
}

function startSession() {
  const verb  = selectVerb.value;
  const tense = selectTense.value;

  if (!verb || !tense) {
    errorSelection.textContent = !verb && !tense
      ? 'Veuillez choisir un verbe et un temps verbal.'
      : !verb
        ? 'Veuillez choisir un verbe.'
        : 'Veuillez choisir un temps verbal.';
    show(errorSelection);
    return;
  }

  hide(errorSelection);
  currentVerb  = verb;
  currentTense = tense;
  cycleState   = null;

  hide(sectionSelection);
  show(sectionExercise);
  hide(sectionFeedback);

  const { exercise, nextState } = nextExercise(verb, tense, null);
  cycleState      = nextState;
  currentExercise = exercise;
  renderExercise(exercise);
  answerInput.focus();
}

// ── Event wiring ──────────────────────────────────────────────────────────────

function wireEvents() {
  btnStart.addEventListener('click', startSession);
  btnSubmit.addEventListener('click', submitAnswer);
  answerInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') submitAnswer();
  });
  btnReset.addEventListener('click', () => {
    if (confirm('Voulez-vous réinitialiser votre score ?')) {
      resetScore();
      updateScoreDisplay();
    }
  });
}

// ── Bootstrap ─────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  initSelectors();
  updateScoreDisplay();
  show(sectionSelection);
  hide(sectionExercise);
  hide(sectionFeedback);
  wireEvents();
});
