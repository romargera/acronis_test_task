# UI Component Library Usage Notes

Repository analyzed: `https://github.com/acronis/ui-component-library`
NPM package inspected: `@acronis-platform/ui-component-library` (`dist/styles/reset.css`, `dist/styles/themes/acronis.css`).

## What was reused in this prototype
- Global reset and theme CSS assets from the library.
- Core token families (`--acv-color-*`, `--acv-spacing-*`, `--acv-radius-*`, `--acv-font-size-*`, `--acv-height-*`).
- Semantic status colors for severity states (critical/high/medium/low badges and tiles).

## How the prototype maps to system concepts
- Buttons, chips, cards, and badges are implemented as token-driven primitives.
- Dashboard layout uses tokenized spacing and radius values.
- Severity signaling uses semantic status tokens instead of hardcoded colors where feasible.

## Why no direct component imports
- Task constraints favored no-build HTML files runnable directly in browser.
- Library JS components are framework-oriented; direct browser use requires a bundling pipeline and framework runtime.
- For this test assignment, token-first styling achieves visual/system alignment with minimal setup risk.

## Production migration path
1. Move from static HTML to framework app (Vue/React) with build pipeline.
2. Replace custom primitives with official library components (table, dropdown, modal, tabs, etc.).
3. Keep current data contracts and interaction flows unchanged.
