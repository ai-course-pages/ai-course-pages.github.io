# Improvement plan, November 2026

This file is a working note. It is not linked from the site navigation. It combines two automated reviews of the site (Codex on the box, and OpenCode with `deepseek-v4.1-flash-free`; the `big-pickle` and `glm-5.3-flash-free` runs hung and produced no analysis) with a manual read of the pages, `js/app.js`, `css/site.css`, and the `curriculum/` notes.

## What the reviews agreed on

- **Thin pages.** `L1.C.1`, `L1.C.5`, and `L1.C.6` are short first passes: one example per idea, no worked exercises, no summary. `R.2` and `R.3.1`–`R.3.3` are stubs by design. Eleven glossary entries are marked stub.
- **Unwritten rows.** 26 syllabus rows (`L1.C.3`, `L1.C.4`, all of `L1.X`, `L1.D`, and `L2`) have no lesson body. That is the plan in `curriculum/courses.md`, not a defect, and it is out of scope here: writing new syllabus pages is the dogfood loop's job.
- **Navigation and accessibility.** `document.title` never changes, focus is not moved on a route change, the nav has no current-page state, there is no skip link and no `:focus-visible` style, quiz scores and copy notices are not announced, and wide tables overflow on a phone.
- **Mobile.** One breakpoint; the action buttons stay in a row; tables have no scroll wrapper; tap targets are small.

## Claims checked

| Claim from a review | Verdict |
| --- | --- |
| `R.1`: "Markdown is how these lessons are written" is wrong; lessons are HTML fragments | Correct. Fix the wording. |
| `U1.K.1`: frontmatter is described as a block *beside* SKILL.md | Partly. Frontmatter sits at the top of a file. Fix the wording. |
| `U1.E.1`: Claude does not have `xhigh` | Wrong. Anthropic's effort docs list `low`, `medium`, `high`, `xhigh`, `max` (Opus 4.7 and newer for `xhigh`). No change. |
| `X.1`–`X.3`: Grok Bot and Grok Build are invented | Wrong. No change. |
| `L1.C.1`: the definition is one framing among several | Fair. Say it is the course's working definition. |
| `U1.B.3`: the reset date is in the past | It is a worked example. Label it as an example from September 2026. |

## Plan, in priority order

1. Accuracy fixes above (`R.1`, `U1.K.1`, `L1.C.1`, `U1.B.3`).
2. Shared UI (`js/app.js`, `index.html`): page titles, focus on route change, `aria-current` in the nav, skip link, `noscript` note, live status for quiz and copy messages, previous and next links inside a section, scroll wrapper for tables.
3. Shared CSS (`css/site.css`): one font stack that is sans-serif on every platform, focus ring, larger tap targets, nav pills, table and code wrapping, a summary box style, stacked actions on a phone, print rules.
4. Expand `L1.C.5`: a second example, a limit, and a "Try it" with a worked answer for each technique, a comparison table, a summary, C blocks on breadth-first versus depth-first and on false positives and negatives, two more quiz questions.
5. Expand `L1.C.6`: a drawn park decision tree, a five-row regression table with simple arithmetic, examples and limits for supervised and unsupervised learning, a comparison table, a summary, an A block on overfitting, two more quiz questions.
6. Expand `L1.C.1`: scope note on the definition, the label diagram `curriculum/courses.md` asks for, everyday examples, how the words nest, what AI is not in this course, a C block on narrow versus general AI, a summary, a quiz.
7. Fill the eleven glossary stubs in `curriculum/glossary.tsv` and regenerate.
8. Bump `updated` in `curriculum/freshness.tsv` for each page whose text changed.

## Left for later

- Splitting `L1.C.5` and `L1.C.6` into substeps (`L1.C.5.1` and so on), as `curriculum/courses.md` plans after review.
- Writing `L1.C.3`, `L1.C.4`, and the exercise and discussion rows.
- Base-path-safe links. Every link is `/#/…`, which is right for a user site at the domain root. It would only matter if the site moved under a subpath.
- Making glossary tooltips work on tap without navigating.
- Removing the duplicated heading on item pages (the app's id heading and the fragment's title heading).
