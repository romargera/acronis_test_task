# PRD: Acronis Intelligence Dashboards

Author: Roman Babunts.

> NOTE:
>
> - The canonical submission lives in `submission/`. This document is an optional long-form version kept for readers who want the full narrative including the Assumption Register and alternatives considered.
> - Marker `(A)` means an assumption that is not fully validated yet; every `(A)` item is also listed in the Assumption Register at the end.
> - Scope is strictly two dashboards: Operations and Business Growth.

---

## 1. Problem and baseline

### 1.1 Problem statement from task and interview

Context:
a. Acronis needs two dashboards for MSPs:

- an operations dashboard for technical users,
- a business-growth dashboard for owners/practice leads.
b. current dashboard/reporting capability is considered outdated,
c. roadmap direction is to move from report replacement to BI + AI insights,
d. target value is not only operational visibility but also partner business growth.

Product problem:

- MSP data is fragmented across many tools,
- current dashboard experience does not consistently support fast cross-tenant triage and business decisions,
- users need action-oriented visibility (what is wrong, why, what to do next) rather than static snapshots.

Baseline parity details are moved to **Appendix 8.4** and **8.5** to keep the core PRD focused on decisions and requirements.

---

## 2. Product vision and goals

### 2.1 Vision for Acronis

Make Acronis the default intelligence layer on top of cyber-protection telemetry, so MSP partners can run daily operations and strategic growth decisions from one product surface.

### 2.2 Vision for MSP partners

Give partners a decision cockpit that helps them:

- detect operational risk early,
- prioritize work by impact,
- protect and grow recurring revenue,
- prepare customer communication (for example QBR) with less manual effort.

### 2.3 Goals

Goals:

- improve operational decision speed and triage quality,
- improve business decision quality on churn, upsell, and margin,
- create a clear path for free-to-paid analytics value,
- deliver a modernized reporting/dashboard baseline in the first release stage,
- (planned for next stage) deliver data warehouse/lake foundation plus predictive AI capabilities.

Design principles:

- preserve current strengths (widgets, fast entry points, export/send actions, click investigation),
- add stronger decision support and readability without increasing cognitive load.

---

## 3. Problem framing and personas

### 3.1 Dashboard A: Operations Dashboard

Segment summary:

- daily users are Tier-1/Tier-2 MSP technicians handling many tenants and endpoints,
- primary context is shift-based triage and incident prevention.

Persona:

- Sarah, Tier-1 NOC technician.

JTBD:

- When I start my shift, I want to quickly identify which tenant needs attention first, so I can reduce time-to-first-action and avoid avoidable escalations.

Top decisions:

- where to triage first,
- whether posture is drifting,
- what to escalate and with what context.

Why it matters:

- cross-tool context switching slows response,
- alert noise hides true priorities,
- weak prioritization increases SLA and customer satisfaction risk.

### 3.2 Dashboard B: Business Growth Dashboard

Segment summary:

- weekly users are MSP owners/practice leads responsible for retention, upsell, and service economics,
- primary context is portfolio-level commercial and quality control.

Persona:

- Mike, MSP owner/practice lead.

JTBD:

- When I review portfolio health, I want to see churn and growth signals early, so I can take actions before revenue impact happens.

Top decisions:

- which clients are at churn risk,
- where upsell opportunity is strongest,
- where margin or delivery model is leaking.

Why it matters:

- business risk is often detected too late,
- manual preparation for client communication is expensive,
- no clear comparative context leads to weak prioritization.

---

## 4. Requirements (PRD for Q3 2026 MVP)

### 4.1 Operations Dashboard requirements

Goals for observability:

- show cross-tenant risk posture in one screen,
- show trends for backup, patch, threat, and alert dynamics,
- make critical signal changes visible with explicit time context.

Goals for product navigation and discoverability:

- each high-level signal should allow click-through into details,
- dashboard should guide user from summary to action without dead ends,
- key platform entry points (`Add widget`, `Share`) must stay visible and understandable.

Non-goals:

- replacing full SIEM investigation workflows,
- replacing PSA ticketing systems,
- adding heavy configuration workflows in v1.

Primary user stories:

