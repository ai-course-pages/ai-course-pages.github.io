# Grade target

The whole site has one grade target: E, C, or A. It sits in the header, so it is on every page, and it is remembered in the browser. E is the default. The current writing cycle stays on E until ARTI1000X reads as one coherent set. C and A text is added where a page already has a real stretch beyond E. It is not invented to fill the higher targets.

The criteria for E, C, and A are the rows in `curriculum/grades.md`. D sits between E and C, and B sits between C and A. Those two letters are not buttons. They appear as the floor or the ceiling of a span.

## What the buttons do on a segment page

A segment of ARTI1000X or ARTI2000X is layered.

- Target E shows the E text.
- Target C shows the E text and any block marked C.
- Target A shows the E text, the C blocks, and any block marked A.

A block is a `div` with `class="grade-block"` and `data-grade="c"` or `data-grade="a"`. E text is the rest of the page.

When the target is C or A and the page has no text at that target, the page says so: only E-level content is currently available, and C- and A-level text is intended to be added later. When C text is present and A text is not, target A keeps the C text and says that A text is still to come.

## What the buttons do on the outline

Each listing has a floor and a ceiling, or it is reference only.

- Target E lists a floor of E or D. A span that starts at D and runs higher stays listed. A floor of C, B, or A is hidden.
- Target C lists a floor of E, D, C, or B.
- Target A lists every floor.
- Reference-only pages stay listed at every target.

The using-models pages are outside ARTI1000X and ARTI2000X, so their floors start at D or above. Reading them is already a target above a pure E pass. The tools pages are reference only: a deeper look at one product belongs on that maker's own site.

Spans are provisional. They move as the pages grow. The record is `curriculum/gradespan.tsv`. A syllabus row with no record is treated as layered E–E, which is the main-course default.

## Where a split already exists

`L1.C.2.3` keeps the park exercise at E. The paragraphs about choosing files for an assistant are C.

`L1.C.6` keeps the four methods at E. The course's own page-decision tree, the warning that a fitted line is not a promise about tomorrow, and the warning that careless labels are learned as carefully as careful ones, are C.

Other segment pages are E text with the fallback at C and A.

## Substeps for C and A

Separate outline rows such as a C continuation under `L1.C.2.1` are not added. The higher text belongs in the same page until it is long enough to be its own lesson. Placeholder pages for those continuations would crowd the outline before the E set is coherent.

## Glossary

The glossary follows the same three depths. E shows the short definition. C adds the fuller wording. A adds a more technical line where one is written, and otherwise says that the technical line is still to come. The dotted tip on a lesson stays the short definition, so a lesson page does not grow a paragraph under the pointer.
