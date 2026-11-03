# Issue tracker: Local Markdown

Issues and specs for this repo live as markdown files in `backlog/`, versioned in git.

## Conventions

- One feature per directory: `backlog/<feature-slug>/`
- The spec is `backlog/<feature-slug>/spec.md`
- Implementation issues are one file per ticket at `backlog/<feature-slug>/issues/<NN>-<slug>.md`, numbered from `01`, never a single combined tickets file
- Triage state is recorded as a `Status:` line near the top of each issue file (see `triage-labels.md` for the role strings)
- Comments and conversation history append to the bottom of the file under a `## Comments` heading

## When a skill says "publish to the issue tracker"

Create a new file under `backlog/<feature-slug>/` (creating the directory if needed).

## When a skill says "fetch the relevant ticket"

Read the file at the referenced path. The user will normally pass the path or the issue number directly.

## Wayfinding operations

Used by `/wayfinder`. The **map** is a file with one **child** file per ticket.

- **Map**: `backlog/<effort>/map.md` (the Notes / Decisions-so-far / Fog body).
- **Child ticket**: `backlog/<effort>/issues/NN-<slug>.md`, numbered from `01`, with the question in the body. A `Type:` line records the ticket type (`research`/`prototype`/`grilling`/`task`); a `Status:` line records `claimed`/`resolved`.
- **Blocking**: a `Blocked by: NN, NN` line near the top. A ticket is unblocked when every file it lists is `resolved`.
- **Frontier**: scan `backlog/<effort>/issues/` for files that are open, unblocked, and unclaimed; first by number wins.
- **Claim**: set `Status: claimed` and save before any work.
- **Resolve**: append the answer under an `## Answer` heading, set `Status: resolved`, then append a context pointer (gist + link) to the map's Decisions-so-far in `map.md`.

## IDCC registers

Two standing registers sit alongside feature work. Number each from `01`; scan the folder for the highest number and increment.

### Assumptions

`backlog/assumptions/NN-<slug>.md`, one assumption per file. Header lines:

- `Type: assumption`
- `Validation: open | validated | invalidated`
- `Owner:` who can confirm or refute it
- `Affects:` LikeC4 element ids (FQNs) and ADR numbers it underpins

Body: the assumption in one or two sentences, and why we are making it. When it is validated or invalidated, record how under `## Outcome`; an invalidated assumption that changes the architecture needs an ADR.

### Open questions

`backlog/questions/NN-<slug>.md`, one question per file. Header lines:

- `Type: open-question`
- `Status:` a triage role from `triage-labels.md`, or `resolved`
- `Owner:` who can answer it (use `/to-questionnaire` when that is an external stakeholder)
- `Affects:` LikeC4 element ids (FQNs) and ADR numbers

Record the answer under `## Answer` and set `Status: resolved`. If the answer is a decision, also write an ADR and link it.
