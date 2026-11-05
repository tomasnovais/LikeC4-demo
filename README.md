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

## Sharing the demo by link

`scripts/deploy-site.mjs` publishes the demo to [Cloudflare Pages](https://developers.cloudflare.com/pages/) as a static site behind one shared password. Visitors get a start page with the disclaimer, a suggested route, how to use the app and the app in a frame ([site/index.html](site/index.html)). Its links open the app in a new tab, so the start page stays open. Visitors can't change anything, but anyone with the password can read the whole model and export its diagrams.

### First-time setup

You need a free Cloudflare account. Then run these in order, so that the password is in place before anything is published:

```bash
npx wrangler@4 login
```

```bash
npx wrangler@4 pages project create food-delivery-demo --production-branch main
```

```bash
npx wrangler@4 pages secret put SITE_PASSWORD --project-name food-delivery-demo
```

The last command asks you to type the password. It is stored only at Cloudflare, never in this repo.

```bash
node scripts/deploy-site.mjs
```

Send people the link and the password separately. The browser asks for a username too: any will do, or none.

### Publishing a change

```bash
node scripts/deploy-site.mjs
```

It publishes the working folder as it is, including anything not yet committed. It stops without publishing if:

- the CSV and the `.c4` files differ, or `likec4 validate` fails
- the output contains a word this branch leaves out, or the owner's name from a backlog file
- an element links to a file that isn't published, or the start page links to a view that doesn't exist

After publishing, it confirms that the site asks for the password. To check the site first without publishing:

```bash
node scripts/deploy-site.mjs --preview
```

Then open http://localhost:8788 with the password `preview`.

### Changing the password

Run the `pages secret put` command again, then publish, as the new password only applies from the next deployment. Earlier deployments keep their own addresses and may still accept the old password, so delete them in the Cloudflare dashboard if that matters.

### Why it works this way

- **Cloudflare Pages:** the demo is one static page, so it needs no server of our own to maintain. GitHub Pages was ruled out because its free plan needs a public repo, and this branch's history includes models that aren't meant to be public.
- **A single-file build:** the normal `likec4 build` fails on Windows with LikeC4 1.60. The single file also uses `/#/` URLs, so a link to any view works without server routing.
- **A password:** the site puts real company names next to invented figures, so it shouldn't be open to everyone or indexed by search engines.

## Where things are

| Path | What it holds |
|---|---|
| `model/` | Actor groups, systems, capabilities, standards and infrastructure |
| `views/` | The map, lenses and step-through views |
| `data/relationship-data.csv` | Volumes, fees and similar values |
| `scripts/` | The sync script, the playground build and the site deploy |
| `site/` | The published site's start page, headers and password check |
| `GLOSSARY.md` | What each term means |
| `docs/legend.md` | How to read the diagrams |
| `docs/adr/` | Decisions and why they were made |
| `backlog/` | Open questions and assumptions |

## This branch

This is the `demo/food-delivery` branch, which never merges back to `main`. Improvements to scripts or method go to `main` first and are cherry-picked here.
