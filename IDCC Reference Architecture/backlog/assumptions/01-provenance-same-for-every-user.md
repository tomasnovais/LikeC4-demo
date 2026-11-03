# Provenance is the same for every organisation using a software product

- Type: assumption
- Validation: open
- Owner: Tomás Novais
- Affects: provenance tags on all software products; ADR 0006

A software product's provenance (off-the-shelf, configured, bespoke, IDCC-built) is recorded once and assumed to hold for every organisation that uses it, even though, for example, two registered providers may configure the same housing management product to different degrees. We make this assumption because the reference architecture generalises across many organisations (ADR 0006) and per-organisation provenance would mean modelling installations.

If a pilot shows that the degree of configuration materially changes how a software product can be integrated, revisit this assumption.
