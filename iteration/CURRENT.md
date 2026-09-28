---
iteration: 3
under_test: R.3
published: [L1.C.1, R.1, R.2, R.3, R.3.1, R.3.2, R.3.3, U1.0, U1.E.1, U1.B.1, U1.B.2, U1.B.3, U1.S.1, U1.S.2, U1.S.3, U1.K.1, U1.K.2, U1.9, X.1, X.2, X.3]
github: push at handoff, section leave, or a session whose new work is fit to publish
---

ARTI1000X and ARTI2000X are the two main courses. U1 is the first optional plugin, using a model. Reference (glossary, `R.1`, `R.2`, `#/tools`) is shared. The map is `curriculum/courses.md`. Kinds, examinations, and picture and clip placeholders are `curriculum/assignments.md`.

`R.2` is the dogfood entry for data selection, the page-or-table decision, and the five problem-solving steps. Follow `curriculum/method.md` before adding a page, and run `python tools/page_decision.py`. `R.3` collects the HTML, JavaScript, and Python stubs. Their bodies are generated from `curriculum/languages.tsv`. Subject writing still resumes at `L1.C.1`. Child rows stay in `courses.md` until a session is writing that child. Tools-page continuation is paused. A specialized-tools page is not built. Further models may join that page or get their own.

Outline marks use local calendar dates. New lasts 7 days. Updated lasts 1 day and can sit beside new when the edit is a later date. Windows are `freshness` in `js/config.js`. Dates are `curriculum/freshness.tsv`.

Static HTML stays. When a session introduces words the learner meets, extend `curriculum/glossary.tsv` once near the end, then run `python tools/lint_glossary.py`.
