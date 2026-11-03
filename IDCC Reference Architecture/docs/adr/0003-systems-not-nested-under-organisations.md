# 0003. Systems are not nested under organisations

- Status: accepted
- Date: 2026-11-03
- Deciders: Tomás Novais
- Affects: element identifiers, organisation and landscape views

Organisations and systems are separate top-level elements, linked by an "operates" relationship, rather than nesting each system under the organisation that owns it. Nesting would bake ownership into every system's identifier, so a change of operator over the programme's lifetime would break every reference to that system, and systems used by many kinds of organisation (such as a product catalogue) have no single parent to sit under.
