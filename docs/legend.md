# Legend

How to read the food delivery reference architecture diagrams. The styles are defined once in `model/specification.c4` (shapes, lines, labels) and `model/styles.c4` (colour by tag), so every view follows this legend.

## Elements

| Symbol | Element | Examples |
|---|---|---|
| Stacked grey box | **Actor group**: a category of participants | Customers, Food delivery platforms, Food regulators |
| Person shape | **Actor**: a named member of a group | Joe Blogs, Corner Curry House, Uber Eats UK Limited |
| Blue box | **System**: a kind of software, named for its job | Delivery platform system, Till system |
| Light blue box inside a system | **Subsystem**: a distinct part of a system | Customer ordering, Courier dispatch |
| Component shape inside a system | **Software product**: real software doing that system's job | Uber Eats, Square, Stripe |
| Purple cylinder | **Dataset**: the information a system holds | Orders, Menus, Courier profiles |
| Grey box with a target icon | **Capability**: something the sector must be able to do | Place order, Verify courier |
| Page shape | **Standard**: a published information format | PCI DSS, 14 allergens |
| Device and place boxes | **Infrastructure**: what physically sits where | Restaurant premises, Till terminal |

## Icons on a box

| Icon | Where | What it does |
|---|---|---|
| Zoom | Bottom of a system or subsystem | Opens its zoom view |
| Card | Top right of any box | Opens its details: description, schema, links and metadata |
| Arrows | Bottom of a box | Browses its relationships |

## Colours on software products

| Colour | API readiness |
|---|---|
| Green | Public API |
| Amber | API for partners only |
| Red | No API |

## Lines

Relationships between things are plain solid grey lines, labelled with what the relationship is. Information moving between systems is always a dotted line, coloured by how it moves. The second line of a label, in brackets, shows how a flow moves or where power comes from, then any figures. Click a line to see the same details, its description and any schema.

| Line | Meaning |
|---|---|
| Grey solid, labelled "operates" | Runs that system and is responsible for its information |
| Grey solid, labelled "uses" | Depends on that system without running it |
| Grey solid, labelled "supports" | A system supports that capability |
| Grey solid, labelled "conforms to" | The information follows that standard |
| Green dotted | Information passes automatically (API) |
| Blue dotted | Information passes as a file |
| Red dotted | Information is typed in again by hand |

## Lens-specific colours

| Lens | Look | Meaning |
|---|---|---|
| Who has power over whom | Red, amber or grey solid line | Strong, moderate or weak power, pointing from the one holding it |
| Where the money goes | Purple solid line | Money, pointing the way it goes |
| Capabilities | Red dashed box | A gap: no system supports it |
| Open questions and assumptions | Amber box | An open question is filed against it |
| Open questions and assumptions | Sky blue box | An assumption is filed against it |
