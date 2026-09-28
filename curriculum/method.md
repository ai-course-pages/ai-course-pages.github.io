# Working method

Use this before adding a page. The same rule is taught, in learner language, on `R.2`.

The problem this rule is for, in one sentence: choose the data and the page form so a newcomer can repeat the idea, and so a later session can open the result and widen it.

## Data for a change

Three piles. Keep them distinct when a choice matters.

1. **What the person points at.** Files, passages, and outside material named in the prompt. That choice is the human selection.
2. **What the course already holds.** Lessons, tables, and plans in the repo, including the files those named docs point to. That material is read directly.
3. **What the assistant opens next.** That selection follows the person's instructions, the program's rules, and the settings in use. Outside material joins this pile only when the person asked for it.

## The page decision

Ask once per piece. A listing and the prose beside it are two pieces.

```
if the idea is not easy to say in one or two sentences:
    leave a stub
else if many items share one frame:
    keep the items in a table and draw the listing from the table
    if a second lesson would copy the same frame:
        generate those lesson bodies from the table
    else:
        write the lesson body as one static page
else:
    write one static page
```

The helper answers the first two questions. Lesson generation stays the inner branch, and it stays unused until a second lesson would copy a frame.

```
python tools/page_decision.py --easy yes --shared-frame no
python tools/page_decision.py --demo
```

## Applied in the session that added R.2

| Piece | Easy to say | Shared frame | Result | Where it went |
| --- | --- | --- | --- | --- |
| The methods explanation | yes | no | static | `content/R.2.html` |
| The reference listing | yes | yes | table | one row in `curriculum/reference.tsv` |
| A summary of the L1.C.4 uses | no | no | stub | a waiting list on `R.2` |
| The mainstream data, method, and problem-solving lessons | no | no | stub | still the plan in `curriculum/courses.md` |

`R.2` holds the three piles, this tree, and five problem-solving steps, because those three ideas can be said once. `L1.C.2`, `L1.C.6`, and `L1.X.1` remain the mainstream pages. When one of them is written, it teaches the subject for a learner's own case and links to `R.2` for this course's worked example.

A lesson opens that link in a new tab when `R.2` actually summarizes the subset the lesson is teaching:

```html
<a href="/#/item/R.2" target="_blank" rel="noopener">Methods and algorithms</a>
```

The uses in `L1.C.4` are not that subset yet. They stay on the waiting list until those pages exist.

## Applied when the language pages were added

| Piece | Easy to say | Shared frame | Result | Where it went |
| --- | --- | --- | --- | --- |
| The languages parent | yes | no | static in role, drawn with the children so the list cannot drift | `content/R.3.html` |
| HTML, JavaScript, and Python orientations | yes | yes | table, and the lesson bodies are generated because the frame repeats | `curriculum/languages.tsv` |

A lesson that only mentions a language keeps one sentence and opens `R.3.1`, `R.3.2`, or `R.3.3` in a new tab. `R.1`, `R.2`, and `U1.K.1` do that. The mini introduction itself stays on the language page: a first step, an outline of the rest, then Wikipedia and freeCodeCamp.
