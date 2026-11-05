# Food Delivery Reference Architecture

The systems used to get food from restaurants to customers in the UK, the information those systems hold, and who holds power over whom along the way. An illustrative example: real product names, with simplified flows and invented figures.

## Language

### The model

**Reference architecture**:
The model of the systems used across food delivery, the information they hold and how they connect.
_Avoid_: architecture diagram, system map, process map

**Capability**:
Something the food delivery ecosystem must be able to do, independent of which system does it.
_Avoid_: function, feature, service

**Standard**:
A published specification that information must follow, such as a data format, classification system or data dictionary.
_Avoid_: format, spec

**Gap**:
A place where the reference architecture shows something missing: a capability no system supports, a system no software product fills, or a flow that follows no standard.
_Avoid_: issue, shortfall, missing capability

**Open question**:
Something about the reference architecture that nobody has confirmed yet, recorded with who can answer it.
_Avoid_: issue, unknown, TBC

**Assumption**:
Something the reference architecture treats as true without confirmation, recorded with who can confirm it.
_Avoid_: guess, premise

### Information

**Dataset**:
The information of one information type held in one system, such as the orders held in a delivery platform system.
_Avoid_: data, data object, entity, record

**Information type**:
A category of information that exists independently of any system holding it, such as an order; every dataset has exactly one.
_Avoid_: data type, data category, entity type

**Authoritative dataset**:
The dataset that is the trusted source of its information type within its scope; other datasets of that type in that scope are copies of it.
_Avoid_: master, golden source, system of record

**Copy**:
A dataset that holds information whose authoritative dataset is in another system.
_Avoid_: replica, mirror, cache

**Flow**:
The movement of information from one dataset to another.
_Avoid_: integration, interface, feed, connection

**Mechanism**:
How a flow moves information: by API, by file transfer (export and import, scheduled or manual), or by manual re-keying.
_Avoid_: method, channel, protocol

**Manual re-keying**:
A flow in which a person types information into another system again, or sends it by email or spreadsheet.
_Avoid_: double entry, manual integration

**Schema**:
The fields, types and meanings of the information a flow carries or a dataset holds.
_Avoid_: data structure, data model, payload

**Transaction volume**:
How much passes along a relationship in a stated period, such as orders a week.
_Avoid_: throughput, traffic

### Information types

**Order**:
A customer's request for food from one restaurant, from placing it to drop-off.
_Avoid_: basket, ticket, transaction

**Menu**:
The dishes a restaurant offers, with their prices and allergens.
_Avoid_: catalogue, listing

**Restaurant profile**:
A restaurant's details on a delivery platform, such as its address, opening hours and contact.
_Avoid_: merchant record, listing

**Customer account**:
A customer's contact details, delivery addresses and saved payment method.
_Avoid_: user profile

**Courier profile**:
A courier's identity, right to work, vehicle and insurance details.
_Avoid_: driver record, rider account

**Verification result**:
The outcome of checking a courier's identity and right to work.
_Avoid_: background check, KYC

**Delivery job**:
The task of collecting one order and dropping it off, as offered to a courier.
_Avoid_: trip, drop, shift

**Payment**:
A customer's payment for an order.
_Avoid_: charge, transaction

**Payout**:
What a food delivery platform pays a restaurant or courier for a period, after commission and fees.
_Avoid_: settlement, remittance, statement

**Sales record**:
A restaurant's record of what it sold.
_Avoid_: takings, EPOS data

**Accounts**:
A restaurant's financial records.
_Avoid_: books, ledger

**Hygiene rating**:
A food regulator's published score of a restaurant's food hygiene.
_Avoid_: food safety grade

**Customer rating**:
A customer's score and comments on an order, restaurant or courier.
_Avoid_: review, feedback

### Systems

**System**:
A kind of software used in food delivery, defined by the role it plays rather than by any supplier, such as a till system.
_Avoid_: tool, application, platform on its own, installation

**Subsystem**:
A distinct part of a system with its own responsibilities and datasets, such as courier dispatch within a delivery platform system.
_Avoid_: module, component, container

**Software product**:
A specific piece of software that fills a system's role, such as the Uber Eats app filling the role of a delivery platform system; not the business that runs it, which is an actor.
_Avoid_: tool, solution, application, vendor system, provider

**Software vendor**:
The company that supplies a software product, such as Uber for the Uber Eats app.
_Avoid_: supplier, provider

**API readiness**:
Whether a software product offers an API to outsiders: public, for partners only, or none.
_Avoid_: integration maturity, openness

**Delivery platform system**:
A system through which customers order food from restaurants for delivery; the Uber Eats, Deliveroo and Just Eat apps are software products that fill this role.
_Avoid_: delivery platform on its own, marketplace, aggregator, delivery service, provider

