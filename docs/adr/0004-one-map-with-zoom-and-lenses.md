# 0004. One map, with zoom views, lenses and two kinds of exception

- Status: accepted
- Date: 2026-11-05
- Deciders: Tomás Novais
- Affects: every view; one zoom view per system file

The reference architecture is read as one map (the landscape view, `index`) that you zoom into or look at through a lens, never as separate diagrams. A system's zoom icon opens its zoom view, defined in that system's own file; a subsystem's zoom icon, within the delivery platform system, goes one level further down. LikeC4's automatic zoom views (`implicitViews`) stay off, because they add a view for every element and bury the map and its lenses in the view list.

Every lens **extends the map** and only filters it, opens one information type's datasets inside their systems, or brings back a layer the map hides, such as power or money. We rejected independently defined views because each chooses and lays out its own elements, so nothing shows how they relate to the landscape.

Two kinds of view are defined from scratch because a map cannot express them. Step-through views (`dynamic view`) play one process in order with named actors, one per lifecycle. The infrastructure view (`deployment view`) shows what physically sits where, using instances of the same elements, so that layer stays connected to the map. Known costs: each view is laid out automatically, so boxes move between the map and a lens, and a few lenses list by hand the elements they would otherwise leave unconnected.
