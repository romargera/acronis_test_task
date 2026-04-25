# Requirements (PRD-Style)

## Operations dashboard

### Operations goals

- Reduce morning triage time from manual multi-console review to under a few minutes.
- Make cross-tenant risk visible on one screen without scrolling.
- Enable one-click drill-down from signal to tenant-level action, with context attached to the escalation.

### Operations non-goals

- Replacing Security Information and Event Management-level deep investigation.
- Replacing PSA ticketing workflow.
- Full third-party Remote Monitoring and Management unification in the first release.

### Operations user stories

- As a Tier 1 technician, I can filter tenants by severity, service, and region and instantly see where to start.
- As a technician, I can click a risk tile and open a tenant drill-down with key posture metrics and a recommended action.
- As an MSP technician or IT admin, I can use a ranked AI Morning Briefing instead of scanning each tenant manually.
- As a lead technician, I can monitor the Critical Alerts Feed and dispatch escalations with attached context.
- As a technician, I can see how the Operational Risk Score is computed, including factor weights, before I trust it.

### Operations success metrics

All quantitative metrics below are grouped into product, business, and technical metrics. These are the data-backed signals we would review regularly. Qualitative signals are listed separately because they require interviews, usability sessions, or survey feedback rather than telemetry alone. `(A)` marks a directional assumption rather than a validated baseline or target.

Primary JTBD: help the technician identify where to act first and take the first meaningful action quickly.  
Sub-JTBDs: detect drift early and escalate with the right context.

#### Product metrics

- **Primary JTBD: median time from login to first dispatched escalation.** Baseline hypothesis (A): about eight minutes in the current multi-console workflow, to be confirmed by timing three to five technicians during discovery. Target direction (A): under three minutes for the median technician within roughly three months after general availability. Instrumentation: measure the time between `auth.session_started` and the first `ops.escalation_dispatched` event per session, reported as the daily median per user.
- **Sub-JTBD: dashboard-led valuable action rate.** Baseline hypothesis: not instrumented today. Target direction (A): at least half of active technician sessions reach a valuable next step directly from the AI Morning Briefing, Risk Heatmap, or drill-down without requiring a separate starting tool. Instrumentation: chain `ops.briefing_item_opened`, `ops.heatmap_tile_opened`, or `ops.drilldown_initiated` to a subsequent valuable-action event in the same session. Note: if Acronis does not yet tag which downstream actions are genuinely valuable, an initial proxy can segment long click-outs versus short click-outs from the dashboard and then refine the taxonomy with observed user behavior.
- **Share of technicians who reach the AI Morning Briefing in the first five minutes of shift.** Baseline hypothesis: not applicable because the feature does not exist today. Target direction (A): at least seventy percent of active technicians on any given weekday within the first quarter of general availability. Instrumentation: `ops.morning_briefing_viewed` event, divided by daily active technicians.
- **Drill-down to valuable next-step conversion.** Baseline hypothesis: drill-down rate is visible today but meaningful next steps are not. Target direction (A): at least forty percent of drill-down sessions result in a dispatched escalation, documented follow-up, or resolution action. Instrumentation: ratio of `ops.drilldown_initiated` to a subsequent valuable-action event within the same session.

#### Business metrics

- **SLA breach rate for scoped tenants.** Baseline hypothesis (A): to be established during early access. Target direction: decline versus a matched pre-dashboard baseline for active users. Instrumentation: weekly SLA breach snapshot joined to dashboard usage cohort.
- **Avoidable Tier 2 escalations per 100 managed tenants.** Baseline hypothesis (A): to be measured in pilot. Target direction: downward trend for teams actively using the dashboard. Instrumentation: escalation reason codes plus Tier 2 reopen tags, normalized by tenant count.

#### Technical metrics

- **Dashboard time to usable data.** Baseline hypothesis: not instrumented today. Target direction (A): p95 under two seconds for a warm load and under four seconds for a cold load. Instrumentation: browser-based real user monitoring event `ops.dashboard_usable`.
- **Critical alert freshness.** Baseline hypothesis: current freshness is inconsistent across widgets. Target direction (A): at least ninety-five percent of critical alerts appear in the feed within five minutes of source-event ingestion. Instrumentation: freshness monitor comparing source event timestamp to surfaced widget timestamp.
- **Operational Risk Score coverage.** Baseline hypothesis: not applicable because the score does not exist today. Target direction (A): score available for at least ninety percent of tenants in the current filter when required data sources are connected. Instrumentation: daily score-coverage monitor by tenant and factor completeness.
- **Graceful degradation under partial source failure.** Baseline hypothesis: not instrumented today. Target direction (A): at least ninety-nine percent of sessions still render the dashboard shell and unaffected widgets when one upstream source is stale or unavailable. Instrumentation: widget-level render status, error-boundary telemetry, and synthetic outage monitoring.

#### Qualitative signals

- Technicians say the ranking and color coding broadly match their mental model of what should be worked first.
- Technicians say escalations created from the dashboard include enough context for Tier 2 to act without extra back-and-forth.
- Technicians say score explanations, units, and diffs are understandable without separate documentation.

## Business-growth dashboard

### Business goals

- Surface churn risk before the renewal window so owners have time to intervene.
- Prioritize realistic upsell opportunities tied to coverage gaps, ranked by revenue impact.
- Expose margin leakage and portfolio performance trends that are obscured by per-tenant views today.
- Make portfolio performance comparable to a peer cohort on the metrics that actually move retention and revenue.

### Business non-goals

- Accounting-grade financial reporting.
- Contract management and invoicing.
- Full CRM and PSA automation in the first release.

