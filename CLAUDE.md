# IDCC Reference Architecture

LikeC4 model of the current and target architectures for the IDCC programme (Industrialising and Digitalising Construction Challenge): off-the-shelf and new systems, and how they connect to social housing delivery in Liverpool City Region and, later, England.

## Diagram format

- **LikeC4 is the only diagram format.** All models and views live in `.c4` files. Never produce Structurizr DSL, PlantUML, Mermaid or draw.io as source of truth; those are export targets only (`likec4 export` / `likec4 gen`).
- Use the `likec4-dsl` skill for all DSL syntax, CLI usage and validation.
- Use the `enterprise-architecture` skill for **method only**: ArchiMate-style layering (business / application / technology), TOGAF baseline vs target and gap analysis, capability mapping, ADRs (MADR) and design reviews. When it suggests a Structurizr workspace or diagram, express the same content in LikeC4 instead.
- After editing `.c4` files, run `likec4 validate`.

## Model conventions

- Vocabulary: every element kind, relationship kind and tag is declared in `model/specification.c4`; the terms behind them are defined in `GLOSSARY.md` and the decisions in `docs/adr/`. A new tag or information type needs a glossary entry first.
- Layout: `model/roles.c4`, `model/capabilities.c4`, `model/standards.c4`, one file per system in `model/systems/<system>.c4` (its datasets, software products and outgoing flows), views in `views/`.
- Identifiers are camelCase, flat at the top level and named for the role; never put a stage, roadmap state, scope, vendor or organisation in a system's identifier.
- Every element carries `source` and `reviewed` metadata; software products also `vendor` and `usedBy`; flows `frequency` and `standards`; standards `publisher` and `version`.
- Every view applies `global style idccConventions` (`model/styles.c4`).
- Preview locally with the `likec4` launch config (`likec4 start`, http://localhost:5173).

## Agent skills

### Issue tracker

Local markdown files under `backlog/`, versioned in git, plus standing registers for assumptions and open questions. See `docs/agents/issue-tracker.md`.

### Triage labels

The five default roles (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`), recorded as a `Status:` line in each backlog file. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `GLOSSARY.md` and `docs/adr/` at the repo root, with a required ADR header. See `docs/agents/domain.md`.