- OPS-1: as a technician, I need a cross-tenant risk view to prioritize first action.
- OPS-2: as a technician, I need trend views with clear period comparison so I understand drift direction.
- OPS-3: as a technician, I need actionable AI briefing cards with recommended next step.
- OPS-4: as a technician, I need filter combinations (including multi-select where relevant) to isolate context.
- OPS-5: as a technician, I need click-through from KPI to detailed list/report surface.

Success metrics:

- reduced median time-to-first-action,
- reduced time spent on morning triage,
- increased drill-down to action completion rate,
- improved user confidence in prioritization.

### 4.2 Business Growth Dashboard requirements

Goals for observability:

- show MRR movement with explicit baseline period and visible forecast line,
- show churn risk and its contributing signals,
- show revenue/margin signal quality with comparable units.

Goals for product navigation and discoverability:

- every key business KPI must be explorable via click-through,
- churn and upsell insights must be discoverable without deep navigation,
- user must understand where a recommendation came from.

Non-goals:

- replacing accounting systems,
- replacing CRM and contract workflows,
- presenting financial statements as audit-grade accounting.

Primary user stories:

- BIZ-1: as an owner, I need ranked churn-risk clients with explainability.
- BIZ-2: as an owner, I need visible upsell opportunities tied to missing coverage.
- BIZ-3: as an owner, I need margin-oriented client ranking and sort controls.
- BIZ-4: as an owner, I need visible forecast in MRR trend to support planning.
- BIZ-5: as an owner, I need one-click QBR preview flow as communication accelerator.
- BIZ-6: as an owner, I need a peer benchmark view so I can see how my portfolio compares to similar MSPs on retention, margin, Service Level Agreement compliance, and Monthly Recurring Revenue per endpoint, with an explicit cohort definition and anonymization floor.

Success metrics:

- weekly owner usage of business dashboard,
- action conversion on upsell/churn recommendations,
- higher confidence in planning decisions,
- faster preparation cycle for customer business reviews.

### 4.3 Cross-dashboard UX and chart quality guardrails

Mandatory interaction and readability rules:

- support multi-select filters where it affects comparison quality,
- both dashboards must expose the same six filters (time window, severity, services, regions, countries, segments),
- shared filter state must persist when switching between Operations and Business Growth dashboards,
- make primary KPI cards clickable and route to detail placeholder if backend is not ready,
- show "diff vs period" clearly and consistently (with hover detail for exact baseline),
- add info icon for metrics that require formula explanation,
- line charts must include points, axes, and point-level hover details,
- all charts must display units explicitly,
- diff indicators must use clear positive/negative color semantics,
- `MRR Trend & Forecast` must include a visibly distinct forecast line,
- lists and client collections must support sort criteria switching,
- heatmap tile area must be aligned and visually balanced (avoid oversized tiles and top misalignment),
- critical alert feed tile severity colors should match heatmap severity colors,
- `Monthly Storage Usage` trend points should be non-flat from point to point,
- `Posture Trends` text should not duplicate hardcoded window wording when the global window filter controls horizon,
- `AI Morning Briefing` should have adjacent `Sort` and `View` filters (`Top 5` / `All`),
- tenant drill-down should allow single-select business switching by clicking the tenant name in header,
- KPI tiles should be grouped on a common surface for faster scanning.

Must preserve production entry points:

- keep clear access to `Add widget` and `Share` flows in the prototype.

---

## 5. Data sources and model

### 5.1 Operations dashboard data

Required data groups:

- backup job outcomes,
- patch/vulnerability state,
- threat/alert events,
- endpoint inventory and health,
- tenant and hierarchy context.

Likely data locations:

- Acronis task/alert/agent telemetry APIs,
- tenant hierarchy and usage endpoints,
- platform event streams.

Load-bearing assumptions:

- PSA-style SLA and ticket context can be connected for richer triage context `(A)`.
- tenant identity mapping across data domains is stable and queryable `(A)`.

### 5.2 Business dashboard data

Required data groups:

- usage and revenue proxy (MRR-like) inputs,
- service coverage status by client,
- ticket/SLA/escalation behavior,
- engagement signals and account behavior.

Likely data locations:

- usage/account APIs,
- PSA connectors,
- CRM/billing connectors,
- analytics warehouse views.

Load-bearing assumptions:

- stable, high-quality PSA connector data will be available for reopen/SLA/escalation metrics `(A)`.
- MRR proxy built from usage/billing mapping is accurate enough for decision support in v1 `(A)`.
- churn model will need an initial warm-up period before trustworthy precision `(A)`.

