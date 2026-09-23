# Project Steering

## Purpose

This project is an educational French verb conjugation practice website.

## Technology

Use:
- HTML5
- CSS3
- vanilla JavaScript (ES modules, no transpilation)

Avoid libraries and frameworks unless explicitly requested. If a dependency is added, explain why it is necessary.

## Architecture

Keep:
- conjugation data separate from UI;
- application logic separate from DOM rendering;
- `localStorage` access confined to a single module.

Suggested file layout:
```
index.html
css/style.css
js/data.js      # verb and conjugation data
js/engine.js    # exercise logic and answer validation
js/storage.js   # localStorage read/write
js/ui.js        # DOM rendering and event handling
```

## AWS

Deploy as a static website (S3 + CloudFront or equivalent). Do not introduce backend services (compute, databases, auth) unless a requirement explicitly justifies them.

## Quality

- Functions should fit in roughly 20 lines or fewer; extract helpers when they grow larger.
- Use descriptive names; add comments only to explain non-obvious decisions, not to restate the code.
- Prefer deterministic behavior.
- Write accessible HTML: use semantic elements, `<label>` for inputs, and French text for all user-visible content including `aria-label` and `alt` attributes.
- Use responsive CSS.

## Input validation

When checking a user's answer:
- trim leading and trailing whitespace;
- compare case-insensitively;
- do not strip accents — `é`, `è`, and `ê` are distinct and must be preserved.

## Security

Never create or commit credentials, access keys, API keys, passwords, or secrets. Never put AWS credentials in browser JavaScript.

## Testing

Conjugation logic must be testable without a browser DOM. Keep `engine.js` free of DOM dependencies so it can be imported directly by a test runner.

## Language

User-facing content (labels, instructions, feedback, `aria-label`, `alt` text) should be in French. Code identifiers and technical documentation should be in English.

## Agent behavior

Before making changes that affect more than one file or alter the module boundaries described above, explain the reason and list the files affected.
