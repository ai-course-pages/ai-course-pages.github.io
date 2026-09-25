# Artificial Intelligence course pages

Local skeleton for an unofficial course. It is not wired to a GitHub account.

The existing account `MarkusIsaksson1982` already publishes `MarkusIsaksson1982.github.io`. Leave that account alone. This folder waits for a **new** GitHub account, then becomes that account's user site.

## Where it will appear

GitHub serves a user site only from a public repository named `{username}.github.io`, at `https://{username}.github.io/` (the host is lowercased). This folder can keep its local name. The **remote** repository must use the new username.

1. Create the new GitHub account.
2. Create a public repository named exactly `{username}.github.io`.
3. Set `githubUser` in `js/config.js` to that username.
4. This machine's `gh` login is the old account. Push with the new account's credentials so the remote is not created under `MarkusIsaksson1982`.
5. From this folder:

```
git remote add origin git@github.com:{username}/{username}.github.io.git
git push -u origin main
```

6. In the new repo: Settings → Pages → branch `main`, folder `/ (root)`.
7. Open `https://{username}.github.io/`.

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

Open `http://127.0.0.1:8765/`. The first thing to try is the outline itself.
