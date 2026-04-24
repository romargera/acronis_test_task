# AI Workflow Note

I used Artificial Intelligence as a speed multiplier for synthesis, drafting, and boilerplate, and I kept product judgment, segmentation, and scoring choices manual. This note lists the tools, where each saved time, where I pushed back on the output, and one concrete judgment call I made against an Artificial Intelligence suggestion.

## Tools I used

- **Claude Code** as the primary agentic coding and drafting tool for the Product Requirements Document sections, the prototype scaffold, and the data-model tables.
- **Perplexity** to collect Managed Service Provider context and competitive references during research, especially for peer-benchmarking patterns.
- **Whisper-based transcription** on the recording of the hiring-manager call, used as input context for the segment and scope decisions.

## Where Artificial Intelligence accelerated the work

- Consolidating long context sources (the prototype seed notes, the Perplexity research dump, and the interview transcript) into a tight Product Requirements Document aligned with a three-to-four-hour delivery budget.
- First-pass structures for the problem framing, requirements, and data-model tables, which I then rewrote into sharper prose.
- Boilerplate interaction logic for the prototype pages, including filter state, drill-down wiring, and modal behaviour. I simplified the generated code by hand to remove dead branches and over-defensive checks.
- Drafting the initial Quarterly Business Review template text that the prototype modal produces, before I rewrote the tone to match how a delivery lead actually writes.

## Where I overrode Artificial Intelligence output

- The first drafts pushed toward a larger feature surface with more widgets, more pseudo-analytics, and more "nice to have" cards. I cut this down to decision-centric interactions only: triage heatmap, Artificial Intelligence Morning Briefing, churn radar, margin leakage, Quarterly Business Review preview, peer benchmark. Anything that did not map to a concrete Managed Service Provider decision was removed.
- Artificial Intelligence suggested pulling in a charting library such as Chart.js or D3. I rejected it because the task explicitly asks for a locally runnable prototype without a build step. I replaced the suggestion with inline Scalable Vector Graphics primitives in about thirty lines of helper code, which made the prototype trivially open-in-browser.
- Artificial Intelligence drafted generic user-experience copy like "Click here to investigate". I rewrote action labels to map to real Managed Service Provider decisions: *Dispatch to Tier 2*, *Preview Quarterly Business Review Draft*, *Inspect opportunity*, *Escalate with context*.
- Artificial Intelligence proposed hard-coding the current time window string into the Posture Trends widget title. I replaced that with a reference to the global time-window filter so the widget title does not lie when the filter changes.

## One concrete judgment call against an Artificial Intelligence suggestion

Artificial Intelligence repeatedly suggested a single unified dashboard for both personas, framed as "fewer pages are simpler". I rejected this and stayed with two role-focused dashboards.

My reasoning:

- The operations persona and the business persona make decisions on fundamentally different time horizons (same-shift versus weekly and quarterly) and with fundamentally different vocabularies (Service Level Agreement miss rate versus Net Revenue Retention).
- A shared page would force both personas to filter past information irrelevant to their role on every visit, which hurts exactly the time-to-decision metric both dashboards are supposed to improve.
- The task prompt itself specifies two dashboards. Collapsing them into one is effectively scope-creeping against the prompt in the name of cleverness.

Final decision: two role-focused dashboards with a shared filter bar and shared scoring primitives, not a merged page. Artificial Intelligence was wrong in absolute terms but helpful in forcing me to articulate *why* two pages is the correct shape here.

## What I deliberately did not delegate

- Choosing the Managed Service Provider segment (mid-market, one hundred fifty to five hundred tenants, regulated-heavy). This is a product-strategy call that changes the rest of the submission and had to be mine.
- The weight vectors for the Operational Risk Score and the Churn Risk Score. Artificial Intelligence was asked for weight *candidates* but the final selection, including which factor dominates each score, was a manual judgment call informed by the interview transcript.
- The decision to ship rules-based scoring in v1 rather than trained machine-learning scoring. Artificial Intelligence defaulted to "just train a model"; I held the line on explainability first, training later.
- The decision to present peer benchmarks as percentile bands rather than a named league table, and the twenty-five-MSP privacy floor.

## What I would improve with more time

- Replace the synthetic risk heuristics in the prototype with a transparent weighted model that reads directly from the `scoringConfig` used to populate the explainer, so the score on the card and the formula in the explainer are guaranteed to match.
- Add explicit instrumentation event names and payloads for all success metrics as a real appendix, not just as prose in the data model document.
- Integrate one realistic Comma-Separated Values import flow for Professional Services Automation-like data so that the Churn Risk Score assumption is testable with real tenant data rather than synthetic data.
- Add a third `Client 360` page as an optional phase-two extension connected from both dashboards.
