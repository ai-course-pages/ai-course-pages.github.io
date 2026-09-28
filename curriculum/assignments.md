# Assignment kinds

Internal reference for segment kinds. The syllabus tracks stay `concept`, `exercise`, and `discuss`. The kinds below say how a page is built. Names are working names. A later page can keep the name once a learner meets that kind of task.

The pages published so far are reading segments. U1 adds a short exercise inside the reading and a short quiz at the end. Labs, workshops, reviews of a whole nesting level, and examinations are planned here and are not built yet.

## Kinds

| Kind | What the learner does | Shape | Where it belongs |
| --- | --- | --- | --- |
| Reading | Reads an essay. May try one short exercise on that page. | Prose, then a quiz of three or four questions. The quiz is a first-reading check. | Default for an L1.C segment and for the U1 plugin. A `pre.prompt` is the short exercise when the reader should forward a prompt. |
| Clip | Watches a short clip, then does the same kind of short exercise and short quiz a reading page uses. | A script stub until the clip exists. The stub sits with the placeholder. | A point that is easier to see change over time than to read. Perception, motion, and a process with a visible order. |
| Picture | Reads a diagram, chart, or illustration inside a reading page or a clip page. | An inline SVG now. The `<desc>` is the alt text and is repeated in the caption. | A relationship, a layout, or a scene. Listed per page below. |
| Workshop | Completes a sequence. Each small step assumes the previous step is done. | One page, or a short run of pages, with the steps in order. Shared chrome for a seed and a step list waits until the first workshop is written. | A procedure with a real order. Planned for L1.X.4, basic training. The skill-bundle workshop stays a later plugin page. |
| Lab | Completes one assignment that contains its own briefing, work, and described check. | Larger than the short exercise on a reading page. The learner can start from that page alone. | One result the learner can point at. Planned as the small labs under L1.X.2. |
| Discuss | Writes a short response. | The syllabus track `discuss`. The product is a reasoned answer. | L1.D and L2.D. |
| Review | Rereads what a nesting level covered. | No new task. Id ends in `.9`. | A numbered parent that has substeps, and each letter block. |
| Examination | Answers a quiz scaled to that level, with no new teaching around it. | About 10 to 20 questions. Id ends in `.Q`. Still in the browser. | A letter block. A numbered parent only when that parent is large. |

A certification-sized task for a whole course stays the close of that course. U1.9 is that close for the plugin. `L1.9` is the matching close for ARTI1000X when the course has enough pages to summarize.

Checking a learner's command or code still waits on a server. Until then, a workshop or a lab describes the check in prose. Prompt practice stays a human exercise. No autotest runner is added for these kinds.

## How a nesting level ends

Two depths get a review:

- A letter block, such as `L1.C`, ends at `L1.C.9`.
- A numbered parent that has substeps, such as `L1.C.4`, ends at `L1.C.4.9`.

A flat syllabus row, such as `L1.C.1` or `L1.C.3`, does not get its own `.9`. The short quiz on the page is the check. The letter review includes that page.

Examinations:

| Examination | When it is warranted | Size to plan for |
| --- | --- | --- |
| `L1.C.Q` | The concept block has its pages. Write this examination before any smaller one. | About 16 questions. Relations across parents. |
| `L1.C.4.Q` | The four use-pages exist, and a four-question quiz would leave most uses unasked. | About 10 questions. |
| `L1.C.6.Q` | The four method-pages exist. | About 10 questions. |
| `L1.X.Q` | The exercise block has its pages. | About 12 questions. |
| `L1.D.Q` | The discuss block has its pages. | About 12 questions. |
| `L1.C.2` and `L1.C.5` | Summary only. The letter examination covers them. | |
| L2 letter examinations | The same rule, chosen when that block is being written. | 10 to 20, by how many distinct ideas the block holds. |

A page's three-question or four-question quiz stays a first-reading check. It is not the examination.

## Pictures and clips

Lesson HTML can include an SVG directly. The course site does not load a chart library. Curriculum notes on GitHub can use a mermaid block, as `courses.md` does for the course map. A chart inside a lesson is an SVG until a designed picture replaces it. `R.2` carries the first live chart: the page-or-table decision tree.

Pattern for a lesson, when that lesson is written:

```html
<figure>
  <svg role="img">…</svg>
  <figcaption>The caption repeats the description in the SVG desc element.</figcaption>
</figure>
```

A clip placeholder is a short script beside the page id. It names what is on screen, the spoken point, and the short check that would sit under the clip. The clip is not recorded in this pass.

### Sample picture

`curriculum/figures/L1.C.4.3.svg` is the placeholder for computer vision.

Alt text: a wide outdoor scene with a horizon, a walking figure, a bicycle, and a marked region around the figure. The marked region is the part a vision system is treating as the object. The bicycle stays in the scene outside that region. The drawing stands in until an illustration is made.

### Sample clip stub

Page: `L1.C.4.3`, with the still above.

Why a clip: the point is what the system keeps treating as the object while the scene changes.

On screen: a street corner. A person walks past a parked bicycle. A box appears around the person and follows the person. The bicycle stays in the frame and stays outside the box.

Spoken point: the system has selected one region and is treating that region as the object. Recognition, on the technique page, is the further step of assigning that region to a category such as a person.

Check under the clip:

1. The marked region follows which thing? The person the system is treating as the object.
2. The bicycle remaining outside the box shows which idea? A scene can contain things the system is not treating as the object.

### Planned pictures for the concept block

Alt text is the description to keep with the placeholder when the page is written. One SVG file exists so far, for `L1.C.4.3`. The others are specified here until that page is the one being written.

| Page | Picture | Alt text to carry |
| --- | --- | --- |
| L1.C.1 | Labels around the definition | The definition sits in the middle. Data, application, technique, algorithm, and machine learning sit around it as the labels later pages take up. Human intelligence is named inside the definition. |
| L1.C.2.2 | Fit and unfit | Two columns. One column holds examples of data that can serve the stated use. The other holds examples that are missing, mismatched, or too noisy for that use. |
| L1.C.2.3 | Selection | A larger pool of available data, a smaller chosen subset, and a note that the result follows the subset. |
| L1.C.3 | Forces | A few labeled forces feeding one arrow toward wider development and use. |
| L1.C.4.1 | Prediction | Earlier points along a line, and one further point marked as the value the system offers next. |
| L1.C.4.2 | Robotics | Three boxes in order: sense, decide, act. |
| L1.C.4.3 | Scene with a marked region | The sample SVG. A clip stub is also planned for this page. |
| L1.C.4.4 | Generative turn | Three boxes: the prompt, the hidden work, the reply. The caption says a setting on that process is still the same model. The plugin teaches how hard the model should think and how a long thread is handled. |
| L1.C.5.1 | Search | A small graph of nodes, with one path marked from a start node to a goal node. |
| L1.C.5.2 | Classification | Several items moved into labeled groups. |
| L1.C.5.3 | Object recognition | The vision still, plus a category name attached to the marked region. |
| L1.C.6.1 | Decision tree | A few yes-or-no questions leading to outcomes. |
| L1.C.6.2 | Regression | Scattered points and one line standing for the relationship the method fits. |
| L1.C.6.3 and L1.C.6.4 | Supervised and unsupervised | Two panels. The supervised panel shows examples that already have labels. The unsupervised panel shows a pile with groups found from the examples themselves. |

Robotics can gain a clip later, for sense then act. The diagram is enough for the first version of `L1.C.4.2`. Search, classification, trees, and regression are charts. A clip would add little once the chart is on the page.
