# Independent restaurants re-key orders by hand

- Type: assumption
- Validation: open
- Owner: Tomás Novais
- Affects: independentRestaurants; the flow from deliveryPlatformSystem.restaurantPortal.orders to tillSystem.orders

The model shows independent restaurants re-keying orders from a tablet into the till, and only restaurant chains using an order integration hub. In practice some independents use a hub and others never enter platform orders into the till at all. We assume re-keying is typical because it is the simplest case that shows the problem; if it proves wrong, the red line on the map changes.
