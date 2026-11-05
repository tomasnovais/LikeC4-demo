# Every value in the relationship data is illustrative

- Type: assumption
- Validation: open
- Owner: Tomás Novais
- Affects: `data/relationship-data.csv`; ADR 0005

Commission rates, order volumes and fees are invented to be plausible and to show how such values can be managed in the model and reported on. None is a measurement, and none describes a named company. Before any value is used to argue a point, it needs a real source, recorded in the CSV's `dataSource` column.
