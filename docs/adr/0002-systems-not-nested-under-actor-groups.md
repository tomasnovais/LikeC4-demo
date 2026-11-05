# 0002. Systems are not nested under actor groups

- Status: accepted
- Date: 2026-11-05
- Deciders: Tomás Novais
- Affects: element identifiers, actor groups, the map

Actor groups and systems are separate top-level elements, linked by `operates` and `uses` relationships, rather than each system being nested under the group that runs it. Nesting would build ownership into every system's identifier, so a change of operator would break every reference to that system, and systems run by several groups (a till system, run by both independent restaurants and restaurant chains) have no single parent to sit under.
