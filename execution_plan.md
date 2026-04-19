# Acronis Test Task — Execution Plan (Research-Enriched)

## Task Summary

Design two dashboards for the Acronis platform:
1. **Operations Dashboard** — for MSP technicians / NOC teams
2. **Business Growth Dashboard** — for MSP owners / practice leads

6 deliverables total. Quality over speed.

---

## Strategic Context (from Interview + Research)

Key signals from the hiring manager mapped to research-validated insights:

| Signal | Implication | Research-Backed Evidence |
|--------|------------|------------------------|
| "Our dashboards suck. They were good 10 years ago" | Show you understand WHY: siloed per-tenant views, no cross-tenant aggregation, no custom metrics, no trend comparisons | Acronis reports are fixed templates — no custom SQL, no QoQ comparisons, no cross-tenant batch PDF. Executive Summary has no trend data or financial framing. Dashboard layout is shared for ALL users — no role-based presets. |
| "Full BI product, data warehouse Q4, predictive AI" | Data model must be credible: star schema, ClickHouse recommendation, realistic volume estimates | At Acronis scale (20K partners, 750K businesses, ~18.75M endpoints): ~125-150 GB/day raw ingestion, ~50 TB/year. ClickHouse delivers sub-100ms on dashboard queries at this scale. Hybrid lakehouse (raw → star schema → aggregation) is industry standard. |
| "I want to help partners grow with Acronis" | Business dashboard must be THEIR P&L, not Acronis's | MSP avg churn: 12%/year. 69% cite poor service experience. 82% of buyers cancelled B2B contracts due to poor QBRs. QBR prep: 4-8 hours/client without automation, compressible to <1 hour. |
| "Become the centralized reporting system" | Third-party data ingestion is load-bearing | MSPs use 8-25 tools. Only 11% report seamless integration. 15% of tech time wasted on tool-switching. 10% revenue leakage from unbilled work between systems. |
| "Free tier → hook → paid conversion" | Show concrete gating strategy | B2B freemium converts at 2-5%. Usage/volume gating beats feature gating for analytics. Reverse trial (start paid, downgrade) achieves ~25-30%. Best hook: "3 clients at high churn risk — upgrade to see which ones." |
| "Churn prediction, anomaly detection, peer benchmarking, upsells" | These are explicitly requested | Churn predictable 3-6 months ahead. Strongest signals: ticket reopen rate, escalation frequency, SLA falling <80%, QBR attendance dropping. No competitor has native ML-driven client health score. |

---

## Deliverable Structure & Approach

### Deliverable 1: Problem Framing & Personas (15 min)

| Dashboard | Persona | Top Decisions | Research-Validated Pain |
|-----------|---------|---------------|----------------------|
| Operations | Tier 1 NOC Tech (manages 15-50 tenants, 400-500 endpoints) | 1. Where do I triage first? 2. Is posture drifting? 3. What failed overnight? | Without automation, morning triage takes 30-60 min. 65% of incidents resolved at Tier 1. Alert fatigue affects 56% of MSPs daily. Only 11% have seamless tool integration — 89% "swivel-chair" across disconnected dashboards. |
| Business Growth | MSP Owner / Practice Lead (runs P&L for 20-100 clients) | 1. Which clients will churn? 2. Where is my next $10K MRR? 3. Am I efficient vs. peers? | MSP client churn: 12% avg annually. QBR prep: 4-6 hrs/client. 82% of buyers cancelled contracts due to poor QBRs. Best-in-class EBITDA: 19%+, but 18% of MSPs operate at a loss. |

**Format**: 1–2 sentences each, crisp and decision-oriented.

---

### Deliverable 2: PRD-Style Requirements (45 min)

#### Operations Dashboard PRD

