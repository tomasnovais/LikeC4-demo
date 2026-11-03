# Check script for tag rules LikeC4 cannot enforce

- Status: needs-triage
- Affects: model/specification.c4; every element and flow

`likec4 validate` checks that every tag is declared, but not how many tags of a family an element carries. Write a small script (run against `likec4 export json`) that reports:

- software products, datasets, flows and standards without exactly one roadmap state tag (`state-*`)
- software products without exactly one provenance tag (`prov-*`)
- datasets without exactly one information type tag (`info-*`) or without exactly one of `authoritative` / `copy`
- flows (`api`, `fileTransfer`, `rekeying` relationships) without a `standards` metadata key, as a warning rather than a failure: these are the "flow with no standard" gaps
- systems, datasets and capabilities without at least one housing or product stage tag
- elements missing the `source` or `reviewed` metadata keys

Done when the script exits non-zero on any violation and is documented in CLAUDE.md next to `likec4 validate`.
