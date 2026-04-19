# PRD: Acronis Intelligence Dashboards for MSPs (v2 — Research-Enriched)

> **Purpose**: Complete Product Requirements Document for two Acronis dashboards + Client 360 page. Self-contained — another AI model can generate all prototype deliverables from this single document. All quantitative claims are backed by Perplexity Deep Research (12 queries, 100+ sources, April 2026).

---

## 1. Context & Background

### Company
Acronis is a global cyber protection company (Swiss-founded, 1800+ employees, 20,000+ service providers, 750,000+ businesses protected). The core product is **Acronis Cyber Protect Cloud** — the only MSP platform that natively unifies backup/DR, EDR/XDR, RMM, endpoint security, and M365/GWS protection from a single agent and console. In Canalys 2025 leadership matrices, Acronis was the only vendor to appear in all three categories (BDR, Cybersecurity, MSP Platform).

### Problem
Acronis's current dashboards and reporting are operationally useful but not intelligence-grade. Validated gaps:

| Gap | Evidence |
|-----|----------|
| **Per-tenant isolation** — no cross-client aggregate view | MSP partners with 50+ clients must generate and download reports per tenant, then manually aggregate. "This is the one feature that would save me hours per month." (Acronis community forums) |
| **No business-level analytics** | Reporting covers backup/security status but has no MRR, margin, churn, or peer benchmark layer. Reports are snapshots, not trends — no QoQ or YoY comparisons natively. |
| **No AI-driven insights** | The 2024 AI Natural Language Query is the only native analytics investment. No anomaly detection, no churn prediction, no recommended actions. |
| **No third-party data ingestion** | Only 11% of MSPs report seamless tool integration. MSPs average 8-25 tools. Acronis strategy = invest in SIEM/integration APIs but still lacks native BI. |
| **Reports not QBR-grade** | Executive Summary report launched 2021 — no trend data, no financial framing, no recommended actions, not client-type aware. Same template for healthcare and retail. |
| **Dashboard is shared for all users** | Layout changes by one admin affect all users. No role-based presets for NOC tech vs. management. |

### Strategic Intent
Acronis plans to release a new generation of BI dashboards:
- **Q3 2025**: MVP — modernized reports replacing the old engine
- **Q4 2025**: Data warehouse / data lake + predictive AI capabilities
- **Goal 1**: Direct revenue from a premium analytics tier (free → paid conversion)
- **Goal 2**: Intelligence on partner behavior to improve retention and displace competitor tools
- **Goal 3**: Become the centralized reporting system for MSPs across all their tools — the "contextual aggregation layer" that no vendor has achieved

### Competitive Whitespace
The consistent gap across all five major competitor platforms (ConnectWise BrightGauge, Kaseya IT Complete, NinjaOne, Autotask/Datto, MSPbots.ai) is **true predictive analytics** — none offers a native, ML-driven client health score integrating backup telemetry + ticket patterns + billing signals + communication sentiment into a single churn risk output. This is the whitespace.

| Platform | AI/ML | Peer Benchmarks | Biggest Weakness |
|----------|-------|-----------------|-----------------|
| ConnectWise BrightGauge | ❌ None | ❌ None | Feature stagnation since 2019 ("only added 2 datasources in 5 years") |
| Kaseya IT Complete | ⚠️ Emerging | ✅ Annual reports | UX complexity from 40+ acquisitions, lock-in pricing |
| NinjaOne | ❌ None | ❌ None | Reporting is #1 user complaint; weak business KPIs |
| MSPbots.ai | ✅ Sentiment Max (ticket NLP) | ⚠️ Internal only | $990/month — prohibitive for small MSPs |
| **Acronis (proposed)** | ✅ Churn + anomaly + briefings | ✅ SLI-aligned | Needs this product to be built |

### Audience for This Task
Deliverables reviewed by: an engineering lead, a designer, and a GTM partner in a 30-minute session.

---

## 2. Problem Framing & Personas

### Dashboard A: Operations Dashboard

**Persona**: Sarah, Tier 1 NOC Technician
- Manages 15 tenants, ~400 endpoints (typical Tier 1 load: 400-500 endpoints) across Windows, macOS, and Microsoft 365
- Works the 6am-2pm shift (heaviest burden — overlaps with client business hours)
- Starts her day by checking overnight backup failures, reviewing alerts, and triaging issues
- Currently "swivel-chairs" across Acronis console, ConnectWise Manage (PSA), and backup dashboards — each tool shows a different slice of the same event
- **Morning triage takes 30-60 minutes** before first remediation action (industry benchmark for MSPs without mature automation)
- 56% of MSPs experience alert fatigue daily or weekly; 1 in 4 alerts is a false positive

