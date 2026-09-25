# Artificial Intelligence course pages

Local course for [ai-course-pages/ai-course-pages.github.io](https://github.com/ai-course-pages/ai-course-pages.github.io). The public site will be `https://ai-course-pages.github.io/`.

This machine's `gh` login is `MarkusIsaksson1982`. Leave that login alone. Pushes to the course repo use a separate token.

## Credentials

Put the token in a file outside this repo:

`C:\Users\mjisa\.config\ai-course-pages\github.env`

```
GITHUB_TOKEN=github_pat_or_ghp_value
```

A fine-grained token is enough: resource owner `ai-course-pages`, only `ai-course-pages.github.io`, Contents read and write. A classic token needs the `repo` scope and must belong to a user who can push there. Do not paste the token into chat.

Agents that already inject an environment variable can set `AI_COURSE_GITHUB_TOKEN` instead. That variable wins over the file. It is separate from `GITHUB_TOKEN` and from the `gh` keyring, so the other account stays the default.

Check, then push:

```
powershell -File tools\course-github.ps1 -Action check
powershell -File tools\course-github.ps1 -Action push
```

`check` prints the login the token belongs to. It does not print the token.

In the new repo: Settings → Pages → branch `main`, folder `/ (root)`.

`.nojekyll` is present so Pages serves these files as plain static files.

## When another host is needed

GitHub Pages can serve this site. Progress is stored in the browser (`localStorage`), which is enough for one person dogfooding, skipping ahead, and dropping tries after a rewrite.

Add a free dynamic host (Vercel hobby, or similar) only when a lesson needs a server: running learner code that cannot run in the browser, or keeping tries somewhere other than this browser. Until then, do not add a second host. In-browser exercises stay on Pages.

## Dogfood loop

1. You run the section named in `iteration/CURRENT.md`.
2. You describe the run: what you could follow, what got in the way, and what seems reasonable to learn next. The page can copy that note. Save it under `iteration/log/`.
3. The next change is based on that note. It may be the next syllabus row, a later row, or a rewrite of a row you already tried.
4. A rewrite bumps `iteration` in `js/config.js` and sets the same number in `iteration/CURRENT.md`. Old tries remain visible and are labeled with the iteration they came from. They do not count as tries of the rewritten section.
5. Lesson HTML is added one file at a time in `content/{id}.html`, and that id is listed in `published` in `js/config.js`.
6. A quiz at the bottom of a page is a first-reading check. It can be clicked through without learning, so an iteration does not wait on it. Suggested exercises in the working chat are what the next change follows.
7. A page may sit in the middle of a strand. `curriculum/plan.md` records what a learner with little background would have met earlier. Those notes are not locks.

Syllabus source is `curriculum/`. Regenerate the outline data after editing it:

```
python tools/build_catalog.py
```

## Progress rules

- Every syllabus row is linked. `requires` is a label ("builds on L1"), not a lock.
- "Reset tried marks" clears the browser record. It does not change published lessons.
- Bumping `iteration` is how a content rewrite invalidates old tries without deleting them.

## Local preview

From this folder:

```
python -m http.server 8765
```

Open `http://127.0.0.1:8765/#/item/U1.E.1`. That is the page under test. The outline is the page without the hash. The quiz can be skipped when the page is already familiar.
