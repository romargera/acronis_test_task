# Assumptions, Risks, and What to Validate Next

Any inline `(A)` marker elsewhere in the submission points back to this register.

## Assumptions

### Product bets
- The first version should focus on mid-market MSPs, where portfolio-level prioritization and peer comparison are more useful than for very small MSPs.
- MSP technicians and MSP owners benefit from two separate dashboards rather than one combined surface.
- MSP owners will return to the Business Growth dashboard on a weekly cadence without needing an external reminder for every session. (A)
- The current Operations experience has strengths worth preserving, especially fast KPI scanning, widget clickability, and quick actions.

### Data and integration assumptions
- Operational and business signals can be joined without a net-new data acquisition project.
- A consistent tenant identifier exists across operational, billing, and PSA sources.
- PSA-derived signals (SLA, reopen, escalations) are available and clean enough for a heuristic v1 score.
- Backup, patch, and threat telemetry already roll up to tenant level in existing pipelines, so the main new compute is composite scoring, trend diffs, and churn heuristics rather than a net-new warehouse build. (A)
- Benchmarking can be provided through anonymized cohorts with a privacy threshold users accept.

### UX and behavioral hypotheses
- MSP personas care more about faster time-to-decision and clearer prioritization than visual polish.
- Technicians will prefer rapid color-and-severity scanning over a dense ranked table for first-pass triage.
- A usable taxonomy of valuable downstream actions can be defined, or approximated initially through click-out depth and follow-through patterns.
- Ticket reopen rate is a strong enough early churn signal to use in a heuristic v1 score.

## Biggest Risks

### High
- **Churn risk false positives.** Likelihood: high. Impact: high because trust in the dashboard can collapse quickly. First mitigation: confidence bands, top-factor explanation, native fallback signals, and an explicit *Unavailable* state when evidence is too weak.
- **Benchmark privacy or governance blocker.** Likelihood: medium. Impact: high because it can block the peer-comparison feature entirely. First mitigation: legal review before pilot, minimum cohort threshold, and screenshot-safe cohort labeling.

### Medium
- **Data freshness mismatch across systems.** Likelihood: medium. Impact: medium because it creates conflicting narratives between widgets. First mitigation: widget-level timestamps, stale-state indicators, and a single definition of near real time.
- **Margin estimation error.** Likelihood: high. Impact: medium because the signal may still be directionally useful even when not precise. First mitigation: label margin as estimated, use a transparent cost proxy, and allow an MSP-configured hourly-rate input in later iterations.

## First 3 validation tests with MSPs
1. Triage behavior test (Operations):
   - Ask technicians to run morning triage in the current workflow and then in the prototype with the same overnight scenario.
   - Measure time-to-first-valuable-step and confidence.
   - We consider this validated if median time-to-first-valuable-step improves by at least 40 percent and confidence is at least 4 out of 5 for at least 6 of 8 participants.
2. Commercial decision test (Business):
   - Give owners the same 20-client portfolio first without the dashboard and then with it, and ask which 3 accounts they would act on this week.
   - Measure whether the top-3 picks change, how specific the reasoning becomes, and confidence in the decision.
   - We consider this validated if at least 6 of 8 participants produce a clearer top 3 with explicit churn, upsell, or margin reasoning and report confidence of at least 4 out of 5.
3. Trust calibration test (Risk + Portfolio Trends):
   - Show two explainer variants for the scores: one with full factor weights and one with only the top contributing factors and a confidence band.
   - Validate which version users trust more, which signals they challenge, and what transparency framing they actually need.
   - We consider this validated if at least 6 of 8 participants prefer one explainer pattern and can correctly restate the top two drivers of a sample score without prompting.

## If I had two more hours
- Add an optional `Client 360` page for tenant-level deep dive connected from both dashboards.
- Add explicit score explainability panel (feature contribution per risk score).
- Add a concrete churn-scoring sketch with native fallback signals and initial weights.
- Add export stub for QBR draft into a simple markdown/PDF flow.
- Prepare a simple mitigation plan for the biggest risks, especially score trust, data quality, and benchmark adoption.
