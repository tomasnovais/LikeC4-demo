# 0001. One model for current and target state

- Status: accepted
- Date: 2026-11-03
- Deciders: Tomás Novais
- Affects: whole LikeC4 model, all views

The reference architecture shows both the current state and the target state in a single LikeC4 model: every system and connection carries a roadmap state, and views filter by it to show "today", intermediate milestones and the target. We rejected separate current and target models because shared systems would be duplicated and drift apart, and a system moving from planned to current would mean copying it between models rather than changing one line. LikeC4's model `diff` feature (for proposed changes) is not in the released CLI (1.60.0); once it ships we may use it for individual change proposals, but not to replace roadmap state. (Originally called "lifecycle state"; renamed to avoid confusion with the housing and product lifecycles.)
