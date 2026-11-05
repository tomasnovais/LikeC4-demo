# Demo walkthrough

A live walkthrough of about 15 minutes, for people new to both this model and LikeC4. The point is the tool, not food delivery: everyone already knows how a takeaway reaches their door, so they can judge what the model shows.

## Before you start

```bash
likec4 start
```

In a second terminal, for stop 8:

```bash
node scripts/sync-relationship-data.mjs --watch
```

Open http://localhost:5173 and view the app full screen. Have this repository open in an editor beside it, for stops 8 and 9.

Say early on: the product names are real, but the flows are simplified and every value is invented. Nothing here describes how any named company actually works.

## Driving the app

- **Zoom icon**, at the bottom of a system or subsystem: opens it.
- **Card icon**, at the top right of any box: opens its details, including any schema and links.
- **Clicking a line:** shows its relationship data, wording and any schema. Click the empty canvas to close it; **Esc** does not.
- **Clicking a box:** only focuses it, dimming the rest. Press **Esc** to clear that, or to close details.
- **Ctrl + K:** searches for a view by name. Its results list views on the right and elements on the left.

## The core path

Each view name below can be found with **Ctrl + K**.

| # | Time | View | What to do | The point to make |
|---|---|---|---|---|
| 1 | 1 min | **Landscape** | Point out the top row of actor groups and the systems below them | One map of who is involved and what software they run, with no vendor names yet |
| 2 | 2 min | **Delivery platform system** | Use the zoom icon on that box on the map. Show the three apps, then the businesses joined to them | The system is the role, and the products in it are replaceable. Uber Eats UK Limited is the business and Uber Eats is its software, so each can be described separately |
| 3 | 1 min | **Courier dispatch** | Use the zoom icon on that subsystem, then the card icon on **Courier profiles**, and show the field table | The layers go down from map to system, subsystem, dataset and schema, all in one model |
| 4 | 2 min | **Follow one order** | Press **Start** and step through with **Next**, reading the notes. Pause on step 5, labelled Manual re-keying | The same model can tell a story, with named people, one step at a time |
| 5 | 2 min | **Flows with no standard** | Click the red line, "staff re-key each order into the till", and show the proposed schema | The model finds the problems and holds a proposal for fixing them |
| 6 | 1 min | **Infrastructure** | Point out the tablets on the counter next to a till that cannot talk to them | The same elements, this time showing where things physically sit |
| 7 | 2 min | **Who has power over whom**, then **Where the money goes** | Click a red line to show why and its relationship data, then switch to the money view | Beyond data flows: soft power and commercial relationships in the same model |
| 8 | 1 min | **Where the money goes** | Click "pays order value less commission" to **Independent restaurants** and leave it open. In `data/relationship-data.csv`, change that row's `feePercentage` from 30 to 25 and save. The open table updates by itself. Change it back afterwards | One table is the source of truth. It updates the diagram, and a BI tool can read the same file |
| 9 | 1 min | **Open questions and assumptions** | Use the card icon on **Till system** and show its link, then open `backlog/questions/01-who-owns-the-order.md` in the editor | What we do not know is tracked against what it affects. Do not click the link in the app: it loads the app rather than the file |
| 10 | 1 min | Claude Code, with the LikeC4 tools | Ask the example question below | The model can be questioned, not just looked at |

Example question for stop 10, ready to paste:

> Using the LikeC4 model, which flows are typed in by hand, and which actor groups carry that work?

## If there is time, or someone asks

| View | Shows |
|---|---|
| **Capabilities** | What the ecosystem must do, which system supports it, and the one gap, shown as a red dashed box |
| **Follow the order data** | Where order data is authoritative and where it is copied |
| **Order, Restaurant, Courier and Customer lifecycle** | Which actor groups and systems take part in each |
| **A courier signs up**, **A restaurant joins**, **A customer joins** | The other step-through views |
| Any other system | Green, amber and red software products show which have a public API, a partner API or none |

## If people follow the link instead

The published site has no presenter, so its start page gives the disclaimer, a shorter route of its own, how to use the app and the app in a frame. Its links open the app in a new tab. Some stops only work live:

- **Stop 8:** the site is a fixed copy, so a change to the CSV only appears after publishing again.
- **Stop 10:** the site has no connection to Claude Code.
- **Stop 9:** this one works better on the site, as the link on **Till system** opens the question.

See the README for how to publish.

## Good to know

- **Not in this demo:** today versus a planned future state. It was left out to keep things simple, not because the tool cannot do it.
- **Stop 8 in Excel:** rehearse it first if you plan to edit the CSV in Excel, as the live update has only been tested with a plain save to the file. Excel may ask you to confirm keeping the CSV format.
- **BI tools:** `docs/bi-import.md` has the steps for Power BI. They have not been tested yet.
- **Layout:** LikeC4 lays out each view automatically, so boxes can move between views.
- **Small text:** the map and the long step-throughs are wide, so scroll to zoom in if the room can't read the labels.
