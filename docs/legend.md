# Legend

How to read the IDCC reference architecture diagrams. The styles are defined once in `model/specification.c4` (shapes, lines, labels) and `model/styles.c4` (borders and colour by tag), so every view follows this legend.

## Elements

| Symbol | Element | Examples in the draft |
|---|---|---|
| Person shape | **Organisation role**: a kind of organisation | Registered provider, Local authority, Manufacturer, Contractor |
| Box | **System**: a kind of software, named for its job | Housing management system, Configurator, Product catalogue |
| Component shape inside a box | **Software product**: a real product that does that system's job | Liverpool housing pipeline, Manufacturers' Information Hub |
| Cylinder inside a box | **Dataset**: the information that system holds | Housing need, Property records, Product certificates |
| Box with a target icon | **Capability**: something the sector must be able to do | Assess housing need, Certify product |
| Page shape | **Standard**: an agreed information format | IFC, Uniclass, ETIM |

## Borders and colour

| Look | Meaning |
|---|---|
| Solid border | Exists today |
| Dashed border | Planned |
| Dotted border | Being replaced |
| Faded | No longer used |
| Blue fill | Within IDCC's scope |

## Lines

Relationships between things are plain solid grey lines, labelled with what the relationship is. Information moving between systems is always a dotted line, coloured by how it moves.

| Line | Meaning |
|---|---|
| Grey solid, labelled "operates" | An organisation role runs that system |
| Grey solid, labelled "supports" | A system supports that capability |
| Grey solid, labelled "conforms to" | The information follows that standard |
| Green dotted | Information passes automatically (API) |
| Blue dotted | Information passes as a file |
| Red dotted | Information is typed in again by hand |
| Grey dotted, labelled `[...]` | Several flows of different kinds between the same two systems, usually today's flow and its planned replacement; click the line to list them |