### 5.3 Modeling notes

Operations:

- composite risk score should be explainable with per-factor contribution.

Business:

- churn score should include explainability panel (top drivers, direction, confidence band).

Cross-cutting:

- every score and trend needs "how calculated" hover info.

---

## 6. Interactive prototype scope (task-aligned)

In-scope now (3-4h task scope):

- two dashboard pages only,
- realistic fake data,
- meaningful click-through flows,
- six shared filters across both dashboards with cross-tab state persistence,
- drill-down panel behavior,
- KPI diff recalculation based on active filter scope,
- operations KPI row grouped on a common surface for readability,
- Operations includes baseline parity widgets in the same page (summary counters, storage trend, status/protection donuts),
- `AI Morning Briefing` includes `Sort` + `View` (`Top 5` / `All`) controls,
- tenant drill-down supports single-select business switcher from clickable tenant name,
- aligned severity color semantics between heatmap and critical-alert tiles,
- QBR preview modal in Business dashboard.

Out-of-scope now:

- full Client 360 page,
- production-grade ML pipeline,
- external system writeback.

---

## 7. What I would add with +2 more hours

- add optional `Client 360` page linked from both dashboards as a tenant deep-dive hub (timeline, service coverage map, unified action and QBR context),
- replace the `Set goal` placeholder with a complete goal-setting flow (target, owner, cadence, progress tracking),
- add richer click-through placeholders for KPI drill-down destinations,
- add event instrumentation plan for validating interaction quality,
- design migration logic for existing users to mitigate adoption risk if they prefer classic overview behavior (guided onboarding, fallback path, parity callouts, opt-out capture).

Validation questions for that +2h extension:

- which goal format is easier for owners: monthly target, target band, or milestone plan `(A)`,
- what minimum explanation is needed so owners trust goal progress status `(A)`.

---

## 8. Appendix

### 8.1 Alternatives considered

Alternative 1:

- incremental update of existing dashboards.
- rejected because it limits step-change in decision support.

Alternative 2:

- one universal dashboard for all personas.
- rejected due to role conflict and cognitive overload.

Alternative 3:

- two role-specific dashboards with shared data layer.
- selected as best fit for task scope and product clarity.

Alternative 4:

- immediate full cross-tool intelligence platform.
- postponed due to dependency and delivery risk `(A)`.

### 8.2 Current production baseline

- Operations dashboard has basic overview with a top summary card.
- Business-growth dashboard does not exist.
- Users have visible entry points `Add widget`, `Download`, `Send`.
- Widgets include charts/lists and are designed as clickable investigation entry points.
- Operations dashboard supports customizable widgets and periodic refresh.
- Documented refresh cadence is frequent (overview-level and operations-level updates).
- Operations/overview model already supports drill-down-like investigation patterns.

### 8.3 Baseline metric and visualization parity checklist

The current production view already communicates several metric patterns clearly, so v1 should keep parity:

- top summary metric row with direct operational counters:
  - Backed up today,
  - Malware blocked,
  - URLs blocked,
  - Existing vulnerabilities,
  - Patches ready to install.
- trend + status composition widgets:
  - Monthly storage usage as a time series,
  - Status as category donut with counts,
  - Protection status as category donut with counts.
- quick action and reporting entry points:
  - `Add widget`,
  - `Download`,
  - `Send`.

Behavioral parity points:

- widget-level clickability for investigation entry,
- widget customization and reorder pattern,
- regular refresh behavior for operational relevance.

Prototype adaptation note:

- current prototype uses `Add widget` and `Share` actions in the primary toolbar and keeps the same investigative click behavior.

---

## 9. Assumption Register

- A1 `(A)`: PSA-style SLA/ticket context can be integrated in a reliable way for operations triage enrichment.
- A2 `(A)`: Tenant identity mapping is stable across all required data sources.
- A3 `(A)`: PSA connector quality is sufficient for reopen/SLA/escalation based churn features.
- A4 `(A)`: Usage-to-MRR proxy is accurate enough for decision support in v1.
- A5 `(A)`: Churn modeling requires warm-up period before trustworthy precision.
- A6 `(A)`: The best goal-setting format for owners still needs validation.
- A7 `(A)`: Immediate full cross-tool intelligence platform is too risky for first delivery stage.
