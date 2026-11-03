# 0006. Systems are generic kinds of software, not installations

- Status: accepted
- Date: 2026-11-03
- Deciders: Tomás Novais
- Affects: system elements, datasets, organisation relationships, all views

Each system element describes a supplier-neutral kind of software defined by its role (e.g. "Housing management system"), not a particular installation or product. Specific software products, and the organisations that use them, are recorded against the system as examples rather than modelled one by one. We rejected one element per installation because the reference architecture will cover dozens to hundreds of registered providers and other organisations: modelling each installation would make the model unreadable and would describe an inventory rather than a reference architecture. The cost is that integration differences between two installations of the same kind of system are not visible in the model; where that matters (for example the systems chosen for the pilots), the specific software product is recorded explicitly. The same applies to organisations: elements are organisation roles (e.g. "Registered provider"), and named organisations appear only as users of software products.
