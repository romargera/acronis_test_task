# Acronis Test Task Submission

## Contents

- `problem_framing_and_personas.md`
- `requirements_prd.md`
- `data_sources_and_model.md`
- `ai_workflow_note.md`
- `assumptions_risks_and_validation.md`
- `prototype/` - interactive HTML prototype.

## Prototype screens

- `prototype/index.html` start page.
- `prototype/operations_dashboard.html`
- `prototype/business_dashboard.html`

## How to run

1. Open `prototype/index.html` in a browser. No build step, no hosting required.
2. Navigate between dashboards with the top navigation.
3. Use filters and click interactions:
   - Operations: click a heatmap tile, a briefing item, or an alert row to open the tenant drill-down, then *Dispatch to Tier 2*.
   - Business: click a churn bubble or *Inspect* an upsell row to open the client drill-down, then *Preview QBR Draft*.
   - Business: scroll to the *Peer Benchmark* card to compare the portfolio to the peer cohort on four metrics.
   - On either dashboard: click the *"Heuristic v1 · how calculated"* confidence badge next to a score to see the factor weights and rationale.

## Real versus stubbed

### Real in prototype

- Two-page clickable workflow (Operations plus Business Growth) with role-based interactions.
- Interactive shared filters (time window, severity, service, region, country, segment) with cross-tab persistence.
- Drill-down patterns from summary widgets to the tenant detail panel.
- Simulated live alert feed in Operations.
- QBR draft modal generation flow.
- Peer Benchmark card on Business with cohort definition, percentile bars, and a focus-metric filter.
- Confidence-badge explainer modals for the Operational Risk Score and the Churn Risk Score.

### Stubbed or simulated

- Data is fake but internally coherent (`prototype/assets/data.js`).
- No live Acronis Application Programming Interface calls and no Professional Services Automation integration.
- No backend persistence; shared filter state is stored only in the browser.
- Scoring weights are the initial product hypothesis (visible in the explainer modal), not a trained model.
- Peer cohort values are synthetic placeholders in realistic directional ranges.
- Add widget, Share, and Dispatch actions are simulated as toast notifications.

## If we had two more hours

- Add `Client 360` as a third page (not required by the test task) for cross-dashboard tenant deep dive.
- Connect Operations and Business drill-down actions to that page with query parameters (`tenant`, `source`).
- Expand the QBR flow there: timeline plus service map plus one-click export stub.
- Replace the `Set goal` placeholder with a complete goal-setting flow (target definition, owner, cadence, and follow-up actions).
- Rank all widgets by decision importance and validate those priorities as explicit assumptions.
- Add responsive-layout rules for different screen proportions and define accessibility and mobile behaviour (focus order, keyboard navigation, contrast, and compact interaction patterns).

## Design system usage

Prototype styling is grounded in Acronis User Interface Component Library theme assets:

- `prototype/assets/acv-reset.css`
- `prototype/assets/acv-theme-acronis.css`
- plus local `prototype/assets/common.css` that maps layout and interaction styles to `--acv-*` tokens.
