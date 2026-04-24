# AI Workflow Note

I used AI as a speed multiplier for synthesis and drafting, but kept product judgment and prioritization manual.

## Where AI accelerated work
- Consolidated large input docs (`notes/execution_plan.md`, `notes/pitch_and_assessment.md`, `prd.md`) into a narrower MVP scope aligned with the 3-4 hour test constraint.
- Drafted first-pass structures for PRD sections and data model tables.
- Generated boilerplate interaction logic for prototype pages (filters, drill-down, modal behavior), then manually simplified and corrected.

## Where I overrode AI output
- AI initially pushed toward a bigger feature surface (too many widgets and pseudo-analytics). I cut this to decision-centric interactions only: triage heatmap, risk radar, margin leaks, and QBR actions.
- AI suggested adding external charting libraries; I intentionally avoided dependency-heavy setup and used simple inline SVG/chart primitives to keep the prototype locally runnable without build steps.
- AI proposed generic UX copy for actions; I rewrote actions to map to MSP decisions (retain, harden, upsell, prep QBR).

## Concrete judgment call against AI suggestion
AI suggested a combined “one dashboard for everyone” concept for simplicity. I rejected it because operations and business users have fundamentally different decisions and time horizons.

Final decision:
- Two role-focused dashboards only (strictly aligned with the task scope).
- This keeps execution tight within the 3-4 hour constraint and avoids overbuilding.

## What I would improve with more time
- Add a `Client 360` deep-dive page as an optional phase-2 extension.
- Replace synthetic risk heuristics with a transparent weighted model and confidence.
- Add explicit instrumentation hooks (event schema) for measuring success metrics.
- Integrate one realistic CSV import flow for PSA-like data to make assumptions testable.
