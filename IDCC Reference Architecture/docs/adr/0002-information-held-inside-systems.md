# 0002. Information is modelled inside the systems that hold it

- Status: accepted
- Date: 2026-11-03
- Deciders: Tomás Novais
- Affects: element kinds, all system and integration views

Information is modelled as elements nested inside the system that holds it, not as one shared element per kind of information, and system-to-system connections run between those nested elements (rolling up to system level in landscape views). We rejected a single shared element per kind of information (e.g. one "Housing need") because the same kind of information comes from several sources with different coverage and quality, and a single element would hide exactly the duplication and integration points the reference architecture exists to expose. Finding every system that holds a given kind of information is done by classifying the nested elements, not by sharing them.
