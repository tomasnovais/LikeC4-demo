# 0005. Figures and schemas go where people can see them, not only in relationship metadata

- Status: accepted
- Date: 2026-11-05
- Deciders: Tomás Novais
- Affects: every relationship carrying a figure or a schema; all flows; `model/powerAndMoney.c4`

Transaction volumes, commission rates and example schemas are written in a relationship's label or description, and figures are also repeated in its metadata. Metadata alone looks like the natural home, but in LikeC4 1.60 it is hidden in the two places people would look: clicking a relationship in the app shows its label, kind, technology, description and links but not its metadata, and the `find-relationships` query tool returns no metadata either. Lenses can still filter on it, which is why figures stay there too. We rejected metadata only, because the figures would be invisible, and labels only, because lenses could not filter on them.

The cost is that each figure is typed twice and can drift. Schemas appear as Markdown tables in descriptions rather than linked files, because relative links to files in the repository do not open in `likec4 start` (they load the app instead). Invented figures stay on actor groups and generic systems, so no made-up number is attached to a named company.
