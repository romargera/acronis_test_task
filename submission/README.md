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
- `prototype/client_360.html`

## How to run
1. Open `prototype/index.html` in a browser.
2. Navigate between dashboards with top navigation.
3. Use filters and click interactions:
   - Operations: click heatmap tile / briefing item / alert row -> tenant drill-down -> `Open Client 360`.
   - Business: click churn bubble / upsell inspect -> client drill-down -> `Open Client 360` or `Preview QBR Draft`.
   - Client 360: switch tenants, filter timeline, run action buttons, generate QBR draft modal.

No build step, no hosting required.

## Real vs Stubbed

### Real in prototype
- Multi-page clickable workflow with cross-page context (`tenant` and `source` query params).
- Interactive filters (severity/service/region/segment/period).
- Drill-down patterns from summary widgets to tenant detail.
- Simulated live alert feed in Operations.
- QBR draft modal generation flow.

### Stubbed/simulated
- Data is fake but internally coherent (`prototype/assets/data.js`).
- No live Acronis API calls, no PSA integration, no persistence.
- Churn score and margin model are heuristic placeholders.
- Export/CRM ticket creation actions are simulated toasts.

## Design System Usage
Prototype styling is grounded in Acronis UI Component Library theme assets:
- `prototype/assets/acv-reset.css`
- `prototype/assets/acv-theme-acronis.css`
- plus local `prototype/assets/common.css` that maps layout and interaction styles to `--acv-*` tokens.
