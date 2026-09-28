# How the course is built

Static pages are the right host for this stage. One section, theory segments, copy-able prompts, and a small quiz on each page. Shared behavior already lives in `js/app.js` and `css/site.css`. A lesson file does not own the Copy button, the quiz checker, or the outline chrome.

## When generated pages start

Generate pages from data when any of these becomes true:

- A second section needs the same welcome, theory page, and close, and hand-copying HTML would let them drift.
- The outline grows nests: section, then block, then segment, then optional steps.
- A workshop or lab needs shared chrome (instructions, a code seed, a list of steps) that must change in one place.

Until then, keep writing `content/{id}.html` and listing the segment in `curriculum/active.tsv`. The choice for a new piece is the tree in `curriculum/method.md` and on `R.2`: a repeated listing is drawn from a table now, and a lesson body stays hand-written until a second lesson would copy the same frame. The outline script `tools/build_catalog.py` stays the only generator. It also writes `js/glossary.js` from `curriculum/glossary.tsv`. That table is the learner glossary. `curriculum/terms.tsv` is the subject-language list and is not the glossary. Lesson HTML stays hand-written.

Push `main` when a session hands off, when a section is coherent enough to leave, or when the work finished in a Grok Build session is fit to be the live site. A half-written segment stays local.

The first generator can run at build time and still publish on GitHub Pages. It reads segment records and writes HTML. Quizzes and Copy buttons stay in `app.js`.

Vercel, or any other app host, waits until a feature needs a server. The likely one is checking a learner's command or code. Checking whether a prompt "worked" against a model is not that feature. A turn cap, an effort setting, and a usage story stay human-checked.

## Glossary

The glossary page is shared, so one table feeds the page and the dotted words on lessons. Mark a word where a page is teaching it:

```html
<a class="term" data-term="yaml" href="/#/glossary/yaml" target="_blank" rel="noopener">YAML</a>
```

The short definition is the `brief` column. The link opens that entry in a new tab. Repeats of a word on the same page can stay plain. `python tools/lint_glossary.py` lists those repeats, and it fails if a mark names a missing entry or if the file-type list and its entries disagree.

Extend the glossary near the end of a session that introduced words, where one pass is cheaper than defining each word in the middle of the edit. A session can also be asked to do that pass at the close. A thin entry is a stub: `stub` is `yes`, and the page says a fuller definition is expected later. File types are the group that links both ways. The entry `file-types` lists Markdown, JSON, YAML, and the others. Each of those lists `file-types` as what it is part of. The course page for the group is `R.1`. Lesson pages stay hand-written. Generating them from data waits for a second section, real nesting, or a workshop.

## Freshness marks

`curriculum/freshness.tsv` stores `added` and `updated` as calendar dates. The outline compares them with the browser's local date. `js/config.js` holds `updatedDays` (1) and `newDays` (7). A listing is new while that many dates have passed, counting today as 0. It is updated when the update date is later than the added date and still inside the update window. While both are true, the row shows both marks. The same-day first publish shows only new. Change the two numbers in config to retune the windows. Record a new date in the tsv when a page's text changes, or when a listing is added.

## Shape, beside a large public curriculum

A useful scale reference is six teaching sections plus a final examination of the whole curriculum. This course does not open six empty sections to match that count. A section is added when its topic is real.

Inside a section, a block can hold segments. A segment is the unit we edit. `curriculum/courses.md` plans substeps under some L1.C rows. Those child ids stay in that file until a session is writing the child. A workshop's smaller steps wait until that workshop is the page being written.

Kinds are specified in `curriculum/assignments.md`. Short form:

| Kind | What it is | Now |
| --- | --- | --- |
| reading | Essay, with a short exercise possible and a short quiz at the bottom | U1 working pages, and L1.C.1 |
| clip | A short video with the same kind of exercise and quiz | Script stubs only. First stub is for L1.C.4.3 |
| picture | An illustration or chart inside a page | One SVG placeholder, `curriculum/figures/L1.C.4.3.svg`. Further alt text is in `assignments.md` |
| review | A summary of one nesting level. No new task | Planned as `.9` on a letter block and on a numbered parent that has substeps |
| examination | A check of about 10 to 20 questions, scaled to that level | Planned as `.Q`. Not built |
| workshop | A practical sequence. Each small step follows the previous one | Not built. Planned first for L1.X.4 |
| lab | One self-contained practical assignment, larger than the short exercise on a reading page | Not built. Planned as the small labs under L1.X.2 |
| discuss | A short written response | The syllabus track for L1.D and L2.D. Pages not built |
| course close | What the stage is enough for, plus a real case or a next course | U1.9 for the plugin. L1.9 waits |

CLI command composition is the sort of task that could be checked automatically later. Prompt practice is not.

New reading segments can be inserted without a new platform. A workshop step can be revised later by editing that step's record. Neither requires an autotest runner at this stage.

## Section frame

A course or a plugin uses `{id}.0` as a short welcome and `{id}.9` as a close: what this stage is enough for, practice on a real case, and permission to continue, to pick another section, or to wait. A letter block, and a numbered parent that has substeps, uses `.9` as a review of that level and `.Q` as a later examination. Roles are in `curriculum/courses.md`. Kinds are in `curriculum/assignments.md`.