**Top Decisions This Dashboard Enables:**
1. **Where do I triage first?** — Cross-tenant risk heatmap reveals which client environments need immediate attention. Replaces 15 individual tenant checks.
2. **Is security posture drifting?** — 7/30/90-day trends show if backup success rates, patch compliance, or threat counts are degrading before a P1 incident.
3. **What happened overnight?** — AI-generated morning briefing (modeled on PagerDuty's Insights Agent) surfaces top 5 items with recommended actions. Priority-ranked bullet format — the highest-action format for operational briefings.

**Why It Matters**: Without cross-tenant operational intelligence, technicians spend the first hour of every shift manually polling. 89% of MSPs lack seamless integration across their stack. Critical signals get buried in alert noise. Knowledge lives in senior techs' heads — when they leave, resolution times spike.

---

### Dashboard B: Business Growth Dashboard

**Persona**: Mike, MSP Owner / Practice Lead
- Runs an MSP with 45 clients, 8 technicians, ~$150K MRR
- Gross margin target: 50-60% (current SLI industry average: 46.2% for managed services)
- EBITDA target: 15-20% (best-in-class: 19%+ for 5 consecutive years, but 18% of MSPs still operate at a loss)
- Discovers churn when the cancellation email arrives — by then the decision was made 3-6 months earlier
- Prepares QBR reports manually: 4-6 hours per client per quarter (stitching screenshots from PSA, RMM, and backup consoles into slide decks)
- **82% of B2B buyers have cancelled contracts due to poor-quality or infrequent QBRs** (Clientshare 2024 research)

**Top Decisions This Dashboard Enables:**
1. **Which clients are about to churn?** — AI-powered churn risk scoring. Strongest validated predictors: ticket reopen rate increasing, escalation frequency rising, SLA compliance falling below 80%, after-hours support spike, QBR attendance declining, billing disputes.
2. **Where is my next $10K MRR?** — Upsell opportunities surface clients with protection gaps (no M365 backup, no EDR). Services × coverage matrix.
3. **Am I efficient compared to peers?** — Anonymized benchmarks aligned with Service Leadership Index metrics: EBITDA %, service gross margin %, revenue per endpoint ($100-500 ARPU range), tickets/tech.

**Why It Matters**: MSP client churn averages 12% annually — 69% cite poor service experience, 59% cite incomplete solution. MSP owners flying blind on business health. They know if a server is down, but not if a client relationship is eroding. This dashboard transforms Acronis from a security tool into a business growth platform.

---

## 2.5. Alternatives Considered

| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| A. Improve existing dashboards incrementally | Low risk, no new infra | Old engine (10yr), can't support AI, reports are fixed templates with no custom metrics, no cross-tenant batch output | ❌ Rejected — "our dashboards suck" (direct quote) |
| B. Build one unified dashboard for both personas | Simpler to ship | Technician and owner have fundamentally different decisions, mental models, and time horizons. NOC works in real-time; owner works quarterly. | ❌ Rejected — cognitive overload |
| C. **Two purpose-built dashboards with shared data layer** | Clear persona focus, reusable data infra (star schema → ClickHouse), phased delivery | Higher initial scope | ✅ Selected — aligns with Q3 (ops) → Q4 (business + DW) timeline |
| D. Embed analytics into existing Acronis console tabs | No new navigation | Existing console is per-tenant; dashboard layout is shared for ALL users (no role-based presets). Limits layout freedom. | ❌ Rejected — cross-tenant is the breakthrough |
| E. Build a "contextual aggregation layer" that sits on top of all MSP tools | Maximum value — the "single pane of glass" | No vendor has succeeded at this; MSP community structurally resistant to single-vendor dependency | ❌ Too ambitious for V1 — but long-term vision for Phase 3+ |

## 2.6. Phase-Gated Rollout

```
Phase 1 (Q3): Operations Dashboard MVP
  → Heatmap, trend lines, alerts feed
  → EAP: 5-10 MSP partners
  → Validate: heatmap vs. list preference, morning triage time reduction

Phase 2 (Q3+): Operations Dashboard GA
  → AI briefing (priority-ranked bullets + recommended actions), posture score
  → All partners (free tier)
  → Measure: DAU/MAU ≥60%, MTTA reduction ≥40%

Phase 3 (Q4): Business Dashboard Beta
  → MRR trends, coverage gaps, upsell table, QBR report generator
  → EAP: 10-15 business-oriented MSPs
  → Validate: churn signals accuracy, benchmarking opt-in willingness, QBR time savings

Phase 4 (Q4+): Business Dashboard GA + Premium
  → Churn prediction ML, peer benchmarks (SLI-aligned), margin analysis
  → Premium tier launch with volume + feature + data-depth gating
  → Measure: conversion ≥8%, upsell action ≥1/MSP/month
```

---

## 3. Requirements (PRD-Style)

### Dashboard A: Operations Dashboard

#### Goals
1. Reduce mean-time-to-awareness (MTTA) from 30-60 min to <5 min across all managed tenants
2. Surface posture drift and risk trends proactively via 7/30/90-day trend analysis
3. Provide one-click drill-down: signal → tenant → workload → recommended action
4. Deliver AI-generated daily briefing personalized to the technician's tenant portfolio (priority-ranked bullet format, modeled on PagerDuty Insights Agent)

#### Non-Goals
- Replace existing EDR/XDR investigation workflow (we complement, not replace)
- Build a full SIEM — no custom query language or raw log search
- Show billing, commercial, or revenue data (that's the Business dashboard)
- Support third-party RMM data ingestion in V1 (planned for data warehouse phase)

#### User Stories

| ID | Story | Priority | Acceptance Criteria |
|----|-------|----------|-------------------|
| OPS-1 | As a Tier 1 NOC tech, I need a cross-tenant risk heatmap so I can instantly see which clients need attention and dispatch to Tier 2 with full context | P0 | Heatmap shows all tenants color-coded by composite risk score (backup + patch + threats + posture). Click → tenant detail. Hover → tooltip with risk breakdown. |
| OPS-2 | As an IT admin, I need 7/30/90-day trend lines for backup success, patch compliance, and threat events so I can spot posture drift before incidents | P0 | Three toggleable time ranges. Sparklines per metric. Anomaly markers on deviations (orange dots). Responsive to filters. |
| OPS-3 | As a tech, I need an AI morning briefing (top 5 actionable items) so I don't miss critical signals across all my tenants | P0 | Briefing auto-generates. Each item: severity badge + tenant name + issue summary + recommended action (expandable). Priority-ranked bullets, not paragraphs. |
| OPS-4 | As a tech, I need to filter by severity, service type, and tenant group so I can focus on what matters now | P1 | Filters apply globally across all widgets. State persists in URL. |
| OPS-5 | As a tech, I need a real-time critical alerts feed so I can see new incidents as they arrive | P1 | Simulated WebSocket feed. New alerts animate in (every 15-30s). Click → expand with details. |
| OPS-6 | As a Tier 2 tech, I need a per-tenant drill-down showing workload-level status including a posture radar chart (5 axes) so I can resolve escalated issues without switching tools | P1 | Drill-down panel: tenant name, overall score, breakdown by category, radar chart (backup/patch/threats/M365/endpoints), endpoints table, service status, "View in Acronis Console" link |

#### Success Metrics
- MTTA reduction ≥40% (measured via time-to-first-action on alerts)
- Morning triage time <5 minutes (self-reported survey after 30 days)
- Dashboard DAU/MAU ≥60% (trust calibration takes 4-8 weeks)
- Reduction in P1 incidents by 15% within 6 months

---

### Dashboard B: Business Growth Dashboard

#### Goals
- Enable MSP owners to identify expansion and churn signals 3-6 months before impact
- Provide peer benchmarking aligned with Service Leadership Index metrics
- Surface margin leaks (18% of MSPs operate at a loss; many don't know where)
- Auto-generate QBR preparation reports (4-6 hours → 10 seconds; 80% forward-looking, 20% backward-looking)
- Drive upsell by identifying clients with incomplete protection coverage
- Support free → premium tier conversion via blurred-data hooks

#### Non-Goals
- Replace PSA billing workflow — we inform, not transact
- Provide accounting-grade financial reporting (no auditable P&L)
- Show Acronis's own business metrics — this is the MSP's dashboard
- Real-time operational alerts (that's the Ops dashboard)

#### User Stories

| ID | Story | Priority | Acceptance Criteria |
|----|-------|----------|-------------------|
| BIZ-1 | As an MSP owner, I need a churn-risk score per client so I can intervene before losing revenue | P0 | Each client: risk score (Low/Medium/High/Critical). Click → contributing signals (ticket reopen rate, SLA misses <80%, escalation frequency, QBR attendance, billing disputes). Sorted by revenue impact. |
| BIZ-2 | As a practice lead, I need to see which clients have protection coverage gaps so I can grow ARPU | P0 | Matrix: client × services (Backup, EDR, M365, Patch, DLP). Empty cells = upsell opportunities. "Suggest to Client" CTA with estimated MRR impact. |
| BIZ-3 | As an MSP owner, I need margin-per-client visibility so I can identify unprofitable accounts | P0 | Revenue vs. estimated cost per client. Cost = ticket volume × estimated cost/ticket + license cost. Horizontal bar chart. Negative margin clients highlighted red. |
| BIZ-4 | As a practice lead, I need peer benchmarks to set realistic growth targets | P1 | Your MSP vs. Network Median vs. Top Quartile. SLI-aligned metrics: EBITDA % (avg 11.1%, best 19%+), service gross margin (avg 46.2%), revenue/endpoint ($100-500 ARPU), tickets/tech/month. |
| BIZ-5 | As an MSP owner, I need a one-click QBR report generator per client | P1 | Exportable report with sections: Executive Summary (top wins, risks, key action), Incidents Resolved, Security Posture, Recommendations, Next 90 Days. 80% forward-looking. AI-generated summary. |
| BIZ-6 | As a practice lead, I need MRR waterfall (new, expansion, contraction, churn) to understand revenue dynamics | P1 | Line chart: MRR over 12 months. Growth rate annotation. Forecast dotted line. |
| BIZ-7 | As an MSP owner, I need AI-recommended actions ranked by revenue impact | P1 | Action cards: client, opportunity, estimated MRR impact, "Take Action" CTA. Example: "Client X has no M365 backup — potential $500/mo upsell." |

#### Free vs. Premium Tier & Economics

**Pricing rationale**: Average MSP Acronis spend ~$3-5/endpoint/month. Premium analytics at $2-5/tenant/month is <5% of existing spend — minimal friction. Break-even on infrastructure (~$25K/month for ClickHouse cluster + ML): need ~5K tenants on premium (<1% of 750K+ businesses).

**Conversion strategy (research-validated)**:
- B2B freemium baseline: 2-5% conversion rate
- Volume gating converts best for analytics (users outgrow, not just miss features)
- Highest-converting hook: show the number but not the content — "3 clients at high churn risk ($12,400 MRR at stake) — upgrade to see which ones"
- Reverse trial option for high-value partners: start on premium, downgrade after 30 days (~25-30% conversion rate)

| Feature | Free | Premium |
|---------|------|---------|
| MRR trend & summary | ✅ | ✅ |
| Basic protection coverage matrix | ✅ | ✅ |
| Churn risk scores | Top 3 only (blurred rest) | ✅ All clients |
| AI recommendations | 1/week | ✅ Unlimited |
| Peer benchmarking | ❌ Teaser: "Your peers average 46.2% margin — upgrade to compare" | ✅ Full SLI-aligned metrics |
| Margin analysis | ❌ | ✅ |
| QBR report generator | Basic (last 30 days, no AI summary) | ✅ Full with AI summary + 12-month trends |
| Historical data depth | 30 days | 12+ months |
| Custom reports & exports | ❌ | ✅ |

#### Success Metrics
- **Weekly login rate ≥20% of MSP owners** within 3 months
- **≥1 upsell action per MSP per month** (tracked via "Take Action" CTA clicks)
- **Premium tier conversion ≥8%** of free tier users within 6 months
- **NPS improvement ≥+15 points** for analytics features
- **Partner retention uplift** (directional)

---

## 4. Data Sources & Model

### Operations Dashboard — Data Architecture (API-Grounded)

```
┌─────────────────────────────────────────────────────────────┐
│              Acronis Cyber Platform APIs                       │
├───────────┬──────────┬──────────┬──────────┬────────────────┤
│ Task Mgmt │ Agent    │ Alert    │ EDR      │ Usage          │
│ API       │ Mgmt API │ Mgmt API │ API      │ Reporting API  │
│ (backup   │ (endpoint│ (threat  │ (XDR     │ (consumption   │
│  jobs)    │  health) │  events) │  hunting)│  per tenant)   │
└────┬──────┴────┬─────┴────┬─────┴────┬─────┴────┬──────────┘
     │           │          │          │          │
     ▼           ▼          ▼          ▼          ▼
┌─────────────────────────────────────────────────────────────┐
│           Data Aggregation Layer (ETL → ClickHouse)           │
│  • Per-tenant rollups (hourly/daily)                         │
│  • Composite risk score calculation                          │
│  • Anomaly detection pipeline                                │
│  • AI briefing generation (priority-ranked bullets)          │
│  • Hot: 0-90d NVMe SSD | Warm: 90d-1yr S3 | Cold: 1-7yr    │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              Dashboard API (REST + Simulated WebSocket)       │
│  • /tenants/risk-scores                                      │
│  • /tenants/{id}/detail                                      │
│  • /trends?metric=backup&range=30d                           │
│  • /alerts/stream (simulated via setInterval)                │
│  • /briefing/today                                           │
└─────────────────────────────────────────────────────────────┘
```

**Data Points (mapped to actual Acronis APIs):**

| Data Point | Acronis API | Availability | Refresh Rate | Notes |
|-----------|------------|-------------|-------------|-------|
| Backup job status (success/fail/partial) | Task Management API | ✅ Available | Near real-time | Per-tenant, per-workload |
| Patch compliance (installed/missing/critical) | Agent telemetry | ✅ Available | Daily scan | 320+ Windows apps, CVSS severity scoring |
| Threat detections & blocks | Alert Management API + EDR API | ✅ Available | Real-time | Behavioral + signature, MITRE ATT&CK mapping |
| Endpoint inventory (OS, HW, last seen) | Agent Management API | ✅ Available | Heartbeat (5-15 min) | Device Sense™ for unmanaged device discovery |
| M365/GWS backup status | Agentless telemetry (OAuth) | ✅ Available | Per-job | No endpoint agent — mailbox/Drive level |
| Alert & incident events | Alert Management API + Event Manager API | ✅ Available | Real-time | Webhook-style event subscriptions |
| Usage per tenant | Usage Reporting API | ✅ Available | Real-time + scheduled | `GET /tenants/{id}/usages` + `POST /reports` |

**Composite Risk Score Formula** (per tenant):
```
risk_score = (
    w_backup × (1 - backup_success_rate_7d) +
    w_patch  × (critical_patches_missing / total_endpoints) +
    w_threat × normalized_threat_count_7d +
    w_posture × (1 - posture_compliance_rate)
) × 100

Weights: w_backup=0.30, w_patch=0.25, w_threat=0.30, w_posture=0.15
```

---

### Business Growth Dashboard — Data Architecture

```
┌────────────────────────────────┐   ┌────────────────────────────┐
│   Acronis Internal APIs         │   │   External Connectors       │
├────────────────────────────────┤   ├────────────────────────────┤
│ • Usage Reporting API (MRR)    │   │ • PSA (ConnectWise Manage, │
│ • Account Mgmt API (licenses)  │   │   Autotask, HaloPSA):     │
│ • Agent Mgmt API (coverage)    │   │   tickets, time entries,   │
│ • Product telemetry (logins)   │   │   SLAs, contacts           │
│ • Event Manager API (activity) │   │ • Billing (Xero, QB) —     │
│                                │   │   future: invoice/disputes │
└────────────┬───────────────────┘   └────────────┬──────────────┘
             │                                    │
             ▼                                    ▼
┌─────────────────────────────────────────────────────────────┐
│        Data Warehouse (Q4 — ClickHouse Serving Layer)        │
│                                                              │
│  Star Schema:                                                │
│  Facts: fact_backup_jobs, fact_alert_events, fact_tickets,   │
│         fact_patch_status, fact_m365_backup_runs              │
│  Dims:  dim_tenant (partner→customer→unit hierarchy),        │
│         dim_endpoint, dim_user, dim_time, dim_policy         │
│  Bridge: tenant_hierarchy (recursive traversal)              │
│                                                              │
│  Pre-aggregated: partner_summary (materialized view)         │
│  ML Layer: client_health_score, churn_risk_index (weekly)    │
│  Anonymized: peer_cohort_benchmarks (min 50 per segment)     │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              Business Intelligence API                       │
│  • /clients/churn-risk                                       │
│  • /clients/{id}/signals                                     │
│  • /coverage/gaps                                            │
│  • /benchmarks/peer-comparison                               │
│  • /revenue/mrr-trend                                        │
│  • /recommendations                                          │
│  • /qbr/{client_id}/generate                                 │
└─────────────────────────────────────────────────────────────┘
```

**Churn Prediction Model — Input Features (Research-Validated):**

| Feature | Type | Source | Evidence |
|---------|------|--------|----------|
| Ticket reopen rate trend (30d) | Numeric | PSA connector | "Increasing ticket reopen rate signals unresolved root causes and eroding trust" — strongest operational predictor |
| Escalation frequency rising (Tier 1→2→3) | Numeric | PSA connector | More Tier 2/3 escalations beyond baseline = systemic service failures |
| SLA compliance rate | Numeric | PSA connector | Industry treats 80% as minimum healthy threshold; drift below = churn precursor |
| After-hours support usage spike | Numeric | PSA connector | Usage outside normal pattern = rising urgency and frustration |
| QBR attendance (decision-maker level) | Categorical | CRM/Calendar | Client sends lower-level staff or skips = decision-maker disengagement |
| Endpoint count trend (growth/contraction) | Numeric | Usage Reporting API ✅ | Contraction = client reducing scope before formal cancellation |
| Backup failure rate trend | Numeric | Task Management API ✅ | Degrading protection signals undetected service quality issues |
| Product usage drop (login frequency) | Numeric | Platform telemetry ✅ | Declining engagement = adoption stalling |
| Billing disputes or late payments | Boolean | Billing system | Correlates with perceived value erosion, not cash flow |
| Protection coverage % | Numeric | Agent + License APIs ✅ | Under-protected clients receive less value, churn higher |
| Champion reassignment | Boolean | CRM | When internal advocate moves roles, churn risk spikes significantly |

**Churn prediction timeline**: Behavioral signals become significant 3-6 months before cancellation. Practical MSP warning window: 4-6 months before renewal date.

**Gaps & Assumptions:**
1. **PSA connector maturity** — ticket and SLA data requires robust ConnectWise/Autotask integration. If not connected, margin and churn features degrade gracefully ("Connect PSA for full insights" CTA). PSA data is the foundation for the churn model — backup telemetry alone provides health signals but not relationship/operational signals.
2. **Peer benchmarking** — requires legal/privacy review. Minimum cohort of 50 MSPs per segment. Privacy barriers: competitive paranoia, accounting inconsistency, vendor trust, aggregation risk in small groups. Model on IT Nation Evolve's SLI approach with standardized accounting definitions.
3. **Churn model cold start** — new partners need ≥90 days of data (ML models need this for reliable noise reduction). Show "building your profile" state. Fall back to rules-based heuristics (no login in 30d = medium risk).
4. **Cost estimation** — margin per client is an approximation unless MSP connects PSA with time tracking. QBR prep time savings (4-6 hours → 10 seconds) is the strongest hook.

---

## 5. Interactive Prototype Specification

### General Design System

**Visual Language:**
- Follows Acronis brand guidelines (dark theme primary, blue/teal accents)
- Background: `#0D1117` (dark) with `#161B22` card surfaces
- Primary accent: `#00B4D8` (Acronis teal)
- Risk colors: Critical `#FF4757`, High `#FF6B35`, Medium `#FFA502`, Low `#2ED573`, Good `#00B894`
- Typography: Inter (main), monospace for data values
- Cards with subtle `border: 1px solid rgba(255,255,255,0.08)` and `border-radius: 12px`
- Subtle glassmorphism: `backdrop-filter: blur(10px)` on overlays

**Layout:**
- CSS Grid-based, responsive (desktop-first, 1280px+)
- Collapsible sidebar navigation (icons + labels)
- Top bar with global filters + user context
- Main content area with widget grid
- Navigation between Ops, Business, and Client 360

### Operations Dashboard — Prototype Spec

**Page: Main View**

1. **Top Bar**: Acronis logo, "Operations Center" title, tenant group filter dropdown, time range toggle (7d/30d/90d), settings gear
2. **AI Briefing Card** (left column, top):
   - Header: "🤖 Morning Briefing — April 19, 2026"
   - 5 items in priority-ranked bullet format (highest-action format per research)
   - Each item: severity badge (🔴🟠🟡) + tenant name + issue summary
   - Expandable → shows recommended action + confidence level
   - "Powered by Acronis AI" badge
   - Design inspired by PagerDuty's Insights Agent output
3. **Risk Heatmap** (main area, top):
   - Grid of tenant tiles (3-4 columns × N rows)
   - Each tile: tenant name, endpoint count, workload count, color-coded by composite risk score
   - Hover: tooltip showing risk breakdown (backup %, patch %, threats, posture)
   - Click: scrolls to and populates Tenant Detail panel below
   - Critical tiles pulse subtly (CSS animation)
4. **Posture Score Gauge** (left column, middle):
   - Donut/gauge chart showing aggregate posture score (0-100)
   - Color gradient from red → green
   - Trend arrow (↑ +3 vs. last period)
5. **Trend Lines** (center, middle):
   - Three sparkline charts stacked: Backup Success %, Patch Compliance %, Threat Count
   - Responsive to time range filter
   - Visual anomaly markers (orange dots on significant deviations)
   - Smooth data transition animation on filter change
6. **Critical Alerts Feed** (right column, middle):
   - Scrollable list of recent alerts
   - Each: timestamp, severity badge, tenant, event summary
   - New alerts animate in every 15-30 seconds via `setInterval` (simulating real-time)
   - Alert count badge increments
   - Click → expand with details
7. **Tenant Detail Panel** (bottom, full width, slide-down animation):
   - Appears on tenant tile click
   - Shows: tenant name, overall score, breakdown by category
   - **Posture Radar Chart**: 5 axes (backup, patch, threats, M365, endpoints) — current vs. 30 days ago overlay
   - Endpoints/workloads table: hostname, OS, last seen, status indicators per service
   - Protection services status: backup ✅, EDR ✅, patch ⚠️, M365 ✅
   - "View in Acronis Console" link (stubbed)

**Fake Data**: Generate 12 realistic tenant names with varied risk profiles:
- 2 Critical (red): "Northwind Financial" (backup failures + missing patches), "Summit Healthcare" (SLA breach + threat surge)
- 3 High (orange): "Metro Law Partners", "Alpine Medical Group", "Cascade Manufacturing"
- 4 Medium (yellow): varied issues
- 3 Low/Good (green): healthy environments
- 5-15 endpoints each, realistic workload counts

### Business Growth Dashboard — Prototype Spec

**Page: Main View**

1. **Top Bar**: Acronis logo, "Business Intelligence" title, period selector (This Month / Quarter / Year), premium badge indicator
2. **Revenue Summary Card** (left column, top):
   - Current MRR: "$147,250"
   - Growth: "+3.2% vs. last month" with green arrow
   - 12-month MRR trend line (Chart.js line chart)
   - Forecast dotted line extending 3 months
   - Annotation: quarterly growth rate
3. **Churn Risk Radar** (main area, top):
   - Scatter plot: X = months as client, Y = MRR contribution, dot size = risk level
   - Color: risk score (green → red gradient)
   - Click on dot → populates Client Detail panel
   - Header: "3 clients at high risk ($12,400 MRR at stake)"
   - **Premium gate example**: for free tier, show "3 clients at high churn risk — upgrade to see which ones" with blurred dots
4. **Upsell Opportunities Table** (left column, middle):
   - Table: Client, Current Services (icon badges), Missing Services, Est. MRR Impact
   - Sorted by MRR impact descending
   - "Suggest to Client" CTA button per row (confirmation toast on click)
   - Badge: "7 opportunities worth $8,200/mo"
5. **Margin Analysis** (center, middle):
   - Horizontal bar chart: clients sorted by margin %
   - Revenue bar (blue) vs. estimated cost bar (gray)
   - Negative margin clients highlighted in red
   - Tooltip: breakdown of cost components (license + estimated labor)
   - 🔒 Premium badge
6. **Peer Benchmark Panel** (right column, middle):
   - Grouped bar chart: Your MSP vs. Network Median vs. Top Quartile
   - Metrics (SLI-aligned): Service Gross Margin (you: 52% | median: 46.2% | top: 65%), EBITDA (you: 14% | median: 11.1% | top: 19%+), Revenue/Endpoint, Tickets/Tech/Month
   - Your values highlighted with accent color
   - 🔒 Premium badge with teaser: "Your peers average 46.2% service margin — upgrade to see full comparison"
7. **Client Detail Panel** (bottom, full width, slide-down):
   - Appears on client click (from churn radar or upsell table)
   - Client name, MRR, tenure, churn risk score badge
   - **Risk Signals Timeline**: "SLA compliance dropped to 72% (Mar)", "QBR attendance: CFO absent 2 consecutive (Feb)", "Ticket reopen rate 3× baseline (Jan)", "After-hours support spike (Dec)"
   - Services map: enrolled vs. available
   - AI recommended actions: "Schedule QBR within 2 weeks", "Propose M365 backup add-on ($500/mo)", "Executive sponsor outreach (not account manager) — signals seriousness"
   - "Generate QBR Report" link → navigates to Client 360

**Fake Data**: Generate 20 realistic client names:
- 3 high churn risk (using validated signal combinations): Metro Law Partners (SLA + QBR drop), Cascade Manufacturing (escalation spike + billing dispute), Summit Healthcare (endpoint contraction + champion reassignment)
- 5 with upsell opportunities (missing M365 backup, no EDR, no DLP)
- 2 negative margin (high ticket volume relative to MRR)
- 10 healthy with varied profiles

### Client 360 Page — Prototype Spec

**Page: Full Client Deep Dive** (accessed from either dashboard's drill-down)

1. **Header**: Client name, logo placeholder, MRR, tenure, churn risk score badge, trend arrow
2. **Event Timeline** (full width, scrollable):
   - Events plotted chronologically: backup failures (red dots), security incidents (orange), patches applied (green), QBRs (blue diamonds), tickets opened/closed (gray)
   - Hover reveals event detail
   - Visual density communicates client health at a glance
3. **Services Matrix** (left column):
   - Visual grid: Backup ✅, EDR ✅, M365 Backup ❌, Patch Mgmt ✅, DLP ❌
   - Missing services show "Add Service" CTA with estimated MRR impact
   - Coverage % badge
4. **Risk Signals Panel** (right column):
   - AI-generated summary: "This client's risk level has been elevated since March 2026. Key drivers: backup success rate dropped from 98% to 82%, 3 SLA misses in the last 30 days, executive sponsor stopped attending QBRs."
   - Signal cards: each with trend sparkline showing direction
5. **Posture Radar Chart**:
   - 5-axis radar: Backup, Patches, Threats, M365, Endpoints
   - Current vs. 30 days ago overlay (shows drift direction)
6. **QBR Report Generator**:
   - "Generate QBR Report" button (prominent CTA)
   - On click: modal shows preview of auto-generated report with sections:
     - **Executive Summary**: Top 3 wins, top 1 risk, single most important action item
     - **Incidents Resolved**: ticket count, MTTR, SLA %
     - **Security Posture**: threats blocked, patch compliance, vulnerability trend
     - **Recommendations**: forward-looking (80%), tied to specific next actions
     - **Next 90 Days**: strategic roadmap items
   - "Copy to Clipboard" / "Download PDF" buttons (stubbed with toast notification)
   - Structure follows retention best practice: 80% forward-looking, 20% backward-looking
7. **AI Recommended Actions** (bottom cards):
   - "Schedule QBR within 2 weeks — executive sponsor outreach recommended"
   - "Propose M365 backup ($500/mo upsell) — client has 47 unprotected mailboxes"
   - "Escalate: 3 consecutive SLA misses — trigger proactive service review"

### Interactions to Implement

| # | Interaction | Location | Type |
|---|------------|----------|------|
| 1 | Click tenant tile → show detail panel (slide-down) | Ops | Drill-down |
| 2 | Time range filter (7d/30d/90d) → update all charts with smooth transition | Ops | Filter |
| 3 | Expand AI briefing item → show recommended action | Ops | Accordion |
| 4 | Severity filter → update heatmap | Ops | Filter |
| 5 | New alerts appearing periodically via setInterval | Ops | Simulation |
| 6 | Click churn-risk dot → show client detail panel | Biz | Drill-down |
| 7 | Click upsell CTA → show confirmation toast | Biz | Action |
| 8 | Period selector → update revenue chart + metrics | Biz | Filter |
| 9 | Toggle peer benchmark metrics | Biz | Toggle |
| 10 | Sidebar navigation between Ops, Biz, and Client 360 | All | Nav |
| 11 | Generate QBR Report → modal with preview | Client 360 | Modal |
| 12 | Cards fade-in on page load (staggered 100ms) | All | Animation |
| 13 | Risk tiles pulse subtly when critical | Ops | Animation |
| 14 | Number counters animate on period change | Biz | Animation |

### Technical Implementation

- **Stack**: Single HTML file per page (or combined with tab navigation). Vanilla JS. Chart.js via CDN. CSS Grid + Flexbox.
- **No build step**: Must open directly in browser via `file://` or simple HTTP server.
- **Fake data**: Hardcoded JSON objects at the top of the script. Realistic distributions (power-law: 3 large, 5 mid, 12 small clients).
- **Charts**: Chart.js for line charts, bar charts, gauge (doughnut), scatter plots, and radar charts.
- **Animations**: CSS transitions for panel slides, fade-ins on load, smooth chart data updates.
- **Responsive**: 1280px+ viewport width. Desktop-first (MSP tool, NOC monitor display).

---

## 6. README Template

```markdown
# Acronis MSP Intelligence Dashboards — Prototype

## How to Open
1. Unzip the archive
2. Open `operations-dashboard.html` in any modern browser (Chrome, Firefox, Edge)
3. Open `business-growth-dashboard.html` in any modern browser
4. Open `client-360.html` in any modern browser
5. No server or build step required — everything runs client-side

## What's Real vs. Stubbed
| Feature | Status |
|---------|--------|
| All data | Realistic but fake (hardcoded JSON, power-law distributed) |
| Drill-down interactions | ✅ Functional (click tenant/client → detail panel) |
| Filter controls | ✅ Functional (updates all charts with smooth transitions) |
| AI briefing | ✅ Functional (pre-generated priority-ranked bullets, not live AI) |
| Charts & visualizations | ✅ Real Chart.js (line, bar, scatter, radar, doughnut) |
| Real-time alerts | ⏸ Simulated with setInterval (new alert every 15-30s) |
| QBR Report Generator | ✅ Modal with full report preview |
| Peer benchmarks | ✅ SLI-aligned fake data (11.1% median EBITDA, 46.2% margin) |
| Premium tier gating | ✅ Visual indicators (🔒 badges, teaser text, blurred data) |
| "View in Console" links | 🔗 Stubbed (no backend) |
| "Suggest to Client" CTA | ✅ Shows confirmation toast |
| Sidebar navigation | ✅ Collapsible with page switching |

## Design Decisions
- **Risk heatmap over alert list**: MSP techs already have ticket boards in PSA tools — cross-tenant visual is the view they're missing. A heatmap asks "which client environment is degrading?" vs. an alert board asking "which ticket do I close next?"
- **Scatter plot for churn risk**: X/Y/size encoding reveals patterns (new high-MRR clients at highest risk; long-tenure low-MRR clients most stable)
- **Priority-ranked bullets for AI briefing**: Research shows this is the highest-action format for operations teams (not paragraphs, not just a list — ranked + context + action)
- **SLI-aligned benchmarks**: Using real Service Leadership Index ranges (11.1% avg EBITDA, 46.2% service margin) for credibility
- **80/20 QBR reports**: 80% forward-looking, 20% backward-looking — retention research shows this keeps clients engaged in future value
- **Dark theme**: matches MSP tool conventions and extended viewing comfort for NOC environments
- **Free/Premium indicators**: demonstrate monetization thinking with blurred-data conversion hooks (not just lock icons)
```

---

## 7. AI Workflow Note Template

```markdown
# AI Workflow Note

## How I Used AI During This Task

### Where AI Accelerated Me
- **Research synthesis**: Used AI (Perplexity Deep Research) to aggregate MSP NOC workflow benchmarks (Tier 1/2/3 structure, 400-500 endpoint load, 30-60 min morning triage), QBR best practices (4-6 hrs prep time, 82% churn link), competitive dashboard analysis (5 platforms compared), and data warehouse architecture (ClickHouse at scale)
- **Data model grounding**: AI identified the 9 specific Acronis APIs available on developer.acronis.com, enabling a credible data model rather than hypothetical assumptions
- **Fake data generation**: AI generated realistic tenant/client names, endpoint counts, and varied risk profiles to populate the prototypes
- **Boilerplate code**: Chart.js configuration, CSS Grid layouts, and HTML scaffold were generated by AI and then customized for Acronis brand guidelines

### Where I Overrode or Discarded AI Output
- **Persona framing**: AI initially produced generic SaaS personas ("Alex, the busy IT manager"). I rewrote them to reflect specific MSP NOC realities — the Tier 1/2/3 structure, the dispatcher role, the 400-500 endpoint load per tech, the "swivel-chairing" across disconnected tools that 89% of MSPs experience
- **Metric recommendations**: AI suggested standard SaaS metrics (NPS, feature adoption %). I kept some but added research-validated MSP-specific ones: MTTA across tenants, revenue per endpoint ($100-500 ARPU), service gross margin (46.2% SLI median), and tickets per tech — metrics MSP owners actually track and benchmark in IT Nation Evolve peer groups
- **Dashboard layout**: AI's first pass used a generic SaaS analytics layout (KPI cards → chart → table). I restructured around the validated MSP NOC workflow: morning triage → risk identification → drill-down → dispatch — matching the actual Tier 1 start-of-day routine

### A Concrete Judgment Call Against AI's Suggestion
AI strongly recommended a Kanban-style alert board as the primary view for the Operations Dashboard, arguing that "alert management is the core workflow for operations teams." I rejected this because:

1. **MSP technicians already have Kanban boards** — in ConnectWise Manage, Autotask, HaloPSA, and other PSA tools. Only 11% of MSPs have seamless integration; adding another board creates the same swivel-chairing problem.
2. **The value of Acronis's position** is in cross-tenant aggregation. An alert board is per-incident; a risk heatmap is per-tenant. The heatmap provides the view they genuinely *cannot* get from any of their existing 8-25 tools.
3. **The decision it enables is different**: an alert board asks "which ticket do I close next?" A heatmap asks "which client environment is degrading?" — a fundamentally more strategic question that prevents incidents from being created in the first place.
4. **Research validation**: The best-performing operations AI tools (BigPanda ADR, PagerDuty Shift Agent) pre-triage before humans arrive — they don't replicate the ticket queue, they present a prioritized summary. That's what our briefing + heatmap does.

This decision reflects a core product principle: **don't build what exists elsewhere; build what only you can build given your unique data position — the convergence of backup + security + endpoint + cloud workload data across all tenants.**
```

---

## 8. Assumptions, Risks & Validation Template

```markdown
# Assumptions, Risks & What I'd Validate Next

## Assumptions (Research-Grounded)
1. **Acronis APIs provide real-time backup, patch, and threat telemetry per tenant** — confirmed via developer.acronis.com: Task Management API (backup jobs), Alert Management API (threats), Agent Management API (endpoints), Usage Reporting API (consumption). Data exists; we need aggregation and intelligence, not new instrumentation.
2. **PSA integrations can provide ticket and SLA data** — existing Acronis integrations with ConnectWise Manage, Autotask, and HaloPSA confirm the connector path exists. But only 11% of MSPs report seamless integration — graceful degradation is essential.
3. **MSP owners will log into Acronis for business insights** — today they use Acronis only for operations. Shifting to business analytics requires a new mental model. Push mechanism (weekly email digest with "money left on the table" hook) is required, not just a dashboard.
4. **Anonymized peer benchmarking is legally feasible** — IT Nation Evolve and Service Leadership Index demonstrate the model works with opt-in, standardized accounting definitions, and minimum cohort sizes (50+). Privacy barriers (competitive paranoia, vendor trust) are real but solvable.
5. **QBR report generation is the killer feature** — 82% of buyers cancelled B2B contracts due to poor QBRs. MSPs currently spend 4-6 hours per client per quarter on prep. Compressing this to 10 seconds creates a switching cost so high that once QBRs are powered by Acronis data, the lock-in is near-permanent.

## Top Risks

| Risk | Severity | Evidence | Mitigation |
|------|----------|----------|------------|
| **Peer benchmarking privacy blockers** — legal teams may delay or block anonymized data aggregation | High | MSPs fear competitive exposure, vendor data mining, and reverse-engineering in small groups (10-15 members) | Opt-in model. Min 50 per cohort. Segment by region AND size. Enforce standardized accounting definitions (SLI model). Engage legal in Q3, not Q4. |
| **Churn model cold start** — false positives in first 90 days erode trust and kill adoption | High | ML models need 90+ days of incident data for reliable noise reduction (validated by BigPanda/PagerDuty experience). Trust calibration takes 4-8 weeks. | Show "building your profile" state. Start with rules-based heuristics (no login in 30d = medium risk). Use retrospective validation against known churners. Add confidence scores to predictions. |
| **PSA data integration gap** — without ConnectWise/Autotask data, margin and churn features lose their strongest signals | Medium | Ticket reopen rate, escalation frequency, and SLA compliance are the strongest churn predictors — all live in PSA, not in Acronis. Without PSA, model degrades to backup telemetry only. | Graceful degradation: "Connect PSA for full insights" CTA. Core features (MRR, coverage gaps) work without PSA. PSA-dependent features = premium tier only. One-click OAuth flow for PSA connection (minimize onboarding friction). |
| **MSP owner adoption** — owners may not develop the habit of checking a new business dashboard | Medium | Time-to-value is the single most predictive variable for conversion. Users who don't hit "aha moment" in first session convert at 5× lower rate. | Pre-populate with sample/demo data on signup (don't show empty dashboard). Triggered "first insight" email when data loads. Weekly push digest (Slack/Teams > email). "Money left on the table" hook. |
| **Alert noise in AI briefing** — if briefing has too much noise, NOC teams stop reading within 2 weeks | Medium | Operations teams universally resist AI summaries until they see the AI catch something they missed. False positive rate is #1 determinant of sustained adoption. | Start conservative (only Critical/High items in V1). Allow user feedback ("this was helpful" / "this was noise") to train noise reduction. Build learning period messaging into the UX. |

## First 3 Things to Validate with MSPs

### 1. Cross-Tenant Triage Model (Operations)
**Question**: Do MSP technicians prefer a visual heatmap of tenant risk, or a prioritized text list?
**Method**: Show both prototypes to 5 Tier 1 techs. Time how long they take to answer "which client do you check first?" with each format. Observe eye-tracking patterns.
**Decision**: Determines primary layout of the Operations dashboard. May influence whether heatmap is default or alternative view.

### 2. Churn Signal Accuracy (Business)
**Question**: Which behavioral signals actually predict churn in real MSP businesses?
**Method**: Interview 10 MSP owners who lost clients in the past year. Ask them to reconstruct the 6 months before churn. Compare their retrospective signals against our proposed feature set (ticket reopen rate, SLA <80%, QBR attendance, escalation frequency, billing disputes).
**Decision**: Validates or modifies churn model inputs. If ticket reopen rate is not available from most PSAs, need alternative signal.

### 3. Willingness to Share for Benchmarking (Business)
**Question**: Would MSP owners opt in to anonymized peer benchmarking? What's the minimum value they need to justify sharing?
**Method**: Survey 50 MSP owners. Show mockup of benchmarking panel with real SLI ranges. Ask: (a) Would you share anonymized data? (b) What metrics make this valuable to you? (c) What's the minimum cohort size you'd trust? (d) Would you pay for this?
**Decision**: Determines whether peer benchmarking is a launch feature or delayed. Informs whether it's free-tier or premium-only.
```

---

## 9. Competitive Context (Reference for AI Model)

| Competitor | What They Do Well | What They Lack | Acronis Differentiation |
|-----------|------------------|----------------|----------------------|
| **ConnectWise BrightGauge** | Deep PSA-native reporting, financial dashboards, client-facing embedded gauges | ❌ No AI/ML. ❌ No peer benchmarks. Feature stagnation ("only 2 datasources since 2019"). No phone support. | Acronis has security + backup + endpoint telemetry BrightGauge can never access |
| **Kaseya IT Complete** | Broadest portfolio (40+ tools), annual peer benchmark reports, vCIO advisory modules | ⚠️ Emerging AI only. UX complexity from 40+ acquisitions. Support degradation. Aggressive lock-in pricing. | Acronis: single-pane for cyber + data protection; tighter integration without 40 acquisitions |
| **NinjaOne** | Modern UI, fast TTV, strong operational dashboards, competitive pricing ($3-4/endpoint) | ❌ Reporting is #1 complaint. ❌ No AI. ❌ No peer benchmarks. ❌ No business KPIs. | Acronis: AI-driven predictive layer + business context NinjaOne can't provide |
| **Datto/Autotask** | Powerful PSA reporting, Kaseya benchmark data, G2 summer 2024 leader | ❌ No AI. Report builder requires SQL-like logic. AD sync pain for multi-tenant. | Acronis: wraps operational data in business intelligence context |
| **MSPbots.ai** | Most advanced AI: Sentiment Max (ticket NLP), 250+ pre-built dashboards, real-time anomaly detection | $990/month prohibitive for small MSPs. Internal benchmarking only. Setup requires clean PSA data. | Acronis: native platform data (no PSA dependency for core features) + lower cost + peer-network-scale benchmarking |

**Acronis's Unique Position**: No competitor combines cyber protection data (backup, security, endpoint, cloud workloads) with business intelligence (churn, margin, benchmarks) in a single multi-tenant platform. The "centralized reporting system for MSPs" vision leverages this unique data convergence — the same convergence that made Acronis #1 in combined Canalys analysis.