**Customer ordering**:
The subsystem of a delivery platform system where customers manage their accounts, browse menus and place orders.
_Avoid_: customer app, storefront

**Restaurant portal**:
The subsystem of a delivery platform system where restaurants manage their profiles and menus, accept orders and see payouts.
_Avoid_: merchant portal, restaurant app

**Courier dispatch**:
The subsystem of a delivery platform system that signs up couriers, offers them delivery jobs and tracks each drop-off.
_Avoid_: driver app, routing

**Till system**:
A system in which a restaurant records orders and takes payment on its premises.
_Avoid_: POS, EPOS, register

**Order integration hub**:
A system that brings a restaurant's orders from many delivery platform systems into its till system.
_Avoid_: middleware, aggregator, tablet consolidation

**Menu management system**:
A system in which a restaurant keeps the master version of its menu, even if that is only a spreadsheet.
_Avoid_: menu tool, content system

**Payment gateway**:
A system that takes a customer's card payment and passes the money on.
_Avoid_: payment processor, PSP

**Accounting system**:
A system in which a restaurant keeps its accounts.
_Avoid_: bookkeeping tool, finance system

**Food hygiene register**:
A system that publishes the hygiene ratings of food businesses.
_Avoid_: FHRS database, ratings site

**Identity verification system**:
A system that checks a person's identity documents and right to work.
_Avoid_: KYC tool, background check service

### Actor groups and actors

**Actor group**:
A category of actors that play the same part in food delivery, such as food delivery platforms or customers.
_Avoid_: organisation, organisation role, stakeholder, sector, person

**Actor**:
A specific, named member of an actor group, whether an organisation or an individual, such as Uber Eats within food delivery platforms or Joe Blogs within customers.
_Avoid_: organisation, company, provider, stakeholder, person, user

**Operator**:
The actor or actor group that runs a system and is responsible for the information it holds.
_Avoid_: owner, user, tenant

**Customers**:
The actor group of people who order food through a delivery platform system.
_Avoid_: users, consumers, eaters

**Couriers**:
The actor group of people who collect orders from restaurants and drop them off with customers.
_Avoid_: riders, drivers, contributors, partners

**Food delivery platforms**:
The actor group of businesses that run delivery platform systems, such as Uber Eats, Deliveroo and Just Eat.
_Avoid_: platform operators, providers, marketplaces, aggregators, delivery companies

**Independent restaurants**:
The actor group of restaurants with one site or a few, which take a food delivery platform's standard terms.
_Avoid_: merchants, small businesses, partners

**Restaurant chains**:
The actor group of restaurant brands with many sites, which negotiate their own terms with food delivery platforms.
_Avoid_: merchants, enterprises, multi-site operators

**Integration companies**:
The actor group of businesses that run order integration hubs.
_Avoid_: middleware vendors

**Payment companies**:
The actor group of businesses that run payment gateways.
_Avoid_: payment providers, PSPs

**Verification companies**:
The actor group of businesses that run identity verification systems.
_Avoid_: KYC providers

**Food regulators**:
The actor group of public bodies that set and enforce food safety rules and publish hygiene ratings.
_Avoid_: authorities, inspectors

### Power and money

**Power**:
The ability of one actor group to set terms for, or constrain, another; it has a basis and a strength.
_Avoid_: influence, leverage, authority

**Basis**:
Where power comes from: commercial, regulatory or dependency.
_Avoid_: source, type

**Value exchange**:
Money passing from one actor group to another, such as customers paying for orders.
_Avoid_: money flow, funding, revenue

**Commission**:
The share of an order's value that a food delivery platform keeps.
_Avoid_: fee, take rate

### Lifecycles

**Lifecycle**:
An independent sequence of stages that one kind of thing passes through; lifecycles run in parallel and connect only where information from one feeds another.
_Avoid_: process, flow, journey

**Order lifecycle**:
The lifecycle of an order: browse, place, accept, prepare, drop-off, settle.
_Avoid_: order journey, fulfilment

**Restaurant lifecycle**:
The lifecycle of a restaurant on a food delivery platform: onboard, publish menu, comply, trade, get paid.
_Avoid_: merchant journey

**Courier lifecycle**:
The lifecycle of a courier on a food delivery platform: apply, verify, activate, work, get paid, leave.
_Avoid_: rider journey, driver onboarding

**Customer lifecycle**:
The lifecycle of a customer on a food delivery platform: sign up, first order, repeat order, get help, close account.
_Avoid_: user journey, customer journey

**Drop-off**:
The order lifecycle stage in which an order is handed to the customer.
_Avoid_: delivery, fulfilment

**Settle**:
The order lifecycle stage in which an order's money is divided between the restaurant, the courier and the food delivery platform.
_Avoid_: reconciliation
