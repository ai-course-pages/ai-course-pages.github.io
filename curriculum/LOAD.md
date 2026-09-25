---
id: ARTI
title: Artificial Intelligence
status: unofficial-course-reference
effective: 2025-07-01
source: Swedish National Agency for Education, subject ARTI
agency_conformance: no
products: Khan Academy-style read/watch steps; freeCodeCamp-style do-steps
sep: tab
---

# Load

Attach only the files for the task. `map.md` is the join key for every task.

| Task | Effort | Files |
| --- | --- | --- |
| Course shell, ids, prerequisites | low | `map.md` |
| Level 1 lessons | low | `map.md` + `level1.md` |
| Level 2 lessons | low | `map.md` + `level2.md` |
| Rubric, quizzes, mastery copy | low | `map.md` + `grades.md` |
| About-page and pedagogy | medium | `map.md` + `aims.md` + the level file in play |
| Both levels, lesson-to-grade alignment, wording drift | high | `map.md` + `aims.md` + `level1.md` + `level2.md` + `grades.md` |
| A Swedish source string or an alias | any | `terms.tsv` for that lookup |

# Rules

- One content row is one course item. One grade row is one criterion.
- `concept` renders as a read or watch step. `exercise` renders as a step the learner does. `discuss` renders as a short written response.
- `exact`: teach that outcome. `at-least`: cover every listed item; more is allowed. `open`: use one example from the list, or one example of the same kind.
- `points` are source points. Pick the lesson count separately.
- Level rows are the required syllabus. Aim rows are course copy and pedagogy.
- Grade A, C, and E change the quality of performance. They do not change how hard the task is. Task scope is the level row.
- D is an overall judgment between E and C. B is an overall judgment between C and A. Neither has criterion text.
- Pass means every grade row is met at E.
- `deepens` names the earlier row this item extends. Leave that earlier row in place.
- On Level 2, use the same chosen field for `L2.C.1` and `L2.D.3`.

# Edits from draft.md

- Dropped the second copy of "Driving forces behind the development of AI."
- Replaced the three overlapping glossaries with `terms.tsv` (ambiguous pairs only).
- Split aims, levels, and grades so each effort loads a subset.
- Left grade-cell wording uneven where the draft was uneven. The drift line in `grades.md` lists those spots.
