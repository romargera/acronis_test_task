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

All quantitative metrics below are grouped into product, business, and technical metrics. Qualitative signals are listed separately. `(A)` marks a directional assumption rather than a validated baseline or target.

Primary JTBD: help the technician identify where to act first and take the first meaningful action quickly.  
Sub-JTBDs: detect drift early and route into the right next step with enough context.

Note: until Acronis has a validated taxonomy of valuable downstream actions, v1 can use a proxy based on engaged click-outs, downstream follow-through events, and long versus short click-outs from the dashboard.

#### Product metrics

- **Time to first valuable next step** (primary JTBD). Baseline (A): about eight minutes today. Target (A): under three minutes. Measure: `auth.session_started` to first valuable-action event.
- **Dashboard-led valuable next-step rate** (sub-JTBD). Target (A): at least half of active technician sessions. Measure: briefing, heatmap, or drill-down interaction followed by a valuable-action event in the same session.
- **Cross-surface discoverability per active technician.** Target (A): more unique downstream domains or products opened from the dashboard per active user than today. Measure: unique downstream tools opened from dashboard entry points.
- **Widget utility funnel by widget.** Track: viewport impression -> engaged click -> valuable next step for AI Morning Briefing, Risk Heatmap, Critical Alerts Feed, and key tiles.
- **Session efficiency.** Track: any-click rate plus median and average session duration. Read together so that higher time on page is not misread when no-click consumption increases.

#### Business metrics

- **Preventable Tier 2 escalations per 100 managed tenants.** Baseline (A): to be measured in pilot. Target: downward trend for active users.
- **SLA breach rate on scoped tenants.** Baseline (A): to be established during early access. Target: decline versus a matched pre-dashboard baseline.

#### Technical metrics

- **Dashboard time to usable data.** Target (A): p95 under two seconds for a warm load and under four seconds for a cold load.
- **Critical alert freshness.** Target (A): at least ninety-five percent of critical alerts visible within five minutes of source-event ingestion.
- **Operational Risk Score coverage.** Target (A): score available for at least ninety percent of tenants in the current filter when required sources are connected.
- **Graceful degradation under partial source failure.** Target (A): at least ninety-nine percent of sessions still render the dashboard shell and unaffected widgets when one upstream source is stale or unavailable.

#### Qualitative signals

- Technicians say the ranking and color coding broadly match their mental model of what should be worked first.
- Technicians say downstream click-outs usually lead to the intended tool or action with little confusion.
- Technicians say score explanations, units, and diffs are understandable without separate documentation.
- There is little negative unsolicited feedback about the dashboard in partner community channels, support feedback, and social networks.

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

All quantitative metrics below are grouped into product, business, and technical metrics. Qualitative signals are listed separately. `(A)` marks a directional assumption rather than a validated baseline or target.

Primary JTBD: help the owner or practice lead identify where revenue is at risk or where growth is available, then commit to the next action.  
Sub-JTBDs: prepare customer communication faster and compare portfolio performance to peers with enough confidence to act.

#### Product metrics

- **Time to identify the top three accounts requiring action and open the first client drill-down** (primary JTBD). Baseline (A): currently a manual multi-tool review. Target (A): under ten minutes for a weekly portfolio review.
- **Decision-to-next-step rate** (sub-JTBD). Target (A): at least half of owner sessions that inspect churn or upsell signals end with an explicit next step such as intervention-plan creation or QBR draft opening.
- **QBR preparation time** (sub-JTBD). Baseline (A): ninety to one hundred twenty minutes today. Target (A): under thirty minutes.
- **Weekly active usage by owners and practice leads.** Target (A): at least forty percent in a given calendar week.
- **Session efficiency.** Track: any-click rate plus median and average session duration, interpreted together with no-click consumption.
- **Widget utility funnel by widget.** Track: viewport impression -> engaged click -> valuable next step for churn radar, upsell pipeline, margin leakage, QBR preview, and peer benchmark.

#### Business metrics

- **At-risk MRR covered by an intervention plan.** Baseline (A): roughly twenty to thirty percent today. Target (A): at least seventy-five percent.
- **Expansion MRR influenced by surfaced upsell opportunities.** Baseline (A): to be established in pilot. Target: upward trend.
- **Retention trend for high-risk accounts.** Baseline (A): needs at least two quarters of observation. Target (A): improvement versus a matched pre-dashboard comparison group.

#### Technical metrics

- **Dashboard time to usable data.** Target (A): p95 under three seconds for a warm load and under five seconds for a cold load.
- **Churn Risk Score coverage.** Target (A): score available for at least eighty percent of eligible tenants when required sources are connected.
- **QBR draft generation success rate.** Target (A): at least ninety-five percent of draft-preview requests complete without timeout or error.
- **Graceful degradation under partial source failure.** Target (A): at least ninety-nine percent of sessions still render the dashboard shell and unaffected widgets when one upstream source is stale or unavailable.

#### Qualitative signals

- Owners say the dashboard makes it clearer where revenue is at risk and where growth is available.
- Owners say the peer benchmark is believable enough to use in planning or leadership discussion.
- Owners say the QBR draft is useful enough as a starting point rather than just a demo artifact.
- There is little negative unsolicited feedback about the dashboard in partner community channels, support feedback, and social networks.

### Cross-dashboard requirements

- Shared six-filter state (time window, severity, services, regions, countries, segments) that persists when switching dashboards.
- Explainability: every scored metric on either dashboard exposes its formula and factor weights via a confidence badge.
- Every Key Performance Indicator card is drill-capable; when the destination page is not ready in v1 it routes to an explicit placeholder rather than a dead click.
- Units, baseline comparison period, and positive or negative diff colors are shown consistently across both dashboards.