### Business user stories

- As an MSP owner, I can identify high-risk clients ranked by revenue impact.
- As a practice lead, I can inspect service coverage gaps and estimate MRR uplift from closing them.
- As a manager, I can generate a QBR draft from one click to accelerate preparation.
- As an owner, I can see how my portfolio compares to similar MSPs on four key metrics, with an explicit cohort definition and privacy floor.
- As an owner, I can see how the Churn Risk Score is computed, including factor weights, before I act on it.

### Business success metrics

All quantitative metrics below are grouped into product, business, and technical metrics. These are the data-backed signals we would review regularly. Qualitative signals are listed separately because they require interviews, usability sessions, or survey feedback rather than telemetry alone. `(A)` marks a directional assumption rather than a validated baseline or target.

Primary JTBD: help the owner or practice lead identify where revenue is at risk or where growth is available, then commit to the next action.  
Sub-JTBDs: prepare customer communication faster and compare portfolio performance to peers with enough confidence to act.

#### Product metrics

- **Primary JTBD: time to identify the top three accounts requiring action and open the first client drill-down.** Baseline hypothesis (A): currently requires a manual review across multiple tools and spreadsheets. Target direction (A): under ten minutes for a weekly portfolio review. Instrumentation: elapsed time from `biz.dashboard_viewed` to the third `biz.client_drilldown_opened` or equivalent ranked-insight interaction.
- **Sub-JTBD: QBR preparation time.** Baseline hypothesis (A): ninety to one hundred twenty minutes today, to be confirmed by shadowing three owners through a real QBR cycle. Target direction (A): under thirty minutes of preparation time using the QBR Draft Preview as a starting point within the first quarter after general availability. Instrumentation: self-reported through a post-QBR survey in v1 rather than automated timing, which we would add in v2.
- **Sub-JTBD: decision-to-next-step rate.** Baseline hypothesis: not instrumented today. Target direction (A): at least half of owner sessions that inspect churn or upsell signals end with an explicit next step such as intervention-plan creation or QBR draft opening. Instrumentation: chain `biz.client_drilldown_opened`, `biz.upsell_inspected`, or `biz.churn_client_opened` to `biz.intervention_plan_created` or `biz.qbr_preview_opened`.
- **Weekly active usage by owners and practice leads.** Baseline hypothesis: not applicable because the dashboard does not exist today. Target direction (A): at least forty percent of owner and practice-lead accounts active in any given calendar week within the first quarter of general availability. Instrumentation: `biz.dashboard_viewed` event per session.

#### Business metrics

- **At-risk MRR covered by an intervention plan.** Baseline hypothesis (A): roughly twenty to thirty percent of at-risk MRR has a formal intervention plan today. Target direction (A): at least seventy-five percent of at-risk MRR has a tagged intervention plan within one quarter after general availability. Instrumentation: `biz.intervention_plan_created` event tagged with client identifier, joined to the at-risk MRR roll-up.
- **Expansion MRR influenced by surfaced upsell opportunities.** Baseline hypothesis (A): to be established in pilot. Target direction: upward trend in closed-won or committed upsell MRR for accounts first inspected through the dashboard. Instrumentation: opportunity records tagged to `biz.upsell_inspected` sessions and matched to later expansion events.
- **Retention trend for high-risk accounts.** Baseline hypothesis (A): needs a comparison window of at least two quarters before the number is trustworthy. Target direction (A): improvement in renewal rate for accounts flagged as high or critical churn risk at least sixty days before renewal, versus a matched pre-dashboard comparison group. Instrumentation: existing renewal data cross-referenced with the weekly churn score snapshot.

#### Technical metrics

- **Dashboard time to usable data.** Baseline hypothesis: not instrumented today. Target direction (A): p95 under three seconds for a warm load and under five seconds for a cold load. Instrumentation: browser-based real user monitoring event `biz.dashboard_usable`.
- **Churn Risk Score coverage.** Baseline hypothesis: not applicable because the score does not exist today. Target direction (A): score available for at least eighty percent of tenants when billing, PSA, and product telemetry connections are present. Instrumentation: daily coverage monitor for churn-score eligibility and missing-factor counts.
- **QBR draft generation success rate.** Baseline hypothesis: not applicable because the feature does not exist today. Target direction (A): at least ninety-five percent of draft-preview requests complete successfully without timeout or error. Instrumentation: `biz.qbr_preview_requested` to `biz.qbr_preview_rendered` success ratio, plus latency distribution.
- **Graceful degradation under partial source failure.** Baseline hypothesis: not instrumented today. Target direction (A): at least ninety-nine percent of sessions still render the dashboard shell and unaffected widgets when one upstream source such as billing, PSA, or peer-benchmark data is stale or unavailable. Instrumentation: widget-level render status, error-boundary telemetry, and synthetic outage monitoring.

#### Qualitative signals

- Owners say the dashboard makes it clearer where revenue is at risk and where growth is available.
- Owners say the peer benchmark is believable enough to use in planning or leadership discussion.
- Owners say the QBR draft is useful enough as a starting point rather than just a demo artifact.

### Cross-dashboard requirements

- Shared six-filter state (time window, severity, services, regions, countries, segments) that persists when switching dashboards.
- Explainability: every scored metric on either dashboard exposes its formula and factor weights via a confidence badge.
- Every Key Performance Indicator card is drill-capable; when the destination page is not ready in v1 it routes to an explicit placeholder rather than a dead click.
- Units, baseline comparison period, and positive or negative diff colors are shown consistently across both dashboards.
