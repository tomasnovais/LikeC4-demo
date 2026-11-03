# IDCC Reference Architecture

LikeC4 model of the current and target architectures for the IDCC programme (Industrialising and Digitalising Construction Challenge): off-the-shelf and new systems, and how they connect to social housing delivery in Liverpool City Region and, later, England.

## Diagram format

- **LikeC4 is the only diagram format.** All models and views live in `.c4` files. Never produce Structurizr DSL, PlantUML, Mermaid or draw.io as source of truth; those are export targets only (`likec4 export` / `likec4 gen`).
- Use the `likec4-dsl` skill for all DSL syntax, CLI usage and validation.
- Use the `enterprise-architecture` skill for **method only**: ArchiMate-style layering (business / application / technology), TOGAF baseline vs target and gap analysis, capability mapping, ADRs (MADR) and design reviews. When it suggests a Structurizr workspace or diagram, express the same content in LikeC4 instead.
- After editing `.c4` files, run `likec4 validate`.
- Preview locally with the `likec4` launch config (`likec4 start`, http://localhost:5173).
