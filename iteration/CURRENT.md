---
iteration: 3
under_test: L1.C.2
published: [L1.C.1, L1.C.2, L1.C.2.1, L1.C.2.2, L1.C.2.3, L1.C.2.9, L1.C.5, L1.C.6, R.1, R.2, R.3, R.3.1, R.3.2, R.3.3, U1.0, U1.E.1, U1.B.1, U1.B.2, U1.B.3, U1.S.1, U1.S.2, U1.S.3, U1.K.1, U1.K.2, U1.9, X.1, X.2, X.3]
github: push at handoff, section leave, or a session whose new work is fit to publish
---

ARTI1000X and ARTI2000X are the two main courses. U1 is the first optional plugin, using a model. Reference (glossary, `R.1`, `R.2`, `#/tools`) is shared. The map is `curriculum/courses.md`. Kinds, examinations, and picture and clip placeholders are `curriculum/assignments.md`.

`L1.C.2` through `L1.C.2.9` are the data group: what data is, quality, selection, and a summary. `L1.C.5` and `L1.C.6` are first-pass drafts on one page each. The next pass can split them. `R.2` remains the worked example of selection and of one decision tree. `R.3` collects the HTML, JavaScript, and Python stubs, generated from `curriculum/languages.tsv`. Follow `curriculum/method.md` before adding a page.

The header grade target is E, C, or A, remembered in the browser. E is the default and the writing focus until ARTI1000X is a coherent set. Rules are `curriculum/grade-target.md`. Spans are `curriculum/gradespan.tsv`. C and A text on a segment is a `grade-block` in that page, not a new outline row. Tools-page continuation is paused. A specialized-tools page is not built. Further models may join that page or get their own.

Outline marks use local calendar dates. New lasts 7 days. Updated lasts 1 day and can sit beside new when the edit is a later date. Windows are `freshness` in `js/config.js`. Dates are `curriculum/freshness.tsv`.

Static HTML stays. When a session introduces words the learner meets, extend `curriculum/glossary.tsv` once near the end, then run `python tools/lint_glossary.py`.
