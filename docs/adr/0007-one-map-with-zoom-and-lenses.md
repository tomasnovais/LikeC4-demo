# 0007. One map, with zoom views and lenses

- Status: accepted
- Date: 2026-11-03
- Deciders: Tomás Novais
- Affects: every view; likec4.config.json (`implicitViews`); one zoom view per system file

The reference architecture is read as one map (the landscape view, `index`) that you zoom into or look at through a lens, never as separate diagrams. Clicking a system on the map opens its zoom view, defined in that system's own file, showing its datasets and the neighbouring systems those datasets exchange information with; other elements get an automatic zoom view (`implicitViews`). Every other view **extends the map** (`extends index`) and only filters it (current state, target state, IDCC scope, a lifecycle) or opens one information type's datasets inside their systems (an information thread). We rejected independently defined views, which the first pilot draft used, because each chose and laid out its own elements, so nothing showed how, for example, an information flow related to the landscape. Known costs: each view is still laid out automatically, so boxes can move between the map and a lens, and opening a system in a thread hides that system's other flows within that lens. Information threads are added on request rather than one per information type.
