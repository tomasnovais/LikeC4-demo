# Check script for tag rules LikeC4 cannot enforce

- Status: needs-triage
- Affects: model/specification.c4; every element and flow

`likec4 validate` checks that every tag is declared, but not how many tags of a family an element carries. Write a small script (run against `likec4 export json`) that reports:

- software products without exactly one API readiness tag (`api-*`)
- datasets without exactly one information type tag (`info-*`) or without exactly one of `authoritative` / `copy`
- `hasPowerOver` relationships without exactly one strength tag (`power-*`)
- relationship labels containing a digit, `£` or `%`, flows whose `technology` does not start with their mechanism, and metadata keys outside the list in CLAUDE.md
- flows (`api`, `fileTransfer`, `rekeying` relationships) without a schema table in their description, as a failure, and without a `standards` metadata key, as a warning rather than a failure: these are the "flow with no standard" gaps
- actor groups, systems, subsystems and capabilities without at least one lifecycle tag (`lifecycle-*`)
- standards with no relationship at all, capabilities with no `supports` relationship unless tagged `gap`, and any element left unconnected in a computed view (the "Flows with no standard" and "Follow the order data" lenses exclude some systems by name, so a new one shows up here)
- elements missing the `source` metadata key

Done when the script exits non-zero on any violation and is documented in CLAUDE.md next to `likec4 validate`.
