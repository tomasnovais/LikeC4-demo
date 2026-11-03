# Domain Docs

How the engineering skills should consume this repo's domain documentation when exploring the codebase.

## Before exploring, read these

- **`GLOSSARY.md`** at the repo root, or
- **`GLOSSARY-MAP.md`** at the repo root if it exists: it points at one `GLOSSARY.md` per context. Read each one relevant to the topic.
- **`docs/adr/`**: read ADRs that touch the area you're about to work in. In multi-context repos, also check `src/<context>/docs/adr/` for context-scoped decisions.

If any of these files don't exist, **proceed silently**. Don't flag their absence; don't suggest creating them upfront. The `/domain-modeling` skill (reached via `/grill-with-docs` and `/improve-codebase-architecture`) creates them lazily when terms or decisions actually get resolved.

## File structure

Single-context repo (most repos):

```
/
├── GLOSSARY.md
├── docs/adr/
│   ├── 0001-event-sourced-orders.md
│   └── 0002-postgres-for-write-model.md
└── src/
```

Multi-context repo (presence of `GLOSSARY-MAP.md` at the root):

```
/
├── GLOSSARY-MAP.md
├── docs/adr/                          ← system-wide decisions
└── src/
    ├── ordering/
    │   ├── GLOSSARY.md
    │   └── docs/adr/                  ← context-specific decisions
    └── billing/
        ├── GLOSSARY.md
        └── docs/adr/
```

## Use the glossary's vocabulary

When your output names a domain concept (in an issue title, a refactor proposal, a hypothesis, a test name), use the term as defined in `GLOSSARY.md`. Don't drift to synonyms the glossary explicitly avoids.

If the concept you need isn't in the glossary yet, that's a signal: either you're inventing language the project doesn't use (reconsider) or there's a real gap (note it for `/domain-modeling`).

## Flag ADR conflicts

If your output contradicts an existing ADR, surface it explicitly rather than silently overriding:

> _Contradicts ADR-0007 (event-sourced orders), but worth reopening because…_

## IDCC conventions

### ADR header

IDCC is a publicly funded, multi-partner programme, so every ADR records who decided what and when. Use the short ADR format, but always start with this header:

```md
# NNNN. {Short title of the decision}

- Status: proposed | accepted | deprecated | superseded by ADR-NNNN
- Date: YYYY-MM-DD
- Deciders: {names / roles / organisations}
- Affects: {LikeC4 element ids (FQNs), views}

{1-3 sentences: what's the context, what did we decide, and why.}
```

For large decisions, add the fuller MADR sections from `.claude/skills/enterprise-architecture/assets/templates/adr-madr.md` (Decision Drivers, Considered Options, Consequences). Most ADRs won't need them.

### LikeC4 model vocabulary

Element titles, descriptions and tags in the `.c4` files use `GLOSSARY.md` terms. Introducing a new kind of element or domain concept means adding the glossary entry first.
