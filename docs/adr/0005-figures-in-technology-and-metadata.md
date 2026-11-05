# 0005. Figures go in metadata and the technology field, never in the label

- Status: accepted
- Date: 2026-11-05
- Deciders: Tomás Novais
- Affects: every relationship carrying a figure or a schema; all flows; `model/powerAndMoney.c4`

Transaction volumes, fee percentages and other figures are kept out of a relationship's label, which only says what the relationship is. They are stored in metadata as separate fields, such as `transactionVolume`, `transactionUnit`, `transactionPeriod` and `feePercent`, and repeated as readable text in the `technology` field. Metadata alone would hide them: LikeC4 1.60, the latest release, does not show relationship metadata when you click a line or in the relationship browser, and the query tools we tried do not return it. Only lenses and `likec4 export json` can use it. `technology` is the one built-in field that shows under the label, on click and in those query tools, and LikeC4 does not allow adding a custom field like it. It still leads with what it used to hold alone: a flow's mechanism or a power relationship's basis, as in "API: 4 million payments a week".

We rejected figures in labels because they mix what a relationship is with how much passes along it. We rejected metadata only because nobody could see the figures in the app, and tables in descriptions because they can only be seen after a click.

The costs are that a field called `technology` now holds things that are not technology, and the app labels it that way on click; that each figure is typed twice and can drift; and that metadata values are text, so lenses can match an exact value but not "over 20". Schemas stay as Markdown tables in descriptions, because relative links to files in the repository do not open in `likec4 start` (they load the app instead). Invented figures stay on actor groups and generic systems, so no made-up number is attached to a named company.
