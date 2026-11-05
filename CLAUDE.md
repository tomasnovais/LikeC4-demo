# Food Delivery Reference Architecture

LikeC4 model of UK food delivery: the actor groups and systems involved, the information they hold, how it moves, and who holds power over whom. It exists as a live demonstration of the method and the tool. Real product names are blended with simplified flows and invented figures.

This is the `demo/food-delivery` branch. It never merges back to `main`: improvements to scripts or method go to `main` first and are cherry-picked here.

## Diagram format

- **LikeC4 is the only diagram format.** All models and views live in `.c4` files. Never produce Structurizr DSL, PlantUML, Mermaid or draw.io as source of truth; those are export targets only (`likec4 export` / `likec4 gen`).
- Use the `likec4-dsl` skill for all DSL syntax, CLI usage and validation.
- Use the `enterprise-architecture` skill for **method only**: ArchiMate-style layering (business / application / technology), capability mapping, gap analysis, ADRs (MADR) and design reviews. When it suggests a Structurizr workspace or diagram, express the same content in LikeC4 instead.
- After editing `.c4` files, run `likec4 validate` and `node scripts/sync-relationship-data.mjs --check`.

## Model conventions

- Vocabulary: every element kind, relationship kind and tag is declared in `model/specification.c4`; the terms behind them are defined in `GLOSSARY.md` and the decisions in `docs/adr/`. A new tag or information type needs a glossary entry first.
- Layout: `model/actorGroups.c4`, `model/powerAndMoney.c4`, `model/capabilities.c4`, `model/standards.c4`, `model/deployment.c4`, one file per system in `model/systems/<system>.c4` (its datasets, software products, outgoing flows and its zoom view), the map in `views/map.c4`, lenses in `views/lenses.c4`, step-through views in `views/stepThroughs.c4`, relationship data in `data/relationship-data.csv`.
- Views follow ADR 0004, one map with zoom views and lenses: define from scratch only the map (`index`), step-through views (`dynamic view`) and the infrastructure view (`deployment view`). A new system file ends with its `<systemId>Zoom` view (copy an existing one); every lens `extends index`.
- Identifiers are camelCase, flat at the top level and named for the role; never put a vendor or organisation in a system's identifier. Named actors and software products sit inside an actor group or system (ADR 0003). An actor keeps its everyday name, unless it runs software with the same brand: then the actor takes its registered name and the software keeps the brand.
- Every element carries `source` metadata, set to a URL, `Illustrative` or `Invented`; software products also `vendor` and `usedBy`; flows `schemaName`, and `standards` where they follow one; power relationships `basis`; standards `publisher` and `version`.
- Every flow has an example schema as a Markdown table in its description. Labels carry no values. Volumes, fees and the like live in `data/relationship-data.csv`, the source of truth, with one row per relationship identified by source, kind and target; a BI tool can read the same file (`docs/bi-import.md`). `node scripts/sync-relationship-data.mjs` writes each row into a table headed "Relationship data" in the description (ADR 0005). It must be run after every change to the CSV, because nothing runs it automatically and the diagram otherwise keeps the old values. Change the CSV, never those tables: the next run overwrites them. Add `--watch` to follow saves, or `--check` to fail if the two differ. `technology` holds only a flow's mechanism, inherited from its kind, or a power relationship's basis. Invented values stay on actor groups and generic systems, never on a named company.
- Only triple-quoted strings render as Markdown, including step `notes`.
- The map and every zoom view apply `global style conventions` (`model/styles.c4`); lenses inherit it from the map.
- No disconnected elements: an actor group is only added once it operates or uses a system, a standard once a dataset conforms to it, and a capability once a system supports it, unless it is tagged `#gap`. `implicitViews` stays off: it adds an "Auto" view for every element and buries the map and lenses in the view list.
- Visual conventions are documented in `docs/legend.md`: structural relationships are solid grey and labelled; information flows are always dotted (API green, file transfer blue, re-keying red). Change the legend whenever the specification's styles change.
- Open questions and assumptions live as files in `backlog/` and are linked from what they affect, which also carries an `#open-question` or `#assumption` tag. Relative links show on elements but do not open in `likec4 start`.
- Preview locally with the `likec4` launch config (`likec4 start`, http://localhost:5173). The script for presenting it is `docs/demo-walkthrough.md`.
- For the online LikeC4 playground, run `node scripts/build-playground.mjs` and paste `dist/food-delivery-playground.c4` (generated, not committed; `dist/` is excluded in `likec4.config.json` so LikeC4 doesn't read it as a second copy of the model). Config-only settings (relationship browser scope) and relative links don't carry over. When adding a new folder of `.c4` files, add it to the script's build order; the script fails if a file is missed.
- To share the demo by link, `node scripts/deploy-site.mjs` publishes `dist/site` to Cloudflare Pages behind a shared password (`site/functions/_middleware.js`); setup is in the README. Check it first with `--preview` or the `site-preview` launch config (http://localhost:8788, password `preview`). Only ever upload `dist/site`, never `dist/`, which also holds playground builds. The script copies `backlog/questions` and `backlog/assumptions` to the site without their `Owner:` lines, so relative links open there; a link to anything else stops it. Update the route in `site/index.html` when views change, and the walkthrough's section on the link: the start page stands in for the presenter.

## Agent skills

### Issue tracker

Local markdown files under `backlog/`, versioned in git, plus standing registers for assumptions and open questions. See `docs/agents/issue-tracker.md`.

### Triage labels

The five default roles (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`), recorded as a `Status:` line in each backlog file. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `GLOSSARY.md` and `docs/adr/` at the repo root, with a required ADR header. See `docs/agents/domain.md`.
