# Day Mode card templates

Design mockups for a common card template across all Day Mode stops. Three options, each rendered for the same four stops (Flight d1a, Guggenheim d7b, Trattoria del Local d7g, Casa di Giulietta d9g).

| File | What it is |
| --- | --- |
| `option_a_boarding_pass_*.png` | Option A: fixed six-tile grid in the same positions on every stop |
| `option_b_field_card_*.png` | Option B: action-first stacked rows with leave-by countdown and tappable actions |
| `option_c_glance_drawers_*.png` | Option C: unclipped glance tier plus a Facts / Story / Tips segmented pane |
| `comparison_dinner_current_vs_a_b_c.png` | The current Dinner card next to the same stop in A, B and C |
| `mockups.html` | Source for the mockups. Open with `?opt=A`, `?opt=B` or `?opt=C` |
| `compare.html` | Source for the comparison sheet |

Re-render: `node design/day-mode-templates/render.js && node design/day-mode-templates/render_compare.js` (uses the repo's `playwright-core` and the system Chrome at `/usr/local/bin/google-chrome`).
