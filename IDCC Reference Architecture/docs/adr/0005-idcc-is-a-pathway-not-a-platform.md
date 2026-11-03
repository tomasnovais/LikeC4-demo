# 0005. IDCC is modelled as a pathway across independent systems, not as a platform

- Status: accepted
- Date: 2026-11-03
- Deciders: Tomás Novais
- Affects: whole model; product catalogue, configurator and every system IDCC integrates with or fills a gap with

There is no "IDCC platform" element that contains other systems. Product catalogues, configurators and every other system are independent elements that any supplier's software can fill; IDCC's contribution is shown through the information flows it enables, the standards datasets and flows conform to, and the software it configures or builds to fill gaps. We rejected a platform element with systems nested inside it, although it would roll connections up neatly, because it says the opposite of what IDCC intends: housing delivery depends on specialised software that will stay separate, organisations have invested heavily in their own tools (configurators especially), and IDCC aims to make information flow between them through standards and integration, not to make anyone use one platform. Public descriptions of IDCC as a "digital marketplace" are misleading on this point, which is why the model avoids that framing. IDCC may still run an "IDCC platform" that hosts or links to the software it builds or controls centrally; if so, it is modelled as one system among many, and it never contains the systems of the wider pathway.
