# 0003. The map shows generic systems and actor groups; real names sit inside them

- Status: accepted
- Date: 2026-11-05
- Deciders: Tomás Novais
- Affects: system elements, software products, actor groups, actors, all views

Each system describes a supplier-neutral kind of software defined by its role, such as "Delivery platform system", and each actor group describes a category of participants, such as "Food delivery platforms". Real names sit one level down: an actor is a named member of an actor group, and a software product is real software filling a system's role.

An actor keeps its everyday name, such as Nando's or Joe Blogs. The exception is an actor that runs software with the same brand: the actor takes its registered name and the software keeps the brand, so Uber Eats UK Limited operates Uber Eats. Otherwise one name would appear twice for two different things: the business that signs terms and charges commission, and the software that holds orders and offers an API. We rejected registered names for every actor because they make the model harder to read without adding anything where nothing clashes.

We rejected one top-level element per company because it would describe an inventory rather than a reference architecture, make the map unreadable as the number of companies grows, and require inventing internals that are not public. Keeping the system generic also shows that the products are replaceable: the role stays when Uber Eats, Deliveroo or Just Eat fills it.

The cost is that no brand appears on the opening map; they appear on zoom views and in the step-through views. Invented figures stay on actor groups and generic systems, never on a named company (ADR 0005).
