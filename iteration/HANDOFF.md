# Handoff

Paste the block below as the first message of a new session. Do not paste this chat.

```
Project folder: C:\Users\mjisa\dev\ai-course-pages
Live repo: https://github.com/ai-course-pages/ai-course-pages.github.io
Entry point: content/U1.0.html
Outline: index.html
Task artifact: curriculum/plan.md
Also read: curriculum/structure.md and iteration/CURRENT.md
Task: Continue the Artificial Intelligence course pages from the live main branch. U1 runs U1.0 welcome, U1.E.1 effort, U1.B.1 one-off versus thread, U1.B.2 caps, U1.B.3 pacing, U1.S.1 CLI handoff and folder scope, U1.S.2 web seed, U1.S.3 automatic compression or compaction, U1.K.1 packing a skill and finding one the product wrote, U1.K.2 whose skill to load, U1.9 close. The glossary is #/glossary from curriculum/glossary.tsv. File types are R.1. Tools and models is #/tools, with X.1 web chats (Grok, ChatGPT, Claude, Gemini), X.2 desktop apps (Grok Bot, ChatGPT, Claude, Google Antigravity), and X.3 CLIs (Grok Build, Codex, Claude Code, OpenCode). Do not build the specialized-tools page yet. Further models may join that page or get their own page. That choice is open. Outline marks read curriculum/freshness.tsv against the browser's local date. New lasts 7 days and updated lasts 1 day, set in js/config.js. A later edit during the new window shows both marks. The same-day first publish shows only new. Do not add a workshop, a lab, or an autotest runner. Static lesson HTML stays until a second section or real nesting makes generated pages worth the build. The glossary and the tools landing are the shared lists. GitHub Pages is the host. The repo README links each live page. Push main at a session handoff, when a section is coherent enough to leave, and when a finished Grok Build session's new work is fit to publish. Mid-draft work stays local. Vercel waits until a server is required. Shared UI lives in js/app.js and css/site.css. If this folder is missing, clone the live repo into it. The GitHub token is not in the clone. Pushes use C:\Users\mjisa\.config\ai-course-pages\github.env (GITHUB_TOKEN) or AI_COURSE_GITHUB_TOKEN, via tools/course-github.ps1. Do not invent a token and do not print one. This machine's gh login MarkusIsaksson1982 stays the default. Extend curriculum/glossary.tsv near the end of a session that introduces words, then run python tools/lint_glossary.py. curriculum/terms.tsv is the subject-language list, not the glossary.
Do not assume any chat history before this message. Read those paths first.
```

The block above is the whole start. A fresh clone has the pages and not the token file.
