# Assumptions, Risks, and What to Validate Next

## Assumptions
- MSP personas care more about time-to-decision than visual polish.
- A consistent tenant identifier exists across operational and business sources.
- PSA-derived signals (SLA, reopen, escalations) are available and reasonably clean.
- Benchmarking can be provided in anonymized cohorts without trust issues.

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
3. Trust calibration test (Risk + Benchmarks):
   - Show risk explanations and benchmark snapshots to owners.
   - Validate which signals they trust, which need transparency, and what confidence framing is required.

## If I had two more hours
- Add explicit score explainability panel (feature contribution per risk score).
- Add one benchmark segmentation control (cohort by size/region).
- Add export stub for QBR draft into a simple markdown/PDF flow.
