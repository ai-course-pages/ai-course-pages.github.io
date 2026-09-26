# How the course is built

Static pages are the right host for this stage. One section, theory segments, copy-able prompts, and a small quiz on each page. Shared behavior already lives in `js/app.js` and `css/site.css`. A lesson file does not own the Copy button, the quiz checker, or the outline chrome.

## When generated pages start

Generate pages from data when any of these becomes true:

- A second section needs the same welcome, theory page, and close, and hand-copying HTML would let them drift.
- The outline grows nests: section, then block, then segment, then optional steps.
- A workshop or lab needs shared chrome (instructions, a code seed, a list of steps) that must change in one place.

Until then, keep writing `content/{id}.html` and listing the segment in `curriculum/active.tsv`. The outline script `tools/build_catalog.py` stays the only generator.

Push `main` when a session hands off, when a section is coherent enough to leave, or when the work finished in a Grok Build session is fit to be the live site. A half-written segment stays local.

The first generator can run at build time and still publish on GitHub Pages. It reads segment records and writes HTML. Quizzes and Copy buttons stay in `app.js`.

Vercel, or any other app host, waits until a feature needs a server. The likely one is checking a learner's command or code. Checking whether a prompt "worked" against a model is not that feature. A turn cap, an effort setting, and a usage story stay human-checked.

## Shape, beside a large public curriculum

A useful scale reference is six teaching sections plus a final examination of the whole curriculum. This course does not open six empty sections to match that count. A section is added when its topic is real.

Inside a section, a block can hold segments. A segment is the unit we edit. Optional steps under a segment come later, for a workshop. We do not start at that grain.

Kinds we can use, and what we use now:

| Kind | What it is | Now |
| --- | --- | --- |
| theory | Essay, with a short quiz at the bottom | U1 working pages |
| review | A reading summary of one block. No new task | Not separate. U1.9 names what this stage covers |
| quiz | A longer check, on the order of 10 or 20 questions, with no lesson around it | Not built. One per section, later, still in the browser |
| workshop | Steps that fill in a seed and could be checked | Not now |
| lab | A task with stories and described checks | Not now. Prompt practice stays a human exercise |
| certification | A larger task covering the section | Not now. U1.9's real-case practice is the stand-in |

CLI command composition is the sort of task that could be checked automatically later. Prompt practice is not.

New theory segments can be inserted without a new platform. A workshop step can be revised later by editing that step's record. Neither requires an autotest runner at this stage.

## Section frame

Every section uses `{id}.0` as a short welcome and `{id}.9` as a close. See `curriculum/plan.md` for where U1 sits among the planned opening and the artificial-intelligence subject.
