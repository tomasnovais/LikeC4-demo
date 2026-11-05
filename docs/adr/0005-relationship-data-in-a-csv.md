# 0005. Relationship data lives in a CSV and is copied into descriptions

- Status: accepted
- Date: 2026-11-05
- Deciders: Tomás Novais
- Affects: `data/relationship-data.csv`; `scripts/sync-relationship-data.mjs`; every relationship with a "Relationship data" table

Transaction volumes, fee percentages and other values on relationships live in `data/relationship-data.csv`, one row per relationship, identified by source, kind and target. That file is the source of truth: `scripts/sync-relationship-data.mjs` writes each row into a table headed "Relationship data" in that relationship's description, and BI tools read the same file. The CSV holds values only; the `.c4` files still define relationships, labels, wording and schemas, so a row for a relationship that does not exist stops the run. LikeC4 cannot read a data file, and `extend` cannot add a description to a relationship, so the script edits the descriptions in place.

Changes run one way, from the CSV to the model. The CSV wins, and the script prints every value it replaces, including any table edited by hand. `--check` fails if the two differ, and `--watch` updates the model as the CSV is saved.

We rejected these alternatives:

- **Values in labels:** they mix what a relationship is with how much passes along it.
- **Values in `technology`:** this was tried. It shows under the label, but the app calls the row "technology", and a flow has to repeat its mechanism there.
- **Values only in metadata:** the app shows relationship metadata only in a tooltip on the small info icon, which opens behind the popover and is mostly covered on a wide one. The `customCss` setting cannot fix that in LikeC4 1.60, because nothing reads the file.
- **A generated metadata copy as well:** no lens uses it, so it would be one more copy for no benefit.
- **A second script from the model back to the CSV:** two directions would mean two sources of truth, and would need its own audit log.
- **An Excel workbook:** git could not show which value changed, and the script would need an extra library.

The costs are that values exist twice on disk even though only one copy is edited, that they can only be seen after clicking a line, and that their history is whatever git records. Invented values stay on actor groups and generic systems, so no made-up number is attached to a named company.
