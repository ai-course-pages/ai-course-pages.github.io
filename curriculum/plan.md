# Plan around the active element

The course is filled in around whatever page is active. Pages may land in the middle of a strand. A page lists what a learner with little background would have met earlier. Those earlier pages can be unwritten. They are notes, not locks.

## Active

| id | strand | place | what it teaches |
| --- | --- | --- | --- |
| U1.0 | using models | open | Section welcome, recap of the planned opening, assumed background for a standalone reader |
| U1.E.1 | using models | middle | Effort: low, medium, high, and Extra High, against reasoning tokens |
| U1.B.1 | using models | middle, after E.1 | One-off requests versus continuing a thread |
| U1.B.2 | using models | middle, after B.1 | Cap clocks (hours, next day, week, month), web chat versus coding CLI, free before paid high effort |
| U1.B.3 | using models | middle, after B.2 | Pace one window: spend down before reset, or about 1/7 per day and repair the rest |
| U1.S.1 | using models | middle, after B.3 | Turn caps, when to open a new CLI session, and which paths to pass across |
| U1.S.2 | using models | middle, after S.1 | Export a web thread into a seed prompt and/or a file. Open the next thread with See: and the file name |
| U1.9 | using models | close | Completion for this stage, practice on a real case, lead toward the subject strand or a pause |

The middle order stays: effort, one-off versus thread, clocks, pacing, CLI handoff, web seed. No further working pages are needed to make this section hold together at this stage.

## Preliminary course around this section

| place | section | status | what a reader meets |
| --- | --- | --- | --- |
| before U1 | course opening | not written | The long greeting. A model, a prompt, a reply. Input, hidden work, and the reply counted apart. A setting is not a new model. |
| this section | U1, using a model | in review | U1.0 through U1.9 |
| beside U1 | artificial intelligence subject | L1.C.1 drafted, rest syllabus only | What AI refers to. Not required before U1. |
| after U1 | a real case | not a separate section yet | U1.9 sends the reader to the subject strand, to a job of their own, or to a pause |

Each section uses the same frame. `{id}.0` is a welcome shorter than the course greeting: a recap for someone coming from earlier sections, and an "assumes at least" line for someone taking the section alone. `{id}.9` is a close: what this stage is enough for, practice on a real case, and permission to continue, to pick another section, or to wait. Middles keep their own ids.

When U1 is accepted as coherent, practice the S.1 handoff in a new CLI session. The filled prompt is `iteration/HANDOFF.md`. Coherence still gates a GitHub push.

Page generation, segment kinds, and when a server host is warranted are in `curriculum/structure.md`. Shared buttons and quizzes stay in `js/app.js`.

Do not push this repo to GitHub until one strand is a coherent run of several segments and a review says it is ready. Local pages can still be added.

## Earlier holes, for a learner with little background

Markus can skip a hole he already has.

| id | would teach | wanted before |
| --- | --- | --- |
| U0.1 | A model reads a prompt and writes a reply. | E.1, B.1 |
| U0.2 | A token is a chunk of text. Input, reasoning, and the reply are counted apart. | E.1, B.1 |
| U0.3 | Effort is a setting on a model, not a different model. | E.1 |

## Not built yet

| id | would add |
| --- | --- |
| U1.B.4 | A short, dated note for one product's current quotas, only when someone hits a real pause and pastes the message. |

## Subject outline

L1 and L2 are the artificial-intelligence subject. They are a separate strand. L1.C.1 is a draft definition page.

## How a page is shaped

- Prose carries the idea. Split a topic across pages when one page would have two jobs.
- A prompt the reader should forward is a `pre.prompt`. The page adds a Copy button.
- The bottom quiz has three or four choices. It is a first-reading check. An iteration does not wait on it.
- Suggested exercises are what the next change follows.
- If the reader already knows the page, they name what to learn or revisit.
