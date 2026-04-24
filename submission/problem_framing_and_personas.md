# Problem Framing & Personas

## Who we are designing for

We are explicitly designing for **mid-market MSPs**: technician staff between roughly twenty and eighty people, portfolios of about one hundred fifty to five hundred managed tenants, with a regulated-heavy client mix (healthcare, legal, financial services) and a primary footprint in North America and Europe.

This segment was chosen because:

- They already pay for operational tooling but still run morning triage through spreadsheets and eyes-on-console swivel-chair workflows, so the time-to-decision problem is concrete.
- They have enough portfolio volume for peer benchmarking to feel fair, unlike five-person boutique MSPs where cohort comparison produces noisy small-sample results.
- Acronis is already monetised in this segment, so operations and business signals can be joined today without a new data acquisition project.

We are explicitly **not** optimising for:

- Very small MSPs (fewer than roughly ten clients), whose workflow is still single-operator and where one dashboard replaces memory rather than a console.
- Enterprise in-house Security Operations Centers, which already run a SIEM and expect different incident-investigation depth than we intend to provide.

## Dashboard 1: Operations Center

- Who it is for: Tier 1 and Tier 2 technicians and IT administrators who own daily shift triage across many tenants at once.
- Top decisions enabled:
  1. Which tenants need triage attention first this morning.
  2. Whether operational posture is drifting over the last 7, 30, or 90 days.
  3. Which issue should be escalated with context to Tier 2 or to the account owner.
- Why it matters: Multi-tenant technicians lose substantial shift time on context switching between consoles. Compressing the path from signal to first action improves both Service Level Agreement attainment and customer satisfaction, and reduces the cost of carrying an at-risk tenant.

### Primary persona: Sarah, Tier 1 Network Operations Center technician

- Works an eight-hour shift covering around one hundred eighty tenants.
- Starts every shift by asking herself two questions: *"what broke overnight that I need to act on first"* and *"is anything quietly drifting that will become an escalation later this week".*
- Today she opens four different consoles to answer those questions. The proposed dashboard is designed to answer both in under three minutes.

### Sarah's Monday morning walkthrough

It is eight o'clock on Monday morning and Sarah has just logged in.

1. The Key Performance Indicator row shows that unresolved critical issues rose from nine to fourteen over the weekend and patch compliance dropped three percentage points. The diff indicator is red.
2. The Cross-Tenant Risk Heatmap now has three tiles in critical, led by Northwind Financial. Sarah clicks the Northwind tile.
3. The drill-down panel shows twelve endpoints missing a critical Common Vulnerabilities and Exposures patch, a backup success rate at seventy-two percent, and Service Level Agreement compliance at seventy-four percent. The Operational Risk Score badge is marked *Heuristic v1*; Sarah clicks it once, confirms the weights match her mental model, and moves on.
4. She dispatches the Northwind critical to Tier 2 with the attached context. Elapsed time from login to dispatched escalation is about ninety seconds, compared with an estimated eight minutes in the current multi-console workflow.
5. She then scans the Artificial Intelligence Morning Briefing for the next four ranked items and works through them before opening anything else.

## Dashboard 2: Business Growth Intelligence

- Who it is for: the MSP owner, practice lead, or service delivery manager who carries the number on Monthly Recurring Revenue growth, net revenue retention, and portfolio margin.
- Top decisions enabled:
  1. Which clients are likely to churn and where to intervene first.
  2. Where the next upsell revenue can come from based on coverage gaps.
  3. Where margin leakage exists across the current portfolio.
  4. How the portfolio compares to similar MSPs on the few metrics that actually move retention and revenue.
- Why it matters: MSP owners often see technical status but not commercial risk early enough to act. Linking service signals to business outcomes, and making those outcomes comparable to peers, turns late-stage surprises into early-stage decisions.

### Primary persona: Mike, MSP owner and practice lead

- Owns a mid-market MSP with roughly two hundred tenants and twenty-five technicians.
- Reviews portfolio health once a week and prepares Quarterly Business Reviews monthly.
- Today he builds Quarterly Business Review decks in a spreadsheet, chasing data from Professional Services Automation, Customer Relationship Management, and the backup console separately. The proposed dashboard is designed to replace the first ninety minutes of that preparation with ninety seconds of review.

### Mike's Monday morning walkthrough

It is nine o'clock on Monday morning and Mike has just logged in.

1. The Key Performance Indicator row shows Portfolio Monthly Recurring Revenue is up one point three percent period over period, but At-Risk Monthly Recurring Revenue is up eight percent. He clicks the At-Risk card.
2. The Churn Risk Radar highlights two bubbles in critical: Northwind Financial and Alpine Medical. He clicks Northwind.
3. The client drill-down shows Service Level Agreement compliance at seventy-four percent, ticket reopen rate at thirty-one percent, and two billing disputes. Churn Risk is *Heuristic v1*; Mike clicks the badge and sees that reopen rate and escalation rate dominate the score, which matches his intuition.
4. He presses *Preview Quarterly Business Review Draft*, generates a two-paragraph executive summary with a forward plan, and forwards it to the account manager to use as a starting point.
5. Before closing, he scrolls to the Peer Benchmark card. He sees he is six percentage points behind the peer median on Net Revenue Retention and four points behind on Gross Margin, but ahead of the twenty-fifth percentile on Service Level Agreement compliance. He screenshots it for the leadership Friday meeting.

## Trade-offs we accepted, with the reasoning

These are explicit choices we would defend in review rather than omissions we hope nobody notices.

### Heatmap tiles over a single ranked list on Operations

We chose a heatmap of tiles instead of a ranked list for cross-tenant risk.

- Upside: visually groupable, supports sorting on multiple axes, tolerates scanning by color without reading every row.
- Downside: scales poorly beyond roughly fifty tenants on one screen; for five-hundred-tenant portfolios we accept that users filter or use the Artificial Intelligence Morning Briefing as the entry point.
- Alternative considered: a dense ranked table. Rejected for v1 because technician feedback during discovery consistently pointed at color-scan behavior.

### Rules-based scoring in v1, not a trained model

Both the Operational Risk Score and the Churn Risk Score are deterministic weighted heuristics rather than trained machine-learning models.

- Upside: we can ship explainable scoring immediately, users can see and argue with the weights, and we avoid a long warm-up period with no product to validate.
- Downside: weights will be wrong in absolute terms and must be recalibrated with real thumbs up and thumbs down feedback in the early access program.
- Alternative considered: waiting until we have a labeled churn dataset from production renewals. Rejected because it delays v1 by at least one quarter with no product learning in between.

### Peer benchmark as percentile bands, not as ranked league tables

We show the user their value against the twenty-fifth, fiftieth, and seventy-fifth percentile of a peer cohort, not a ranked list of named MSPs.

- Upside: anonymization is structural, cohort definition is explicit, and users do not feel the product is publishing their performance to their competitors.
- Downside: users cannot see who is at the top or learn from specific peers.
- Alternative considered: an opt-in named benchmarking club. Deferred because the first version is about producing any defensible comparison at all; a club adds acquisition friction we should not take on before the base widget is validated.

## Optional extension with two more hours: Client 360

- Who it is for: both personas when they need customer-specific context.
- Top decisions enabled: which action to take now (operations hardening, retention outreach, or a commercial proposal), and what to include in the next Quarterly Business Review with a forward-looking plan.
- Why it matters: both operational and commercial workflows converge at tenant level, so one shared detail surface can reduce context loss across the two dashboards.
