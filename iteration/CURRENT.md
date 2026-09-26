---
iteration: 3
under_test: U1.S.3
published: [L1.C.1, R.1, U1.0, U1.E.1, U1.B.1, U1.B.2, U1.B.3, U1.S.1, U1.S.2, U1.S.3, U1.K.1, U1.K.2, U1.9]
github: push at handoff, section leave, or a session whose new work is fit to publish
---

Iteration 3 revises U1.S.3 so compression or compaction is something the product does as the context window fills. U1.K.1 adds how to find a skill the product wrote. U1.K.2 starts from that skill. Tries from earlier iterations stay visible and do not count as tries of this text.

Run U1.S.3, then U1.K.1 and U1.K.2. The glossary is at `#/glossary`, and file types are `R.1`. Static HTML stays. See `curriculum/structure.md` for when generated pages and a server host would start.

When a session introduces words, extend `curriculum/glossary.tsv` once near the end, then run `python tools/lint_glossary.py`. A stub is enough until a later pass.
