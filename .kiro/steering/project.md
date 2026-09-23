# Project Steering

## Purpose

This project is an educational French verb conjugation practice website.

## Technology

Use:
- HTML5
- CSS3
- vanilla JavaScript

Avoid frameworks unless explicitly requested.

## Architecture

Keep:
- conjugation data separate from UI;
- application logic separate from DOM rendering;
- persistence isolated behind a small storage abstraction.

## AWS

The first version must be deployable as a static website.

Do not introduce:
- EC2
- Lambda
- API Gateway
- RDS
- DynamoDB
- Cognito

unless a requirement explicitly justifies the service.

## Quality

Prefer:
- small functions;
- descriptive names;
- comments only where they add value;
- deterministic behavior;
- accessible HTML;
- responsive CSS.

## Security

Never create or commit:
- credentials;
- access keys;
- API keys;
- passwords;
- secrets.

Never recommend putting AWS credentials in browser JavaScript.

## Testing

Conjugation logic must be testable without requiring a browser DOM.

## Language

User-facing content should be in French.

Code identifiers and technical documentation should be in English unless there is a strong reason otherwise.

## Agent behavior

Before making large architectural changes:
- explain the reason;
- identify the files affected;
- keep the solution consistent with the current architecture.

Do not add dependencies without explaining why they are necessary.