# Data Sources & Model

`(A)` marks a working assumption that is also listed in the Assumptions register.

This is not a production schema. It is a lightweight sketch to show the proposal is believable with data Acronis already has, or could reasonably ingest, and to make the scoring choices explicit enough to defend in review.

## Operations dashboard

| Data needed | Plausible source | Refresh cadence | Notes |
| --- | --- | --- | --- |
| Backup job outcomes | Acronis backup and task telemetry | Near real time plus daily rollup | Used for posture cards and alert context. |
| Patch compliance | Endpoint and vulnerability scan telemetry | Daily incremental | Drives risk and trend cards. |
| Threat detections | Security and EDR event stream | Near real time | Used in the critical alert feed. |
| Endpoint inventory | Device and agent inventory | Minutes | Supports tenant drill-down. |
| Tenant hierarchy | Partner and customer metadata | Daily | Needed for segmentation and filtering. |

## Business-growth dashboard

| Data needed | Plausible source | Refresh cadence | Notes |
| --- | --- | --- | --- |
| Tenant MRR and usage | Usage and billing telemetry | Daily | Powers revenue and at-risk cards. |
| Service coverage per tenant | Product enablement plus usage state | Daily | Upsell gap detection. |
| Ticket, SLA, and escalation patterns | PSA connector events | Daily, near real time for critical | Core churn features. |
| Client engagement signals | Product usage plus QBR activity | Daily | Churn leading indicators. |
| Portfolio trend aggregate | Internal analytics aggregate pipeline | Weekly and monthly | Directional planning context. |
| Peer cohort aggregates | Anonymized cross-tenant aggregation warehouse view | Weekly | See peer benchmark section below for governance. |

## Minimal Model Sketch

### Core entities

- `tenant` (id, segment, region, tenure, endpoint_count).
- `service_coverage` (tenant_id, service, status).
- `ops_daily_snapshot` (tenant_id, date, backup_success, patch_compliance, threats, open_critical).
- `business_daily_snapshot` (tenant_id, date, mrr, est_cost, margin_pct, churn_score).
- `risk_signal_event` (tenant_id, type, severity, timestamp, description).
- `peer_cohort_metric` (cohort_id, metric_id, p25, p50, p75, sample_size, as_of_date).

## Scoring: Operational Risk Score

Version: Heuristic v1. The score is a weighted sum of four factors, normalized to a zero to one hundred scale. We ship this as a rules-based score in v1 rather than a trained model; see the rationale in the trade-offs section of the problem framing document.

| Factor | Weight | Source | Rationale |
| --- | --- | --- | --- |
| Backup failure rate | 0.35 | Backup and task telemetry | Primary backup promise; most direct MSP liability when it fails. |
| Patch lag in days past the published CVE date | 0.25 | Vulnerability scan telemetry | Strong leading indicator of exploitable surface. |
| Open critical alerts, severity-weighted | 0.20 | Security and EDR events | Captures current incident pressure. |
| SLA miss rate over the last fourteen days | 0.20 | PSA connector | Contract exposure; ties ops signal to commercial risk. |

Missing-data handling: if a factor lacks fresh data for a tenant, its weight is redistributed proportionally across the remaining factors, and the hover explanation on the confidence badge lists which factors were missing so the technician can judge whether to trust the score.

## Scoring: Churn Risk Score

Version: Heuristic v1. The score is a weighted sum of five signals, normalized to a zero to one hundred scale.

| Factor | Weight | Source | Rationale |
| --- | --- | --- | --- |
| Ticket reopen rate | 0.30 | PSA connector | Strong early signal to validate in discovery. (A) |
| Escalation rate | 0.25 | PSA connector | Reflects customer frustration and internal cost pressure. |
| SLA compliance drop | 0.20 | PSA connector | Directly visible to customer stakeholders. |
| QBR attendance drop | 0.15 | CRM or internal QBR tracker | Sponsor disengagement is a renewal risk signal. |
| Billing disputes | 0.10 | Billing system | Late signal but very high conviction when present. |

Missing-data handling: if PSA connector quality is too low for a tenant (covered by the validation plan as an assumption), the score is shown as *Unavailable* with an explicit data-gap label. We do not guess a score.

## Peer Benchmark Aggregates

- Cohort definition is explicit and shown on the widget: in v1 we start with a single cohort labeled *Mid-market MSPs* (A), defined broadly enough to make peer comparison useful for similarly scaled MSPs without pretending to be universal.
- Each metric displays the twenty-fifth, fiftieth, and seventy-fifth percentile of the cohort plus the current MSP's own value.
- Privacy floor: any metric in any cohort is suppressed if it does not clear a minimum privacy threshold (A), and cells suppressed this way render as *Not enough data yet* rather than a numeric value.
- Refresh: peer aggregates are recomputed weekly through an offline batch job on a separate analytics warehouse view, not through per-request reads on live tenant data.

## Instrumentation Cost Awareness

This is the kind of thing that looks free in a proposal and hurts eighteen months later. Rough sizing:

- **Operations near real time snapshots.** Higher cost. Requires a streaming ingestion path and a write-through cache so the KPI row and the Critical Alerts Feed stay honest. Much of this likely builds on the existing telemetry stack (A); incremental cost should stay manageable as long as we do not add per-dashboard-load queries against hot storage.
- **Business daily snapshots.** Low cost. A nightly batch job reads billing and usage aggregates and writes a per-tenant row. One row per tenant per day is cheap even at tens of thousands of tenants.
- **Peer cohort aggregation.** Moderate one-time cost, low recurring cost. Runs weekly offline; the main cost is getting the cohort definition and privacy floor right once, not the compute.
- **Product analytics events for success metrics.** We expect roughly twelve to fifteen new events across both dashboards, including `ops.morning_briefing_viewed`, `ops.drilldown_initiated`, `ops.escalation_dispatched`, `biz.kpi_drilled`, `biz.peer_benchmark_expanded`, `biz.qbr_preview_opened`. This rides on the existing analytics pipeline and is effectively incremental on top of current event volume; we are not introducing a new analytics system to support it.
- **Trained models.** Deliberately not in v1. The warm-up period required to collect labeled churn data is a cost we are postponing until the rules-based scoring has produced enough feedback to calibrate weights and to judge whether a trained model is worth the ongoing storage and retraining cost.

## Gaps to close in production

- Reliable PSA integration quality and tenant-identity mapping.
- Consistent cost model calibration across MSPs, because margin estimation depends on a defensible delivery-cost proxy.
- Governance rules for peer benchmark participation, including an explicit opt-in flow and the publishing policy for cohort definitions.
