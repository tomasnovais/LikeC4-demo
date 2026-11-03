# IDCC Reference Architecture

LikeC4 model of the current and target architectures for the IDCC programme (Industrialising and Digitalising Construction Challenge): off-the-shelf and new systems, and how they connect to social housing delivery in Liverpool City Region and, later, England.

## Diagram format

- **LikeC4 is the only diagram format.** All models and views live in `.c4` files. Never produce Structurizr DSL, PlantUML, Mermaid or draw.io as source of truth; those are export targets only (`likec4 export` / `likec4 gen`).
- Use the `likec4-dsl` skill for all DSL syntax, CLI usage and validation.
- Use the `enterprise-architecture` skill for **method only**: ArchiMate-style layering (business / application / technology), TOGAF baseline vs target and gap analysis, capability mapping, ADRs (MADR) and design reviews. When it suggests a Structurizr workspace or diagram, express the same content in LikeC4 instead.
- After editing `.c4` files, run `likec4 validate`.

## Model conventions

- Vocabulary: every element kind, relationship kind and tag is declared in `model/specification.c4`; the terms behind them are defined in `GLOSSARY.md` and the decisions in `docs/adr/`. A new tag or information type needs a glossary entry first.
- Layout: `model/roles.c4`, `model/capabilities.c4`, `model/standards.c4`, one file per system in `model/systems/<system>.c4` (its datasets, software products, outgoing flows and its zoom view), the map in `views/map.c4`, lenses in `views/lenses.c4`.
- Views follow ADR 0007, one map with zoom views and lenses: never define a view from scratch except the map (`index`). A new system file ends with its `<systemId>Zoom` view (copy an existing one); every other view `extends index` and only filters it or opens one information type's datasets (`include * where tag is #info-…`).
- Identifiers are camelCase, flat at the top level and named for the role; never put a stage, roadmap state, scope, vendor or organisation in a system's identifier.
- Every element carries `source` and `reviewed` metadata; software products also `vendor` and `usedBy`; flows `frequency` and `standards`; standards `publisher` and `version`.
- The map and every zoom view apply `global style idccConventions` (`model/styles.c4`); lenses inherit it from the map.
- No disconnected elements: a role is only added once it operates a system, a capability once a system supports it, a standard once a dataset conforms to it. A role carries the stage tags of the systems it operates, so lifecycle lenses filter roles and systems together. `implicitViews` stays off: it adds an "Auto" view for every element and buries the map and lenses in the view list.
- Visual conventions are documented in `docs/legend.md`: structural relationships (operates, supports, conforms to) are solid grey and labelled by their kind's default title; information flows are always dotted (api green, file transfer blue, re-keying red). Change the legend whenever the specification's styles change.
- Preview locally with the `likec4` launch config (`likec4 start`, http://localhost:5173).
- For the online LikeC4 playground, run `node scripts/build-playground.mjs` and paste `dist/idcc-playground.c4` (generated, not committed; `dist/` is excluded in `likec4.config.json` so LikeC4 doesn't read it as a second copy of the model). Config-only settings (relationship browser scope) and relative links don't carry over. When adding a new folder of `.c4` files, add it to the script's build order; the script fails if a file is missed.

## Agent skills

### Issue tracker

Local markdown files under `backlog/`, versioned in git, plus standing registers for assumptions and open questions. See `docs/agents/issue-tracker.md`.

### Triage labels

The five default roles (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`), recorded as a `Status:` line in each backlog file. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `GLOSSARY.md` and `docs/adr/` at the repo root, with a required ADR header. See `docs/agents/domain.md`.
