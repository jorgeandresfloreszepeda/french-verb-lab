// data.js — verb and conjugation data
// All forms verified against Bescherelle / conjugaison.fr

export const VERB_LIST = [
  "être", "avoir", "aller", "faire",
  "parler", "finir", "prendre", "venir",
  "pouvoir", "vouloir", "devoir", "savoir",
];

export const TENSE_LIST = [
  "présent",
  "passé composé",
  "imparfait",
  "futur simple",
];

// Pronouns used as keys throughout the data structure
const PRONOUNS = ["je", "tu", "il/elle", "nous", "vous", "ils/elles"];

export const VERBS = {
  "être": {
    "présent": {
      "je":        "suis",
      "tu":        "es",
      "il/elle":   "est",
      "nous":      "sommes",
      "vous":      "êtes",
      "ils/elles": "sont",
    },
    "passé composé": {
      "je":        "ai été",
      "tu":        "as été",
      "il/elle":   "a été",
      "nous":      "avons été",
      "vous":      "avez été",
      "ils/elles": "ont été",
    },
    "imparfait": {
      "je":        "étais",
      "tu":        "étais",
      "il/elle":   "était",
      "nous":      "étions",
      "vous":      "étiez",
      "ils/elles": "étaient",
    },
    "futur simple": {
      "je":        "serai",
      "tu":        "seras",
      "il/elle":   "sera",
      "nous":      "serons",
      "vous":      "serez",
      "ils/elles": "seront",
    },
  },

  "avoir": {
    "présent": {
      "je":        "ai",
      "tu":        "as",
      "il/elle":   "a",
      "nous":      "avons",
      "vous":      "avez",
      "ils/elles": "ont",
    },
    "passé composé": {
      "je":        "ai eu",
      "tu":        "as eu",
      "il/elle":   "a eu",
      "nous":      "avons eu",
      "vous":      "avez eu",
      "ils/elles": "ont eu",
    },
    "imparfait": {
      "je":        "avais",
      "tu":        "avais",
      "il/elle":   "avait",
      "nous":      "avions",
      "vous":      "aviez",
      "ils/elles": "avaient",
    },
    "futur simple": {
      "je":        "aurai",
      "tu":        "auras",
      "il/elle":   "aura",
      "nous":      "aurons",
      "vous":      "aurez",
      "ils/elles": "auront",
    },
  },

  "aller": {
    "présent": {
      "je":        "vais",
      "tu":        "vas",
      "il/elle":   "va",
      "nous":      "allons",
      "vous":      "allez",
      "ils/elles": "vont",
    },
    "passé composé": {
      "je":        "suis allé",
      "tu":        "es allé",
      "il/elle":   "est allé",
      "nous":      "sommes allés",
      "vous":      "êtes allés",
      "ils/elles": "sont allés",
    },
    "imparfait": {
      "je":        "allais",
      "tu":        "allais",
      "il/elle":   "allait",
      "nous":      "allions",
      "vous":      "alliez",
      "ils/elles": "allaient",
    },
    "futur simple": {
      "je":        "irai",
      "tu":        "iras",
      "il/elle":   "ira",
      "nous":      "irons",
      "vous":      "irez",
      "ils/elles": "iront",
    },
  },

  "faire": {
    "présent": {
      "je":        "fais",
      "tu":        "fais",
      "il/elle":   "fait",
      "nous":      "faisons",
      "vous":      "faites",
      "ils/elles": "font",
    },
    "passé composé": {
      "je":        "ai fait",
      "tu":        "as fait",
      "il/elle":   "a fait",
      "nous":      "avons fait",
      "vous":      "avez fait",
      "ils/elles": "ont fait",
    },
    "imparfait": {
      "je":        "faisais",
      "tu":        "faisais",
      "il/elle":   "faisait",
      "nous":      "faisions",
      "vous":      "faisiez",
      "ils/elles": "faisaient",
    },
    "futur simple": {
      "je":        "ferai",
      "tu":        "feras",
      "il/elle":   "fera",
      "nous":      "ferons",
      "vous":      "ferez",
      "ils/elles": "feront",
    },
  },

  "parler": {
    "présent": {
      "je":        "parle",
      "tu":        "parles",
      "il/elle":   "parle",
      "nous":      "parlons",
      "vous":      "parlez",
      "ils/elles": "parlent",
    },
    "passé composé": {
      "je":        "ai parlé",
      "tu":        "as parlé",
      "il/elle":   "a parlé",
      "nous":      "avons parlé",
      "vous":      "avez parlé",
      "ils/elles": "ont parlé",
    },
    "imparfait": {
      "je":        "parlais",
      "tu":        "parlais",
      "il/elle":   "parlait",
      "nous":      "parlions",
      "vous":      "parliez",
      "ils/elles": "parlaient",
    },
    "futur simple": {
      "je":        "parlerai",
      "tu":        "parleras",
      "il/elle":   "parlera",
      "nous":      "parlerons",
      "vous":      "parlerez",
      "ils/elles": "parleront",
    },
  },

  "finir": {
    "présent": {
      "je":        "finis",
      "tu":        "finis",
      "il/elle":   "finit",
      "nous":      "finissons",
      "vous":      "finissez",
      "ils/elles": "finissent",
    },
    "passé composé": {
      "je":        "ai fini",
      "tu":        "as fini",
      "il/elle":   "a fini",
      "nous":      "avons fini",
      "vous":      "avez fini",
      "ils/elles": "ont fini",
    },
    "imparfait": {
      "je":        "finissais",
      "tu":        "finissais",
      "il/elle":   "finissait",
      "nous":      "finissions",
      "vous":      "finissiez",
      "ils/elles": "finissaient",
    },
    "futur simple": {
      "je":        "finirai",
      "tu":        "finiras",
      "il/elle":   "finira",
      "nous":      "finirons",
      "vous":      "finirez",
      "ils/elles": "finiront",
    },
  },

  "prendre": {
    "présent": {
      "je":        "prends",
      "tu":        "prends",
      "il/elle":   "prend",
      "nous":      "prenons",
      "vous":      "prenez",
      "ils/elles": "prennent",
    },
    "passé composé": {
      "je":        "ai pris",
      "tu":        "as pris",
      "il/elle":   "a pris",
      "nous":      "avons pris",
      "vous":      "avez pris",
      "ils/elles": "ont pris",
    },
    "imparfait": {
      "je":        "prenais",
      "tu":        "prenais",
      "il/elle":   "prenait",
      "nous":      "prenions",
      "vous":      "preniez",
      "ils/elles": "prenaient",
    },
    "futur simple": {
      "je":        "prendrai",
      "tu":        "prendras",
      "il/elle":   "prendra",
      "nous":      "prendrons",
      "vous":      "prendrez",
      "ils/elles": "prendront",
    },
  },

  "venir": {
    "présent": {
      "je":        "viens",
      "tu":        "viens",
      "il/elle":   "vient",
      "nous":      "venons",
      "vous":      "venez",
      "ils/elles": "viennent",
    },
    "passé composé": {
      "je":        "suis venu",
      "tu":        "es venu",
      "il/elle":   "est venu",
      "nous":      "sommes venus",
      "vous":      "êtes venus",
      "ils/elles": "sont venus",
    },
    "imparfait": {
      "je":        "venais",
      "tu":        "venais",
      "il/elle":   "venait",
      "nous":      "venions",
      "vous":      "veniez",
      "ils/elles": "venaient",
    },
    "futur simple": {
      "je":        "viendrai",
      "tu":        "viendras",
      "il/elle":   "viendra",
      "nous":      "viendrons",
      "vous":      "viendrez",
      "ils/elles": "viendront",
    },
  },

  "pouvoir": {
    "présent": {
      "je":        "peux",
      "tu":        "peux",
      "il/elle":   "peut",
      "nous":      "pouvons",
      "vous":      "pouvez",
      "ils/elles": "peuvent",
    },
    "passé composé": {
      "je":        "ai pu",
      "tu":        "as pu",
      "il/elle":   "a pu",
      "nous":      "avons pu",
      "vous":      "avez pu",
      "ils/elles": "ont pu",
    },
    "imparfait": {
      "je":        "pouvais",
      "tu":        "pouvais",
      "il/elle":   "pouvait",
      "nous":      "pouvions",
      "vous":      "pouviez",
      "ils/elles": "pouvaient",
    },
    "futur simple": {
      "je":        "pourrai",
      "tu":        "pourras",
      "il/elle":   "pourra",
      "nous":      "pourrons",
      "vous":      "pourrez",
      "ils/elles": "pourront",
    },
  },

  "vouloir": {
    "présent": {
      "je":        "veux",
      "tu":        "veux",
      "il/elle":   "veut",
      "nous":      "voulons",
      "vous":      "voulez",
      "ils/elles": "veulent",
    },
    "passé composé": {
      "je":        "ai voulu",
      "tu":        "as voulu",
      "il/elle":   "a voulu",
      "nous":      "avons voulu",
      "vous":      "avez voulu",
      "ils/elles": "ont voulu",
    },
    "imparfait": {
      "je":        "voulais",
      "tu":        "voulais",
      "il/elle":   "voulait",
      "nous":      "voulions",
      "vous":      "vouliez",
      "ils/elles": "voulaient",
    },
    "futur simple": {
      "je":        "voudrai",
      "tu":        "voudras",
      "il/elle":   "voudra",
      "nous":      "voudrons",
      "vous":      "voudrez",
      "ils/elles": "voudront",
    },
  },

  "devoir": {
    "présent": {
      "je":        "dois",
      "tu":        "dois",
      "il/elle":   "doit",
      "nous":      "devons",
      "vous":      "devez",
      "ils/elles": "doivent",
    },
    "passé composé": {
      "je":        "ai dû",
      "tu":        "as dû",
      "il/elle":   "a dû",
      "nous":      "avons dû",
      "vous":      "avez dû",
      "ils/elles": "ont dû",
    },
    "imparfait": {
      "je":        "devais",
      "tu":        "devais",
      "il/elle":   "devait",
      "nous":      "devions",
      "vous":      "deviez",
      "ils/elles": "devaient",
    },
    "futur simple": {
      "je":        "devrai",
      "tu":        "devras",
      "il/elle":   "devra",
      "nous":      "devrons",
      "vous":      "devrez",
      "ils/elles": "devront",
    },
  },

  "savoir": {
    "présent": {
      "je":        "sais",
      "tu":        "sais",
      "il/elle":   "sait",
      "nous":      "savons",
      "vous":      "savez",
      "ils/elles": "savent",
    },
    "passé composé": {
      "je":        "ai su",
      "tu":        "as su",
      "il/elle":   "a su",
      "nous":      "avons su",
      "vous":      "avez su",
      "ils/elles": "ont su",
    },
    "imparfait": {
      "je":        "savais",
      "tu":        "savais",
      "il/elle":   "savait",
      "nous":      "savions",
      "vous":      "saviez",
      "ils/elles": "savaient",
    },
    "futur simple": {
      "je":        "saurai",
      "tu":        "sauras",
      "il/elle":   "saura",
      "nous":      "saurons",
      "vous":      "saurez",
      "ils/elles": "sauront",
    },
  },
};

// Integrity check — runs at module load time.
// Throws early with a descriptive message if any pronoun key is missing,
// so the app fails fast rather than silently producing wrong exercises.
for (const verb of VERB_LIST) {
  for (const tense of TENSE_LIST) {
    for (const pronoun of PRONOUNS) {
      if (!VERBS[verb]?.[tense]?.[pronoun]) {
        throw new Error(
          `data.js: missing form for '${verb}' / '${tense}': missing '${pronoun}'`
        );
      }
    }
  }
}
