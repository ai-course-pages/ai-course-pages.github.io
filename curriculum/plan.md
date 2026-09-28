# Plan around the active element

The course is filled in around whatever page is active. Pages may land in the middle of a strand. A page lists what a learner with little background would have met earlier. Those earlier pages can be unwritten. They are notes, not locks.

ARTI1000X and ARTI2000X are the two main courses. The Active pages are the first optional plugin, using a model. Reference is shared by both courses and by the plugin. The fit, the L1.C substeps, and the authoring start are in `curriculum/courses.md`. Segment kinds, summaries, examinations, and picture and clip placeholders are in `curriculum/assignments.md`. Tools-page continuation stays paused.

## Active

| id | strand | place | what it teaches |
| --- | --- | --- | --- |
| U1.0 | using models | open | Section welcome, recap of the planned opening, assumed background for a standalone reader |
| U1.E.1 | using models | middle | Effort: low, medium, high, and Extra High, against reasoning tokens |
| U1.B.1 | using models | middle, after E.1 | One-off requests versus continuing a thread |
| U1.B.2 | using models | middle, after B.1 | Cap clocks (hours, next day, week, month), web chat versus coding CLI, free before paid high effort |
| U1.B.3 | using models | middle, after B.2 | Pace one window: spend down before reset, or about 1/7 per day and repair the rest |
| U1.S.1 | using models | middle, after B.3 | Turn caps, when to open a new CLI session, which folder that session may use, and which paths to pass across |
| U1.S.2 | using models | middle, after S.1 | Export a web thread into a seed prompt and/or a file. Open the next thread with See: and the file name |
| U1.S.3 | using models | middle, after S.2 | The product compresses or compacts a thread you are staying in as the context window fills. Watch for that line, then ask what context remains |
| U1.K.1 | using models | middle, after S.3 | Pack a repeated procedure as SKILL.md. Say when it applies. Keep standing rules short. An internal skill may be reached from a product screen, by asking, or from a folder the product names |
| U1.K.2 | using models | middle, after K.1 | Once that internal skill is in view: a few external ones, not a second copy of the same job. A dual setup spends twice and can disagree |
| U1.9 | using models | close | Completion for this stage, practice on a real case, lead toward the subject strand or a pause |

The middle order stays: effort, one-off versus thread, clocks, pacing, CLI handoff, web seed, compression, packing a skill, then whose skill to load. Folder grants stay on S.1. They are the scope of a CLI session, not a desktop permission tour.

## Preliminary course around this section

| place | section | status | what a reader meets |
| --- | --- | --- | --- |
| main course | ARTI1000X | L1.C.1 drafted, rest planned in `courses.md` | The subject, written forward from L1.C.1. Stands on its own. |
| main course | ARTI2000X | syllabus only | Recommended after ARTI1000X. Open before that course is finished. Each page will restate what it assumes. |
| plugin | U1, using a model | in review | Optional sidequest. A fitting point is after L1.C.4, or after ARTI1000X. Also open beside either course. |
| reference | glossary, R.1, tools | published | Valid for both main courses and for the plugin. |
| folded in | U0.1, U0.2, U0.3 | not a separate course | Mainstream sentences on L1.C.4.4. Operational pages stay U1.E.1 and U1.B.1. |

Each course and each plugin uses the same frame. `{id}.0` is a welcome shorter than the course greeting: a recap for someone coming from earlier sections, and an "assumes at least" line for someone taking the section alone. `{id}.9` is a close: what this stage is enough for, practice on a real case, and permission to continue, to pick another section, or to wait. A letter block and a numbered parent that has substeps use `.9` as a review of that level. Middles keep their own ids.

When U1 is accepted as coherent, practice the S.1 handoff in a new CLI session. The filled prompt is `iteration/HANDOFF.md`.

Push `main` live at a handoff to a new session, and when a section is coherent enough to leave. At the end of a Grok Build session, decide whether the new work is fit to publish. Mid-draft work stays local.

Page generation, segment kinds, and when a server host is warranted are in `curriculum/structure.md`. Shared buttons and quizzes stay in `js/app.js`.

U1 is that coherent run, and it is already on `main`. A later page can still be drafted locally. It goes live with the next handoff, when its section is coherent enough to leave, or when the session that finished it decides the work is fit to publish.

## Earlier holes, for a learner with little background

These three stay inside the plugin as operational pages. The mainstream sentences are planned on `L1.C.4.4`. A separate opening course is not added. Markus can skip a hole he already has.

| id | would teach | wanted before |
| --- | --- | --- |
| U0.1 | A model reads a prompt and writes a reply. | E.1, B.1 |
| U0.2 | A token is a chunk of text. Input, reasoning, and the reply are counted apart. | E.1, B.1 |
| U0.3 | Effort is a setting on a model, not a different model. | E.1 |

## Not built yet

| id | would add |
| --- | --- |
| U1.B.4 | A short, dated note for one product's current quotas, only when someone hits a real pause and pastes the message. |
| later | A dated comparison of which products share one skill-file standard. K.2 states the direction and stops. |
| later | A page for folder prompts in a desktop app. S.1 covers the CLI grant. |
| later | A workshop that assembles a skill bundle. K.1 names companions, frontmatter, scripts, and zip packing, and stops. |
| later | A page for more specialized AI tools. Further models may be a subsection of that page (other models, specialized tools, and a possible later split) or a page of their own. The tools landing names the choice and does not build it. |

## Subject outline

L1 is ARTI1000X and L2 is ARTI2000X. They are the two main courses. L1.C.1 is the draft definition page and the place the next subject writing starts. Substeps, the plugin relationship, and the ARTI2000X assumptions are in `curriculum/courses.md`.

## How a page is shaped

- Prose carries the idea. Split a topic across pages when one page would have two jobs.
- A prompt the reader should forward is a `pre.prompt`. The page adds a Copy button.
- The bottom quiz has three or four choices. It is a first-reading check. An iteration does not wait on it.
- Suggested exercises are what the next change follows.
- If the reader already knows the page, they name what to learn or revisit.
- A glossary-worthy word, where the page is teaching it, is a dotted link to `curriculum/glossary.tsv`. The check is `python tools/lint_glossary.py`. Add or stub new entries near the end of a session that introduced them. See `curriculum/structure.md`.
