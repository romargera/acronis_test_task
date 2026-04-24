# Acronis Test Task Submission

## Contents
- `problem_framing_and_personas.md`
- `requirements_prd.md`
- `data_sources_and_model.md`
- `ai_workflow_note.md`
- `assumptions_risks_and_validation.md`
- `prototype/` interactive HTML prototype

## Prototype Screens
- `prototype/index.html` start page
- `prototype/operations_dashboard.html`
- `prototype/business_dashboard.html`

## How to run
1. Open `prototype/index.html` in a browser.
2. Navigate between dashboards with top navigation.
3. Use filters and click interactions:
   - Operations: click heatmap tile / briefing item / alert row -> tenant drill-down -> `Dispatch to Tier 2`.
   - Business: click churn bubble / upsell inspect -> client drill-down -> `Preview QBR Draft`.

No build step, no hosting required.

## Real vs Stubbed

### Real in prototype
- Two-page clickable workflow (Operations + Business Growth) with role-based interactions.
- Interactive shared filters (time window, severity, service, region, country, segment) with cross-tab persistence.
- Drill-down patterns from summary widgets to tenant detail.
- Simulated live alert feed in Operations.
- QBR draft modal generation flow.

### Stubbed/simulated
- Data is fake but internally coherent (`prototype/assets/data.js`).
- No live Acronis API calls and no PSA integration.
- No backend persistence (only local browser state for shared filters).
- Churn score and margin model are heuristic placeholders.
- Add widget / Share / dispatch actions are simulated toasts.

## If we had +2 more hours
- Add `Client 360` as a third page (not required by the test task) for cross-dashboard tenant deep dive.
- Connect Operations/Business drill-down actions to that page with query params (`tenant`, `source`).
- Expand QBR flow there: timeline + service map + one-click export stub.
- Replace the current `Set goal` placeholder with a complete goal-setting flow (target definition, owner, cadence, and follow-up actions).
- Rank all widgets by decision importance and validate those priorities as explicit assumptions.
- Add responsive layout rules for different screen proportions and define accessibility/mobile behavior (focus order, keyboard navigation, contrast, and compact interaction patterns).

## Design System Usage
Prototype styling is grounded in Acronis UI Component Library theme assets:
- `prototype/assets/acv-reset.css`
- `prototype/assets/acv-theme-acronis.css`
- plus local `prototype/assets/common.css` that maps layout and interaction styles to `--acv-*` tokens.
