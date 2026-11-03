# IDCC Reference Architecture

The systems used to deliver social housing, from identifying housing need to maintaining completed homes, the information those systems hold, and how they connect to what the IDCC programme is building.

## Language

### The model

**Reference architecture**:
The model of the systems used across social housing delivery, the information they hold and how they connect, in both current and target state.
_Avoid_: architecture diagram, system map, process map

**Capability**:
Something the housing delivery ecosystem must be able to do, independent of which system does it.
_Avoid_: function, feature, service

**IDCC pathway**:
The integrated, standards-based way of delivering social housing that IDCC is establishing across independent systems and organisations.
_Avoid_: platform, marketplace, hub, digital platform

**IDCC scope**:
Anything IDCC builds, configures, integrates, standardises or directly influences; an IDCC intervention is something in IDCC scope that is planned.
_Avoid_: IDCC system, in scope, IDCC-owned

**IDCC platform**:
A possible system, run by IDCC, that hosts or links to the software IDCC builds or controls centrally; one system among many, not the IDCC pathway.
_Avoid_: marketplace, hub

**Standard**:
A published specification that information must follow, such as a data format, classification system or data dictionary.
_Avoid_: format, schema, spec

### Information

**Dataset**:
The information of one information type held in one system, such as the housing need held in the Liverpool housing pipeline.
_Avoid_: data, data object, entity, record

**Information type**:
A category of information that exists independently of any system holding it, such as housing need; every dataset has exactly one.
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

**Gap**:
A place where the reference architecture shows something missing: a capability no system supports, a system no software product fills, or a flow that follows no standard.
_Avoid_: issue, shortfall, missing capability

### Information types: housing

**Scheme proposal**:
A proposed scheme as recorded in the pipeline, before scheme design starts.
_Avoid_: opportunity, lead

**Site information**:
Information about a site's location, ownership, constraints and condition.
_Avoid_: land data

**Scheme brief**:
A registered provider's requirements for a scheme: the number, mix and type of homes, the standards they must meet, and the budget.
_Avoid_: requirements, specification

**Home design**:
The design of a scheme's homes, including drawings and models, whether configured or designed from scratch.
_Avoid_: BIM model, drawings, design model

**Cost plan**:
The estimated and tracked cost of a scheme.
_Avoid_: budget, estimate

**Planning application**:
A request for planning consent for a scheme, with its supporting documents.
_Avoid_: planning submission

**Planning decision**:
The planning authority's decision on a planning application, with its conditions.
_Avoid_: consent, permission

**Funding approval**:
A decision to fund a scheme, by a funder or by a registered provider's investment board.
_Avoid_: grant, investment decision

**Contract**:
An agreement to design, supply or build all or part of a scheme.
_Avoid_: procurement, appointment

**Construction progress**:
The planned and actual progress of a scheme's construction.
_Avoid_: programme, schedule

**Inspection record**:
The outcome of a quality, safety or building control inspection of a scheme.
_Avoid_: snag, audit

**Handover information**:
The information passed to the registered provider when a scheme is completed, such as as-built details and operating and maintenance information.
_Avoid_: O&M manual, handover pack

**Property record**:
The record of one home in a registered provider's portfolio.
_Avoid_: asset record, unit

**Repair**:
A request for, and the record of, a repair or maintenance job on a home.
_Avoid_: work order, job

**Stock condition**:
The assessed physical condition of a home and what it is built from.
_Avoid_: condition survey

**Energy performance**:
The measured or calculated energy performance of a home.
_Avoid_: EPC

### Information types: products

**Product specification**:
A manufacturer's description of a product's design, dimensions, materials and performance.
_Avoid_: datasheet, spec

**Test evidence**:
The results of tests carried out on a product to show how it performs.
_Avoid_: test report

**Product certificate**:
A certification body's confirmation that a product meets a stated standard.
_Avoid_: approval, accreditation

**Product data**:
The structured information about a certified product that is published to a product catalogue.
_Avoid_: product information, catalogue entry

**Product order**:
An order for products for a specific scheme.
_Avoid_: purchase order, call-off

**Supply record**:
The record of products made and supplied to a scheme's site, traceable to each product.
_Avoid_: delivery record, delivery note, traceability record

**Product performance feedback**:
Information on how a product has performed in manufacture, on site or in occupied homes, gathered for continuous improvement.
_Avoid_: defect report, feedback

### Systems

**System**:
A kind of software used in social housing delivery or the product lifecycle, defined by the role it plays rather than by any supplier, such as a housing management system or a configurator.
_Avoid_: tool, application, platform, installation

