# 0001. Information is modelled inside the systems that hold it

- Status: accepted
- Date: 2026-11-05
- Deciders: Tomás Novais
- Affects: element kinds, all system views, information threads

Information is modelled as elements nested inside the system that holds it, not as one shared element per kind of information, and flows run between those nested elements, rolling up to system level on the map. We rejected a single shared element per kind of information (for example, one "Orders") because the same information is held by several systems with different authority and freshness, and a single element would hide exactly the duplication and integration points the reference architecture exists to expose: an order is authoritative in the delivery platform system, but the till, the hub and the tablet each hold a copy. Finding every system that holds a given kind of information is done by tagging the nested elements with their information type, not by sharing them.
