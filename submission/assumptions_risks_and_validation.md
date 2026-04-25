# Assumptions, Risks, and What to Validate Next

## Assumptions
- MSP technicians and MSP owners benefit from two separate dashboards rather than one combined surface.
- MSP personas care more about faster time-to-decision and clearer prioritization than visual polish.
- A consistent tenant identifier exists across operational, billing, and PSA sources.
- PSA-derived signals (SLA, reopen, escalations) are available and clean enough for a heuristic v1 score.
- Benchmarking can be provided through anonymized cohorts without trust or privacy issues.
- The current Operations experience has strengths worth preserving, especially fast KPI scanning, widget clickability, and quick actions.

## Biggest Risks
- Churn risk false positives could reduce trust and actionability.
- Margin estimation can be directionally wrong if cost proxies are weak.
- Data freshness mismatch across systems can create conflicting narratives.
- Benchmark adoption may be blocked by privacy/legal concerns.

## First 3 validation tests with MSPs
1. Triage behavior test (Operations):
   - Ask technicians to run morning triage in current workflow vs prototype.
   - Measure time-to-first-action and confidence.
2. Commercial decision test (Business):
   - Ask owners to pick top 3 actions with and without dashboard support.
   - Measure action clarity and perceived revenue confidence.
3. Trust calibration test (Risk + Portfolio Trends):
   - Show risk explanations and portfolio trend snapshots to owners.
   - Validate which signals they trust, which need transparency, and what confidence framing is required.

## If I had two more hours
- Add an optional `Client 360` page for tenant-level deep dive connected from both dashboards.
- Add explicit score explainability panel (feature contribution per risk score).
- Think through whether goal-setting should exist in v1 at all, which goals matter most, and how that workflow should connect to planning without adding noise.
- Add export stub for QBR draft into a simple markdown/PDF flow.
- Prepare a simple mitigation plan for the biggest risks, especially score trust, data quality, and benchmark adoption.
