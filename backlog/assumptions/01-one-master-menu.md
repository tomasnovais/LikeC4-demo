# Each restaurant keeps one master menu

- Type: assumption
- Validation: open
- Owner: Tomás Novais
- Affects: menuManagementSystem; menuManagementSystem.menus

The model treats the menu management system's menu as authoritative and each platform's as a copy. Many restaurants may in fact have no master at all, only slightly different menus on each platform. We assume one master because it is what any integration would need; if it proves wrong, the authoritative dataset moves or disappears.
