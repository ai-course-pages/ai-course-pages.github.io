Lesson bodies land here one item at a time, as `content/{id}.html` (for example `content/L1.C.1.html`).

Add the id to `published` in `js/config.js` when that file should render. Leave it out and the item page shows only the syllabus line.

Fragments are HTML, not a full document. No locks: publishing a later id does not require an earlier id.

`R.3.html` and `R.3.1.html` through `R.3.3.html` are written by `tools/build_catalog.py` from `curriculum/languages.tsv`. Edit the table, then run the script.
