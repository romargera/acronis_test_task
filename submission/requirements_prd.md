# Requirements (PRD-Style)

## Operations Center

### Operations goals

- Reduce morning triage time from manual multi-console review to under a few minutes.
- Make cross-tenant risk visible on one screen without scrolling.
- Enable one-click drill-down from signal to tenant-level action, with context attached to the escalation.

### Operations non-goals

- Replacing Security Information and Event Management-level deep investigation.
- Replacing Professional Services Automation ticketing workflow.
- Full third-party Remote Monitoring and Management unification in the first release.

### Operations user stories

- As a Tier 1 technician, I can filter tenants by severity, service, and region and instantly see where to start.
- As a technician, I can click a risk tile and open a tenant drill-down with key posture metrics and a recommended action.
- As an operations user, I can consume a ranked Artificial Intelligence Morning Briefing instead of scanning each tenant manually.
- As a lead technician, I can monitor the Critical Alerts Feed and dispatch escalations with attached context.
- As a technician, I can see how the Operational Risk Score is computed, including factor weights, before I trust it.

### Operations success metrics

Each metric is described with its baseline, target direction, and the event we would instrument to measure it. Baselines are stated as hypotheses to be confirmed in the early access cohort rather than as facts.

- **Median time from login to first dispatched escalation.** Baseline hypothesis: about eight minutes in the current multi-console workflow, to be confirmed by timing three to five technicians during discovery. Target direction: under three minutes for the median technician within roughly three months after general availability. Instrumentation: measure the time between `auth.session_started` and the first `ops.escalation_dispatched` event per session, reported as the daily median per user.
- **Share of technicians who reach the Artificial Intelligence Morning Briefing in the first five minutes of shift.** Baseline hypothesis: not applicable because the feature does not exist today. Target direction: at least seventy percent of active technicians on any given weekday within the first quarter of general availability. Instrumentation: `ops.morning_briefing_viewed` event, divided by daily active technicians.
- **Drill-down to action conversion.** Baseline hypothesis: drill-down rate is visible today but action completion is not. Target direction: at least forty percent of drill-down sessions result in a dispatched or resolved action. Instrumentation: ratio of `ops.drilldown_initiated` to a subsequent `ops.action_completed` event within the same session.
- **Technician confidence in prioritization.** Baseline hypothesis: mixed, measured through a short in-product survey to three to five technicians. Target direction: at least four out of five on a five-point agreement scale. Instrumentation: lightweight in-product micro-survey served once per week, `ops.confidence_survey_submitted`.

## Business Growth Intelligence

### Business goals

- Surface churn risk before the renewal window so owners have time to intervene.
- Prioritize realistic upsell opportunities tied to coverage gaps, ranked by revenue impact.
- Expose margin leakage and portfolio performance trends that are obscured by per-tenant views today.
- Make portfolio performance comparable to a peer cohort on the metrics that actually move retention and revenue.

### Business non-goals

- Accounting-grade financial reporting.
- Contract management and invoicing.
- Full Customer Relationship Management and Professional Services Automation automation in the first release.

### Business user stories

- As an MSP owner, I can identify high-risk clients ranked by revenue impact.
- As a practice lead, I can inspect service coverage gaps and estimate Monthly Recurring Revenue uplift from closing them.
- As a manager, I can generate a Quarterly Business Review draft from one click to accelerate preparation.
- As an owner, I can see how my portfolio compares to similar MSPs on four key metrics, with an explicit cohort definition and privacy floor.
- As an owner, I can see how the Churn Risk Score is computed, including factor weights, before I act on it.

### Business success metrics

- **Weekly active usage by owners and practice leads.** Baseline hypothesis: not applicable because the dashboard does not exist today. Target direction: at least forty percent of owner and practice-lead accounts active in any given calendar week within the first quarter of general availability. Instrumentation: `biz.dashboard_viewed` event at session granularity.
- **Quarterly Business Review preparation time.** Baseline hypothesis: ninety to one hundred twenty minutes today, to be confirmed by shadowing three owners through a real Quarterly Business Review cycle. Target direction: under thirty minutes of preparation time using the Quarterly Business Review Draft Preview as a starting point within the first quarter after general availability. Instrumentation: self-reported through a post-Quarterly Business Review survey in v1 rather than automated timing, which we would add in v2.
- **At-risk Monthly Recurring Revenue covered by an intervention plan.** Baseline hypothesis: roughly twenty to thirty percent of at-risk Monthly Recurring Revenue has a formal intervention plan today. Target direction: at least seventy-five percent of at-risk Monthly Recurring Revenue has a tagged intervention plan within one quarter after general availability. Instrumentation: `biz.intervention_plan_created` event tagged with client identifier, joined to the at-risk Monthly Recurring Revenue roll-up.
- **Peer benchmark engagement.** Baseline hypothesis: not applicable because the feature does not exist. Target direction: at least sixty percent of owner sessions that visit the Business Growth dashboard also interact with the Peer Benchmark card. Instrumentation: `biz.peer_benchmark_expanded` event divided by `biz.dashboard_viewed` sessions for owner roles.
- **Retention trend for high-risk accounts.** Baseline hypothesis: needs a comparison window of at least two quarters before the number is trustworthy. Target direction: improvement in renewal rate for accounts flagged as high or critical churn risk at least sixty days before renewal, versus a matched pre-dashboard comparison group. Instrumentation: existing renewal data cross-referenced with the weekly churn score snapshot.

### Cross-dashboard requirements

- Shared six-filter state (time window, severity, services, regions, countries, segments) that persists when switching dashboards.
- Explainability: every scored metric on either dashboard exposes its formula and factor weights via a confidence badge.
- Every Key Performance Indicator card is drill-capable; when the destination page is not ready in v1 it routes to an explicit placeholder rather than a dead click.
- Units, baseline comparison period, and positive or negative diff colors are shown consistently across both dashboards.