**Subsystem**:
A distinct part of a system with its own responsibilities and datasets.
_Avoid_: module, component, container

**Software product**:
A specific piece of software that fills a system's role, such as one vendor's housing management product, used by named organisations.
_Avoid_: tool, solution, application, vendor system

**Provenance**:
Where a software product comes from: off-the-shelf, configured, bespoke or IDCC-built.
_Avoid_: origin, source, type

**Off-the-shelf**:
A commercial software product used largely as supplied.
_Avoid_: COTS, SaaS, packaged

**Configured**:
A commercial software product with significant configuration or customisation for the organisations using it.
_Avoid_: customised, tailored

**Bespoke**:
An existing software product custom-built by or for one organisation, including spreadsheets or lists used as a system of record.
_Avoid_: custom, in-house, legacy

**IDCC-built**:
A new software product developed by the IDCC programme.
_Avoid_: new-build, IDCC system

**Geographic scope**:
Whether something applies only within Liverpool City Region or nationally.
_Avoid_: region, coverage, locality

**Organisation role**:
A kind of organisation that takes part in social housing delivery or the IDCC programme: combined authority, local authority, registered provider, manufacturer, certification body, architect, regulator, central government, funder or delivery partner.
_Avoid_: stakeholder, organisation type, sector

**Operator**:
The organisation role that runs a system and is responsible for the information it holds.
_Avoid_: owner, user, tenant

**Registered provider**:
A social housing landlord registered with the regulator, such as Onward Homes or Torus.
_Avoid_: housing association, landlord, RP, housing provider

**Delivery partner**:
An organisation contracted to deliver part of the IDCC programme, such as HVM Catapult.
_Avoid_: contractor, consultant, partner

**Software vendor**:
The company that supplies a software product.
_Avoid_: supplier, provider

### Products

**Product**:
An industrialised construction component or assembly offered by a manufacturer.
_Avoid_: component, part, module, element

**Manufacturer**:
An organisation that develops and makes products.
_Avoid_: supplier, vendor, fabricator

**Kit of parts**:
A defined set of compatible products from which home designs can be configured.
_Avoid_: product range, product system

**Product catalogue**:
A system listing certified products and their information, available for use in configuring home designs.
_Avoid_: library, marketplace

**Configurator**:
A system that composes products from a kit of parts into a home design.
_Avoid_: design tool, generator

### Lifecycles

**Lifecycle**:
An independent sequence of stages that one kind of thing passes through; lifecycles run in parallel and connect only where information from one feeds another.
_Avoid_: process, flow, journey

**Housing delivery lifecycle**:
The lifecycle of a scheme: housing need, pipeline, scheme design, approval, construction, handover, portfolio management.
_Avoid_: housing process, delivery process

**Scheme design**:
The housing delivery stage covering a scheme's feasibility, design and costing.
_Avoid_: development, design stage

**Construction**:
The housing delivery stage covering procurement, manufacture and on-site assembly for a scheme, and tracking its progress.
_Avoid_: delivery, build

**Product lifecycle**:
The lifecycle of a product: product development, certification, cataloguing, manufacture and supply, continuous improvement.
_Avoid_: new product introduction, NPI

**Product development**:
The product lifecycle stage in which a manufacturer designs, develops and tests a product.
_Avoid_: new product introduction, NPI, R&D

**Cataloguing**:
The product lifecycle stage in which a certified product's information is published to the product catalogue.
_Avoid_: listing, onboarding

**Continuous improvement**:
The product lifecycle stage in which feedback on a product's performance in manufacture, on site and in occupied homes goes back into developing its next version.
_Avoid_: feedback loop, lessons learned

### Housing delivery

**Housing need**:
The demand for social homes in an area, by number, type, tenure and location.
_Avoid_: demand, requirement

**Pipeline**:
The prioritised list of proposed and active schemes.
_Avoid_: programme, list

**Scheme**:
One development of social homes on one site, from proposal to completion.
_Avoid_: project, development, site

**Portfolio**:
The homes a provider owns and manages after handover.
_Avoid_: housing stock, assets, estate


### Change over time

**Current state**:
The reference architecture as it exists today.
_Avoid_: as-is, baseline

**Target state**:
The reference architecture as IDCC intends it to be once its systems and integrations are delivered.
_Avoid_: to-be, future state, end state

**Roadmap state**:
Whether a system, or a connection between systems, exists today, is planned, is being retired, or has been retired.
_Avoid_: lifecycle state, status, phase
