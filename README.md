# Food Delivery Reference Architecture

A LikeC4 model of UK food delivery: who is involved, what software they run, what information it holds, how that information moves, and who holds power over whom. It exists as a live demonstration of the method and the tool.

Product names are real, but flows are simplified and every value is invented. It describes no named company's actual systems, and it is not affiliated with any of them.

> [!IMPORTANT]
> **You must run the sync script after every change to `data/relationship-data.csv`.**
>
> The diagram does not read the CSV, and nothing runs the script for you. Until you run it, the diagram keeps showing the old values and nothing warns you.
>
> ```bash
> node scripts/sync-relationship-data.mjs
> ```

## Viewing the model

You need [LikeC4](https://likec4.dev) (tested with 1.60) and Node.js (tested with 26).

```bash
likec4 start
```

Then open http://localhost:5173. To present it, follow [docs/demo-walkthrough.md](docs/demo-walkthrough.md).

## Changing relationship data

Transaction volumes, fee percentages and similar values live in [data/relationship-data.csv](data/relationship-data.csv), the single source of truth. The script copies each row into a **Relationship data** table in that relationship's description.

1. Edit `data/relationship-data.csv` and save it.
2. **Run the script.** It prints every value it changes.

   ```bash
   node scripts/sync-relationship-data.mjs
   ```

3. Commit the CSV and the `.c4` files the script changed, together.

### The script's modes

| Command | What it does | When to use it |
|---|---|---|
| `node scripts/sync-relationship-data.mjs` | Updates the `.c4` files once | After editing the CSV |
| `node scripts/sync-relationship-data.mjs --watch` | Updates them on every save, until you press Ctrl+C. It only works while it is running | While editing, or during a demo |
| `node scripts/sync-relationship-data.mjs --check` | Changes nothing, and fails if the CSV and the `.c4` files differ | Before committing |

### Rules

- **Change the CSV, never the tables in the descriptions.** The next run overwrites those tables, and prints what it replaced.
- **Add a new relationship to a `.c4` file before giving it a row.** A row for a relationship that does not exist stops the script, and nothing gets written.
- **Identify a row by `source`, `kind` and `target`,** using the identifiers from the `.c4` files.
- **The script only runs one way.** Nothing in the diagram ever changes the CSV.

To use the same file in a BI tool, see [docs/bi-import.md](docs/bi-import.md).

## Where things are

| Path | What it holds |
|---|---|
| `model/` | Actor groups, systems, capabilities, standards and infrastructure |
| `views/` | The map, lenses and step-through views |
| `data/relationship-data.csv` | Volumes, fees and similar values |
| `scripts/` | The sync script and the playground build |
| `GLOSSARY.md` | What each term means |
| `docs/legend.md` | How to read the diagrams |
| `docs/adr/` | Decisions and why they were made |
| `backlog/` | Open questions and assumptions |

## This branch

This is the `demo/food-delivery` branch, which never merges back to `main`. Improvements to scripts or method go to `main` first and are cherry-picked here.
