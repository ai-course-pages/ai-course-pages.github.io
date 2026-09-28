---
iteration: 3
under_test: L1.C.1
published: [L1.C.1, R.1, U1.0, U1.E.1, U1.B.1, U1.B.2, U1.B.3, U1.S.1, U1.S.2, U1.S.3, U1.K.1, U1.K.2, U1.9, X.1, X.2, X.3]
github: push at handoff, section leave, or a session whose new work is fit to publish
---

ARTI1000X and ARTI2000X are the two main courses. U1 is the first optional plugin, using a model. Reference (glossary, `R.1`, `#/tools`) is shared. The map is `curriculum/courses.md`. Kinds, examinations, and picture and clip placeholders are `curriculum/assignments.md`.

Next subject writing starts at `L1.C.1` and goes forward. Child rows stay in `courses.md` until a session is writing that child. Tools-page continuation is paused. A specialized-tools page is not built. Further models may join that page or get their own.

Outline marks use local calendar dates. New lasts 7 days. Updated lasts 1 day and can sit beside new when the edit is a later date. Windows are `freshness` in `js/config.js`. Dates are `curriculum/freshness.tsv`.

Static HTML stays. When a session introduces words the learner meets, extend `curriculum/glossary.tsv` once near the end, then run `python tools/lint_glossary.py`.
