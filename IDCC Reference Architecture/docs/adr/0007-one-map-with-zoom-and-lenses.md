# 0007. One map, with zoom views and lenses

- Status: accepted
- Date: 2026-11-03
- Deciders: Tomás Novais
- Affects: every view; one zoom view per system file

The reference architecture is read as one map (the landscape view, `index`) that you zoom into or look at through a lens, never as separate diagrams. Clicking a system on the map opens its zoom view, defined in that system's own file, showing its datasets and the neighbouring systems those datasets exchange information with. Only systems have zoom views: LikeC4's automatic zoom views (`implicitViews`) were tried and turned off, because they added an "Auto" view for every role, dataset, software product, standard and capability (70 in the pilot draft) and buried the map and its lenses in the view list. Every other view **extends the map** (`extends index`) and only filters it (current state, target state, IDCC scope, a lifecycle) or opens one information type's datasets inside their systems (an information thread). We rejected independently defined views, which the first pilot draft used, because each chose and laid out its own elements, so nothing showed how, for example, an information flow related to the landscape. Known costs: each view is still laid out automatically, so boxes can move between the map and a lens, and opening a system in a thread hides that system's other flows within that lens. Information threads are added on request rather than one per information type.