**Goals:**
- Reduce mean-time-to-awareness (MTTA) from 30-60 min to <5 min across all managed tenants
- Surface posture drift proactively via 7/30/90-day trend analysis
- Provide one-click drill-down: signal → tenant → endpoint → recommended action
- Deliver AI-generated morning briefing (modeled on PagerDuty's Insights Agent pattern)

**Non-Goals:**
- Replace EDR/XDR investigation workflow (complement, don't replace)
- Full-blown SIEM replacement (no custom query language)
- Billing or commercial data (that's the Business dashboard)
- Third-party RMM data ingestion in V1 (planned for DW phase)

**Primary User Stories (NOC-workflow-aligned):**
1. As a Tier 1 NOC tech, I need a cross-tenant risk heatmap so I can prioritize my morning triage across all managed tenants and dispatch work to Tier 2 with full context
2. As an IT admin, I need 7/30/90-day trend lines for backup success rate, patch compliance, and threat counts to spot posture drift before it causes a P1 incident
3. As a tech, I need an AI-generated morning briefing (top 5 actionable items, priority-ranked with 1-sentence context + recommended action per item) so 30-60 min of manual status checks becomes 2 minutes of targeted triage
4. As a Tier 2 tech, I need per-tenant drill-down showing workload-level status so I can resolve escalated issues without switching to another tool

**Success Metrics:**
- MTTA reduction ≥40% (measured via time-to-first-action on alerts)
- Morning triage time <5 minutes (self-reported survey after 30 days)
- Dashboard DAU/MAU ≥60% (stickiness — trust calibration takes 4-8 weeks per research)
- Reduction in P1 incidents by 15% within 6 months

#### Business Growth Dashboard PRD

**Goals:**
- Enable MSP owners to identify expansion and churn signals without manual analysis
- Provide peer benchmarking against anonymized Acronis partner network data (modeled on Service Leadership Index metrics)
- Surface margin leaks and time drains
- Auto-generate QBR preparation reports per client (killer feature: 4-6 hours → 10 seconds)
- Drive free → premium conversion via blurred-data and count-teaser hooks

**Non-Goals:**
- Replace PSA billing workflow — we inform, not transact
- Provide accounting-grade financial reporting (no auditable P&L)
- Show Acronis's own business metrics — this is the MSP's dashboard

**Primary User Stories:**
1. As an MSP owner, I need a churn-risk score per client so I can intervene 3-6 months before losing revenue
2. As a practice lead, I need to see which clients have protection coverage gaps so I can grow ARPU
3. As an MSP owner, I need margin-per-client visibility so I can identify unprofitable accounts (18% of MSPs operate at a loss — many don't know where the margin leaks are)
4. As a practice lead, I need peer benchmarks (revenue/endpoint $100-500, service gross margin 46-65%, EBITDA 11-19%+, tickets/tech) to set realistic targets against SLI data
5. As an MSP owner, I need a one-click QBR report generator (replaces 4-6 hours of manual prep with sections: executive summary, incidents resolved, security posture, and forward-looking recommendations — 80% forward, 20% backward per retention best practice)
6. As an MSP owner, I need AI-recommended actions ranked by revenue impact

**Success Metrics:**
- ≥20% of MSP owners log in weekly within 3 months
- ≥1 upsell action taken per MSP per month
- Premium tier conversion ≥8% of free tier users within 6 months
- NPS improvement for analytics features ≥+15 points
- Partner retention improvement (directional)

---

### Deliverable 3: Data Sources & Model (30 min)

**Approach**: Data model grounded in actual Acronis Cyber Platform APIs + realistic data warehouse architecture.

#### Operations Dashboard — Data Sources (API-Grounded)

| Data Point | Acronis API | Availability | Refresh | Notes |
|-----------|------------|-------------|---------|-------|
| Backup job status (success/fail/warning) | Task Management API | ✅ Available | Near real-time | Per-tenant, per-endpoint |
| Patch compliance (installed/missing/critical) | Agent telemetry + Vulnerability DB | ✅ Available | Daily scan | 320+ Windows apps, CVSS scoring |
| Threat detections & blocks | Alert Management API + EDR API | ✅ Available | Real-time | Behavioral + signature, MITRE mapping |
| Endpoint inventory (OS, HW, last seen) | Agent Management API | ✅ Available | Heartbeat 5-15 min | Device Sense™ for unmanaged devices |
| M365/GWS backup status | Agentless telemetry (OAuth/API) | ✅ Available | Per-job | No endpoint agent — mailbox/Drive only |
| Alert/incident events | Alert Management API + Event Manager API | ✅ Available | Real-time | Webhook-style subscriptions available |
| Usage per tenant | Usage Reporting API | ✅ Available | Real-time pull + scheduled | `/tenants/{id}/usages` + `/reports` |

#### Business Dashboard — Data Sources

| Data Point | Source | Availability | Notes |
|-----------|--------|-------------|-------|
| Tenant billing / MRR | Usage Reporting API | ✅ Available | Per-tenant × per-service |
| License utilization | Account Management API | ✅ Available | Provisioned vs. consumed |
| Protection coverage gaps | Agent + License cross-join | ⚠️ Derived | Compute gap |
| Ticket volume & SLA | PSA connector (ConnectWise, Autotask) | ⚠️ Partial | Core dependency for churn model |
| Endpoint count trend (growth/contraction) | Usage Reporting API | ✅ Available | Key churn leading indicator |
| Client engagement (login frequency) | Platform telemetry | ✅ Available | Product analytics |
| Peer benchmark data | Anonymized aggregate pipeline | ⚠️ New build | Min 50 MSPs per cohort; legal/privacy required |
| Churn prediction features | ML model | ❌ New build | Requires PSA data as foundation |

#### Data Warehouse Architecture (Q4)

**Recommended: Hybrid Lakehouse with ClickHouse OLAP**

```
Layer 1 (Raw): S3 landing → JSON events, backup telemetry, PSA webhooks
Layer 2 (Serving): Star schema in ClickHouse
  - Facts: fact_backup_jobs, fact_alert_events, fact_tickets, fact_patch_status
  - Dimensions: dim_tenant (partner→customer→unit), dim_endpoint, dim_time, dim_policy
  - Bridge: tenant hierarchy traversal
Layer 3 (Aggregation): Materialized views for dashboard KPIs + ML feature store
```

**Volume at Acronis scale:**
- ~125-150 GB/day raw → compressed to 5-10 TB/year in ClickHouse (5-10x compression)
- ~50 TB/year raw, ~30-50 TB across 3-year retention window
- ClickHouse delivers sub-100ms dashboard queries at 1B+ rows

**Retention: Hot/Warm/Cold**
- Hot (0-90d): NVMe SSD, <100ms — live alerts, backup jobs, patch status
- Warm (90d-1yr): S3 Standard, 1-5s — QBR prep, trend analysis, compliance
- Cold (1-7yr): S3 Glacier, minutes-hours — audit, legal, insurance (SOC2/ISO 27001)

---

### Deliverable 4: Interactive Prototype (no time limit)

**Stack**: Single HTML files with vanilla JS + Chart.js (CDN) + CSS Grid. No build step.

#### Operations Dashboard — NOC Workflow-Aligned Design

```
┌─────────────────────────────────────────────────────────┐
│ 🔒 Acronis Operations Center           [Filters ▾] [⚙] │
├───────────────┬─────────────────────────────────────────┤
│ AI Briefing   │  Risk Heatmap (tenants × severity)      │
│ "5 items need │  [clickable tiles → tenant drill-down]  │
│  attention"   │  Priority-ranked bullet list format     │
│               │  (PagerDuty Insights Agent model)       │
├───────────────┼──────────────────┬──────────────────────┤
│ Posture Score │  Trend Lines     │  Critical Alerts     │
│ (gauge 0-100) │  (7/30/90d)      │  (real-time feed)    │
│ Color gradient│  Backup | Patch  │  [simulated via      │
│ + trend arrow │  Threats         │   setInterval]       │
├───────────────┴──────────────────┴──────────────────────┤
│ Tenant Detail (drill-down panel)                        │
│ Endpoints list → per-workload status + radar chart      │
│ Protection services: backup ✅  EDR ✅  patch ⚠️ M365 ✅│
└─────────────────────────────────────────────────────────┘
```

**Key design decisions (research-backed):**
- Heatmap over alert list: MSP techs already have Kanban boards in PSA — cross-tenant visual is the missing view
- Priority-ranked bullets for AI briefing: practitioners say priority list + 1-sentence context + action is highest-action format (not paragraphs)
- Radar chart for posture breakdown: 5 axes (backup, patch, threats, M365, endpoints) — shows shape at a glance
- Real-time alert simulation: new alerts every 15-30s via setInterval, replicating BigPanda ADR's pre-triaged queue concept

#### Business Growth Dashboard — QBR + Churn Intelligence

```
┌─────────────────────────────────────────────────────────┐
│ 📈 Acronis Business Intelligence        [Period ▾] [⚙] │
├───────────────┬─────────────────────────────────────────┤
│ Revenue       │  Churn Risk Radar                       │
│ Summary       │  [scatter: X=tenure, Y=MRR, size=risk] │
│ MRR, Growth   │  "3 clients at high risk ($12.4K at     │
│ 12mo trend    │   stake)" — click for risk signals      │
├───────────────┼──────────────────┬──────────────────────┤
│ Upsell Opps   │  Margin Analysis │  Peer Benchmarks     │
│ [service ×    │  [revenue vs.    │  [Your vs. Median    │
│  coverage     │   estimated cost │   vs. Top Quartile]  │
│  matrix]      │   per client]    │  SLI-aligned metrics │
├───────────────┴──────────────────┴──────────────────────┤
│ Client Detail (drill-down) + QBR Report Generator       │
│ Risk signals timeline, services map, AI actions         │
│ "Generate QBR Report" → modal with full preview         │
└─────────────────────────────────────────────────────────┘
```

**Key design decisions (research-backed):**
- Peer benchmarks aligned with Service Leadership Index metrics: EBITDA %, service gross margin %, revenue/endpoint, tickets/tech
- QBR report structure: 80% forward-looking, 20% backward-looking (retention best practice from Clientshare research)
- Churn signals from validated research: ticket reopen rate, escalation frequency, SLA <80%, after-hours support spikes, QBR attendance, billing disputes
- Premium gating via count-teaser: "3 clients at high churn risk — upgrade to see which ones" (highest-converting hook per Amplitude research)

#### Client 360 Page

- Full deep-dive per client: event timeline, services matrix, posture radar, QBR generator, AI actions
- Accessed from either dashboard's drill-down

---

### Deliverable 5: AI Workflow Note (15 min)

**3 specific prompt engineering examples with research-validated overrides:**

1. **Churn feature research** → Discarded "NPS score trend" (MSPs don't survey frequently enough). Replaced with validated signals: ticket reopen rate, escalation frequency, SLA <80%, QBR attendance drop.

2. **Dashboard layout** → AI suggested data table sorted by priority. Overrode: tables optimize for scanning known items; heatmaps optimize for pattern recognition across a portfolio. The primary question is "which client is worst?" not "what's the next ticket?"

3. **Fake data generation** → AI generated unrealistic uniform distributions. Fixed: power-law distribution (3 large, 5 mid, 12 small clients). Added validated correlation: new high-MRR clients have higher churn risk (haven't developed loyalty).

**"What I Discarded" log with reasoning:**
- Chatbot on dashboard → premature complexity, Acronis already shipped AI Assistant late 2024
- Traffic light health system → too reductive; 0-100 score preserves nuance for sorting
- Financial forecasting in V1 → requires 12+ months of historical data
- Gamification leaderboards → culturally inappropriate for many MSPs, creates wrong incentives

---

### Deliverable 6: Assumptions, Risks & Validation (15 min)

**Assumptions (research-grounded):**
1. Acronis API provides real-time backup, patch, and threat telemetry per tenant — confirmed via developer.acronis.com
2. PSA connectors (ConnectWise, Autotask) can provide ticket/SLA data — existing Acronis integrations confirm this
3. MSP owners are willing to log into Acronis for business insights — shift from ops-only to business analytics requires new mental model + proactive push
4. Anonymized peer benchmarking is feasible — IT Nation Evolve uses SLI data with 50+ cohort minimums; privacy barriers include competitive paranoia, accounting inconsistency, and vendor trust

**Top Risks with mitigations:**

| Risk | Evidence | Mitigation |
|------|----------|-----------|
| Peer benchmarking privacy blockers | Competitive paranoia among local MSPs; vendor lock-in fear; data quality anxiety | Opt-in model. Min 50 per cohort. Segment by region/size. Engage legal Q3, not Q4. Position as SLI-equivalent value. |
| Churn model cold start | ML models need 90+ days of incident data for reliable noise reduction (BigPanda/PagerDuty experience) | Show "building your profile" state. Start with rules-based heuristics. Fall back to simpler signals (no login in 30d = medium risk). |
| PSA data integration gap | Only 11% of MSPs report seamless integration; PSA data is core dependency for margin + churn | Graceful degradation: "Connect PSA for full insights." Core features (MRR, coverage gaps) work without PSA. PSA-dependent features = premium tier only. |
| Adoption resistance | Trust calibration takes 4-8 weeks. If AI briefing has too much noise, teams stop reading in 2 weeks. | Slack/Teams push delivery (outperforms email). Weekly email digest with "money left on the table" hook. Surface one "aha moment" insight early. |

**First 3 things to validate with MSPs:**
1. **Heatmap vs. list view**: Show both to 5 Tier 1 techs. Observe which they use to answer "which client do you check first?" faster.
2. **Churn signal accuracy**: Interview 10 MSP owners who lost clients. Reconstruct what changed in the months before churn. Compare against our model inputs.
3. **Benchmarking opt-in willingness**: Survey 50 MSP owners. Show mockup. Ask: (a) Would you share anonymized data? (b) What's the minimum cohort size you'd trust? (c) What metrics justify sharing?

---

## Timeline (Quality Over Speed)

| Phase | Duration | Activity |
|-------|----------|----------|
| 1 | 30 min | Problem framing & personas + alternatives considered |
| 2 | 1 hour | PRD sections (both dashboards + QBR killer feature) |
| 3 | 45 min | Data sources & model (API-grounded + DW architecture) |
| 4 | 3-4 hours | Interactive prototypes (3 HTML pages: Ops + Biz + Client 360) |
| 5 | 30 min | AI workflow note (with 3 specific prompt examples) |
| 6 | 30 min | Assumptions, risks, validation |
| 7 | 30 min | Final polish, README, QA |

---

## Competitive Whitespace (from Research)

**The gap ALL 5 competitors share**: None offers a native, ML-driven client health score integrating backup telemetry + ticket patterns + billing signals + communication sentiment into a single churn risk output.

| Platform | Cross-Tenant | AI/ML | Peer Benchmarking | Biggest Gap |
|----------|-------------|-------|-------------------|-------------|
| ConnectWise BrightGauge | ✅ | ❌ | ❌ | Stagnant feature velocity ("only added 2 datasources since 2019") |
| Kaseya IT Complete | ✅ | ⚠️ Emerging | ✅ (via reports) | UX complexity, lock-in, support decline |
| NinjaOne | ✅ | ❌ | ❌ | Shallow business KPIs, weak reporting |
| Autotask/Datto | ✅ | ❌ | ✅ (partial) | Complex custom reporting |
| MSPbots.ai | ✅ | ✅ | ⚠️ Internal only | $990/mo price barrier for small MSPs |

**→ Acronis's opportunity**: Only vendor that sits on backup + security + endpoint + cloud workload data in one platform. Build the intelligence layer competitors can't replicate.

---

## Evaluation Criteria Alignment

| Criterion | Score Target | Key Evidence |
|-----------|------------|-------------|
| **Product thinking** (93%) | Alternatives considered, phase-gated rollout, free/premium economics validated (2-5% freemium baseline, $2-5/tenant pricing, <1% break-even), blurred-data conversion hooks from Amplitude research |
| **Domain fit** (93%) | NOC tier workflow (Tier 1/2/3 morning routine mapped), QBR killer feature (4-6 hrs → 10 sec, retention-validated), correct terminology (tenants, workloads, CyberApps), SLI benchmark ranges embedded, specific competitor gaps cited |
| **Data literacy** (93%) | Grounded in 9 named Acronis APIs, ClickHouse recommendation with volume estimates (125-150 GB/day), star schema fact/dimension model, hot/warm/cold retention, churn model with feature categories from research |
| **Prototype quality** (91%) | 3 HTML pages, micro-animations, real-time simulation, radar chart, QBR generator modal, priority-ranked AI briefing (PagerDuty-inspired), collapsible sidebar nav |
| **AI fluency** (93%) | 3 specific prompt engineering examples with research-validated overrides, discarded suggestions log with reasoning, judgment-over-automation framing |
| **Communication** (93%) | 30-second summaries, structured for mixed audience (eng + design + GTM), research citations where they strengthen the point, no filler |
