# Data Sources & Model (Believability Level)

## Operations Dashboard

| Data needed | Plausible source | Refresh | Notes |
|---|---|---|---|
| Backup job outcomes | Acronis backup/task telemetry | Near real-time + daily rollup | Used for posture and alert context |
| Patch compliance | Endpoint + vulnerability scan telemetry | Daily/incremental | Drives risk and trend cards |
| Threat detections | Security/EDR events stream | Near real-time | Used in critical feed |
| Endpoint inventory | Device/agent inventory | Minutes | Supports tenant drill-down |
| Tenant hierarchy | Partner/customer metadata | Daily | Needed for segmentation/filtering |

## Business Dashboard

| Data needed | Plausible source | Refresh | Notes |
|---|---|---|---|
| Tenant MRR and usage | Usage/billing telemetry | Daily | Revenue and at-risk MRR cards |
| Service coverage per tenant | Product enablement + usage state | Daily | Upsell gap detection |
| Ticket/SLA/escalation patterns | PSA connector events | Daily/near RT | Core churn features |
| Client engagement signals | Product usage + QBR activity | Daily | Churn leading indicators |
| Portfolio trend aggregate | Internal analytics aggregate pipeline | Weekly/monthly | Used for directional planning context |

## Minimal Model Sketch

### Core entities
- `tenant` (id, segment, region, tenure, endpoint_count)
- `service_coverage` (tenant_id, service, status)
- `ops_daily_snapshot` (tenant_id, date, backup_success, patch_compliance, threats, open_critical)
- `business_daily_snapshot` (tenant_id, date, mrr, est_cost, margin_pct, churn_score)
- `risk_signal_event` (tenant_id, type, severity, timestamp, description)

### Key assumptions
- Churn score in prototype is a deterministic heuristic from visible signals, not trained ML.
- Estimated cost is modeled from ticket pressure and service footprint.
- Benchmark values are synthetic placeholders based on realistic directional ranges.

### Gaps to close in production
- Reliable PSA integration quality and mapping.
- Consistent cost model calibration across MSPs.
- Governance rules for metric transparency and confidence labeling.
