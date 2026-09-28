(function () {
  var SITE = window.SITE;
  var CATALOG = window.CATALOG;
  var KEY = "arti-dogfood-v1";
  var app = document.getElementById("app");
  var iterationEl = document.getElementById("iteration");
  var hostEl = document.getElementById("host");

  iterationEl.textContent = "Iteration " + SITE.iteration;
  hostEl.textContent = hostLine();

  function hostLine() {
    var user = (SITE.githubUser || "").trim();
    if (!user) {
      return "New GitHub account not set. The live site will be https://USERNAME.github.io/ from a repository named USERNAME.github.io. Nothing is deployed yet.";
    }
    return "Pages target: https://" + user.toLowerCase() + ".github.io/ from repository " + user + ".github.io. Dynamic hosting is not connected.";
  }

  function loadProgress() {
    try {
      var raw = JSON.parse(localStorage.getItem(KEY) || "");
      if (!raw || typeof raw.visits !== "object" || raw.visits === null) return { visits: {} };
      return raw;
    } catch (err) {
      return { visits: {} };
    }
  }

  function saveProgress(progress) {
    localStorage.setItem(KEY, JSON.stringify(progress));
  }

  function visitOf(id, progress) {
    return progress.visits[id] || null;
  }

  function statusOf(id, progress) {
    var visit = visitOf(id, progress);
    if (!visit) return { kind: "new", label: "not tried" };
    if (visit.iteration !== SITE.iteration) {
      return {
        kind: "stale",
        label: "tried in iteration " + visit.iteration + "; current is " + SITE.iteration
      };
    }
    return { kind: "tried", label: "tried this iteration" };
  }

  function itemById(id) {
    var lists = [CATALOG.items, CATALOG.active || [], CATALOG.reference || [], CATALOG.tools || []];
    for (var n = 0; n < lists.length; n++) {
      for (var i = 0; i < lists[n].length; i++) {
        if (lists[n][i].id === id) return lists[n][i];
      }
    }
    return null;
  }

  function abilityText(ids) {
    return ids.split(";").map(function (id) {
      id = id.trim();
      for (var i = 0; i < CATALOG.abilities.length; i++) {
        if (CATALOG.abilities[i].id === id) return CATALOG.abilities[i].text;
      }
      return id;
    }).join(" ");
  }

  function isPublished(id) {
    return SITE.published.indexOf(id) !== -1;
  }

  function parseRoute() {
    var hash = location.hash.replace(/^#/, "");
    var glossary = /^\/glossary(?:\/([A-Za-z0-9-]+))?$/.exec(hash);
    if (glossary) return { name: "glossary", id: glossary[1] || "" };
    if (hash === "/tools") return { name: "tools", id: "" };
    var match = /^\/item\/([A-Za-z0-9.]+)$/.exec(hash);
    if (match) return { name: "item", id: match[1] };
    return { name: "home" };
  }

  function glossaryEntries() {
    return (window.GLOSSARY && GLOSSARY.entries) || [];
  }

  function glossaryById(id) {
    var list = glossaryEntries();
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return null;
  }

  function h(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function render() {
    app.textContent = "";
    var route = parseRoute();
    if (route.name === "item") renderItem(route.id);
    else if (route.name === "glossary") renderGlossary(route.id);
    else if (route.name === "tools") renderTools();
    else renderHome();
  }

  function renderHome() {
    var progress = loadProgress();
    var lede = h("p", "lede", "Every item is open. Trying one does not unlock or block another. A rewrite bumps the iteration, and tries from older iterations stay on the row without counting as current.");
    var rule = h("p", "rule", "This section runs from the welcome, U1.0, through the close, U1.9. The working pages stay in the order effort, thread, caps, pacing, CLI handoff, web seed, compression or compaction, then two pages on skills. A dotted underline is a glossary word. Prompts meant to forward have a Copy button. The quiz is a first-reading check. Skip it if you already know the page.");
    app.appendChild(lede);
    app.appendChild(rule);

    var actions = h("div", "actions");
    actions.appendChild(button("I looked through the outline", function () { markTried("outline"); }, "primary"));
    actions.appendChild(button("Copy experience note", function () { copyNote("outline"); }));
    actions.appendChild(button("Reset tried marks", resetProgress));
    app.appendChild(actions);
    var outlineStatus = statusOf("outline", progress);
    app.appendChild(h("p", "meta status " + outlineStatus.kind, "Outline: " + outlineStatus.label));

    if (CATALOG.active && CATALOG.active.length) {
      app.appendChild(h("h2", null, "Active"));
      app.appendChild(h("p", "meta", "These pages can sit in the middle of a strand. Earlier pages they depend on may not be written yet. Nothing here is locked."));
      var activeList = h("ol", "items");
      CATALOG.active.forEach(function (item) {
        activeList.appendChild(rowFor(item, progress));
      });
      app.appendChild(activeList);
    }

    renderReference();

    CATALOG.levels.forEach(function (level) {
      var title = level.title + " · " + level.points + " points · " + level.code;
      app.appendChild(h("h2", null, title));
      if (level.requires) {
        app.appendChild(h("p", "meta", "Builds on " + level.requires + ". You can open these items before finishing " + level.requires + "."));
      }
      var list = h("ol", "items");
      CATALOG.items.filter(function (item) { return item.level === level.id; }).forEach(function (item) {
        list.appendChild(rowFor(item, progress));
      });
      app.appendChild(list);
    });
  }

  function renderItem(id) {
    var item = itemById(id);
    var back = h("a", "back", "Back to the outline");
    back.href = "/#/";
    app.appendChild(back);
    if (!item) {
      app.appendChild(h("h2", null, "No item " + id));
      return;
    }
    var progress = loadProgress();
    var status = statusOf(item.id, progress);
    var heading = h("h2", null, item.id);
    var itemMarks = freshnessMarks(item.id);
    if (itemMarks) heading.appendChild(itemMarks);
    app.appendChild(heading);
    app.appendChild(h("p", "item-body", item.text));
    var metaBits = "Track: " + (item.track || "concept") + ".";
    if (item.place) metaBits += " Place: " + item.place + ".";
    if (item.bind) metaBits += " Bind: " + item.bind + ".";
    app.appendChild(h("p", "meta", metaBits));
    if (item.ability) app.appendChild(h("p", "meta", "Ability: " + abilityText(item.ability)));
    if (item.deepens) app.appendChild(h("p", "meta", "Extends: " + item.deepens + "."));
    app.appendChild(h("p", "meta status " + status.kind, status.label));

    var slot = h("div", "note");
    if (isPublished(item.id)) {
      slot.textContent = "Loading the lesson…";
      fetch("content/" + item.id + ".html").then(function (response) {
        if (!response.ok) throw new Error("missing");
        return response.text();
      }).then(function (html) {
        slot.innerHTML = html;
        bindTerms(slot);
        bindCopy(slot);
        bindQuiz(slot);
      }).catch(function () {
        slot.textContent = "This item is marked published, and content/" + item.id + ".html is missing.";
      });
    } else {
      slot.textContent = "No lesson body in this iteration. The line above is the syllabus item. Say what you want to try, including an item further down the list.";
    }
    app.appendChild(slot);

    var actions = h("div", "actions");
    actions.appendChild(button("I tried this", function () { markTried(item.id); }, "primary"));
    actions.appendChild(button("Copy experience note", function () { copyNote(item.id); }));
    actions.appendChild(button("Reset tried marks", resetProgress));
    app.appendChild(actions);
  }

  function daysPassed(iso) {
    if (!iso) return null;
    var parts = iso.split("-");
    if (parts.length !== 3) return null;
    var then = Date.UTC(+parts[0], +parts[1] - 1, +parts[2]) / 86400000;
    var now = new Date();
    var today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86400000;
    return today - then;
  }

  function freshnessOf(id) {
    var row = (CATALOG.freshness || {})[id];
    if (!row) return [];
    var limits = SITE.freshness || { updatedDays: 1, newDays: 7, whileNew: "both" };
    var sinceAdded = daysPassed(row.added);
    var sinceUpdated = daysPassed(row.updated);
    var marks = [];
    var isNew = sinceAdded !== null && sinceAdded >= 0 && sinceAdded <= limits.newDays;
    var isUpdated = sinceUpdated !== null && sinceUpdated >= 0 && sinceUpdated <= limits.updatedDays && row.updated !== row.added;
    if (isNew) marks.push("new");
    if (isUpdated && (limits.whileNew === "both" || !isNew)) marks.push("updated");
    return marks;
  }

  function freshnessMarks(id) {
    var kinds = freshnessOf(id);
    if (!kinds.length) return null;
    var wrap = h("span", "marks");
    kinds.forEach(function (kind) {
      wrap.appendChild(h("span", "mark " + kind, kind));
    });
    return wrap;
  }

  function renderReference() {
    app.appendChild(h("h2", null, "Reference"));
    app.appendChild(h("p", "meta", "The glossary is for the whole course and is expected to grow. A dotted underline on a lesson shows a short definition. The link opens that entry in a new tab. New means the listing is still inside its first 7 days. Updated means a later edit within 1 day. A page can show both."));
    var list = h("ol", "items");
    list.appendChild(refRow("/#/glossary", "glossary", "Glossary", "Words for the whole course. File types link to their own entries, and each of those links back."));
    list.appendChild(refRow("/#/tools", "tools", "Tools and models", "A section landing for web chats, desktop apps, and terminal CLIs. The three pages are tabulated there."));
    (CATALOG.reference || []).forEach(function (item) {
      list.appendChild(refRow("/#/item/" + item.id, item.id, item.id, item.text));
    });
    app.appendChild(list);
  }

  function refRow(href, freshId, idText, blurb) {
    var link = h("a", "row");
    link.href = href;
    var top = h("div", "row-top");
    var label = h("span", "id", idText);
    var marks = freshnessMarks(freshId);
    if (marks) label.appendChild(marks);
    top.appendChild(label);
    link.appendChild(top);
    link.appendChild(h("span", null, blurb));
    var li = h("li");
    li.appendChild(link);
    return li;
  }

  function renderTools() {
    var back = h("a", "back", "Back to the outline");
    back.href = "/#/";
    app.appendChild(back);
    var title = h("h2", null, "Tools and models");
    var marks = freshnessMarks("tools");
    if (marks) title.appendChild(marks);
    app.appendChild(title);
    var intro = h("p", null, "");
    intro.appendChild(document.createTextNode("This is a section landing for "));
    var harness = h("a", "term", "harnesses");
    harness.setAttribute("data-term", "harness");
    harness.href = "/#/glossary/harness";
    harness.target = "_blank";
    harness.rel = "noopener";
    intro.appendChild(harness);
    intro.appendChild(document.createTextNode(": the program you use to work with a model. It is not the course outline. The groups below are the three lists. Each row opens that page."));
    app.appendChild(intro);
    bindTerms(intro);
    var groups = [
      ["web", "Web models"],
      ["desktop", "Desktop UI"],
      ["cli", "CLI"]
    ];
    groups.forEach(function (group) {
      var rows = (CATALOG.tools || []).filter(function (item) { return item.group === group[0]; });
      if (!rows.length) return;
      app.appendChild(h("h3", null, group[1]));
      var list = h("ol", "items");
      rows.forEach(function (item) {
        list.appendChild(refRow("/#/item/" + item.id, item.id, item.id + " · " + item.title, item.text));
      });
      app.appendChild(list);
    });
    app.appendChild(h("h3", null, "Not decided yet"));
    app.appendChild(h("p", null, "A further page for more specialized tools is planned. Further models may become a part of that page, under other models and specialized tools, or they may get a page of their own. A collection page could split them again later. None of those pages exist yet."));
  }

  function renderGlossary(selectedId) {
    var back = h("a", "back", "Back to the outline");
    back.href = "/#/";
    app.appendChild(back);
    var glossTitle = h("h2", null, "Glossary");
    var glossMarks = freshnessMarks("glossary");
    if (glossMarks) glossTitle.appendChild(glossMarks);
    app.appendChild(glossTitle);
    var note = h("p", "rule", "This glossary is under ongoing development. This page in particular is expected to undergo noticeable revision and expansion. A short definition also appears when you point at a dotted word on a lesson. That link opens the entry in a new tab, so the lesson stays put.");
    app.appendChild(note);
    var entries = glossaryEntries();
    if (!entries.length) {
      app.appendChild(h("p", null, "The glossary data is missing. js/glossary.js is generated from curriculum/glossary.tsv."));
      return;
    }
    if (selectedId && !glossaryById(selectedId)) {
      app.appendChild(h("p", "meta", "No glossary entry " + selectedId + "."));
    }
    var groups = [
      ["using", "Using a model"],
      ["files", "File types"],
      ["languages", "Languages"],
      ["subject", "The subject"]
    ];
    var index = h("div", "glossary-index");
    groups.forEach(function (group) {
      var inGroup = entries.filter(function (entry) { return entry.group === group[0]; });
      inGroup.sort(function (a, b) { return a.term.localeCompare(b.term); });
      if (!inGroup.length) return;
      index.appendChild(h("h3", null, group[1]));
      var links = h("p", "meta");
      inGroup.forEach(function (entry, n) {
        if (n) links.appendChild(document.createTextNode(" · "));
        var link = h("a", null, entry.term);
        link.href = "/#/glossary/" + entry.id;
        links.appendChild(link);
      });
      index.appendChild(links);
    });
    app.appendChild(index);
    groups.forEach(function (group) {
      var inGroup = entries.filter(function (entry) { return entry.group === group[0]; });
      inGroup.sort(function (a, b) { return a.term.localeCompare(b.term); });
      if (!inGroup.length) return;
      app.appendChild(h("h2", null, group[1]));
      inGroup.forEach(function (entry) {
        app.appendChild(glossaryArticle(entry));
      });
    });
    if (selectedId) {
      var target = document.getElementById(selectedId);
      if (target && target.scrollIntoView) target.scrollIntoView();
    }
  }

  function glossaryArticle(entry) {
    var article = h("article", "glossary-entry");
    article.id = entry.id;
    var title = h("h3", null, entry.term);
    if (entry.stub) title.appendChild(h("span", "meta", " · stub"));
    article.appendChild(title);
    article.appendChild(h("p", null, entry.brief));
    if (entry.body) article.appendChild(h("p", null, entry.body));
    if (entry.stub) {
      article.appendChild(h("p", "stub-note", "This entry is intentionally a stub for now. A more encompassing definition is expected later."));
    }
    if (entry.see) {
      var parent = glossaryById(entry.see);
      var see = h("p", "meta");
      see.appendChild(document.createTextNode("Part of "));
      var seeLink = h("a", null, parent ? parent.term : entry.see);
      seeLink.href = "/#/glossary/" + entry.see;
      see.appendChild(seeLink);
      see.appendChild(document.createTextNode("."));
      article.appendChild(see);
    }
    if (entry.also && entry.also.length) {
      var also = h("p", "meta");
      also.appendChild(document.createTextNode(entry.id === "file-types" ? "File types in this list: " : "See also: "));
      entry.also.forEach(function (id, n) {
        if (n) also.appendChild(document.createTextNode(", "));
        var other = glossaryById(id);
        var link = h("a", null, other ? other.term : id);
        link.href = "/#/glossary/" + id;
        also.appendChild(link);
      });
      also.appendChild(document.createTextNode("."));
      article.appendChild(also);
    }
    if (entry.page) {
      var page = h("p", "meta");
      page.appendChild(document.createTextNode("Course page: "));
      var pageLink = h("a", null, entry.page);
      pageLink.href = "/#/item/" + entry.page;
      page.appendChild(pageLink);
      page.appendChild(document.createTextNode("."));
      article.appendChild(page);
    }
    return article;
  }

  function bindTerms(root) {
    var nodes = root.querySelectorAll("a.term[data-term]");
    Array.prototype.forEach.call(nodes, function (node) {
      if (node.querySelector(".tip")) return;
      var entry = glossaryById(node.getAttribute("data-term"));
      if (!entry) return;
      var tip = h("span", "tip", entry.brief + " Opens the glossary in a new tab.");
      node.appendChild(tip);
    });
  }

  function rowFor(item, progress) {
    var status = statusOf(item.id, progress);
    var link = h("a", "row");
    link.href = "/#/item/" + item.id;
    var top = h("div", "row-top");
    var label = h("span", "id", item.id + " · " + item.track);
    var marks = freshnessMarks(item.id);
    if (marks) label.appendChild(marks);
    top.appendChild(label);
    var badge = h("span", "status " + status.kind, isPublished(item.id) ? "lesson is up · " + status.label : status.label);
    top.appendChild(badge);
    link.appendChild(top);
    link.appendChild(h("span", null, item.text));
    var li = h("li");
    li.appendChild(link);
    return li;
  }

  var copyTimer = null;

  function markCopied(copy) {
    var all = document.querySelectorAll("button.copy");
    Array.prototype.forEach.call(all, function (btn) { btn.textContent = "Copy"; });
    copy.textContent = "Copied";
    if (copyTimer) clearTimeout(copyTimer);
    copyTimer = setTimeout(function () {
      if (copy.textContent === "Copied") copy.textContent = "Copy";
    }, 2000);
  }

  function bindCopy(slot) {
    var blocks = slot.querySelectorAll("pre.prompt");
    Array.prototype.forEach.call(blocks, function (pre) {
      var copy = button("Copy", function () {
        var text = pre.textContent.replace(/\s+$/, "");
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () { markCopied(copy); }, function () { selectPrompt(pre, copy); });
        } else {
          selectPrompt(pre, copy);
        }
      });
      copy.className = "copy";
      pre.parentNode.insertBefore(copy, pre);
    });
  }

  function selectPrompt(pre, copy) {
    var range = document.createRange();
    range.selectNodeContents(pre);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    try {
      document.execCommand("copy");
      markCopied(copy);
    } catch (err) {
      copy.textContent = "Select the prompt";
    }
  }

  function bindQuiz(slot) {
    var form = slot.querySelector("form.quiz");
    if (!form) return;
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var questions = form.querySelectorAll("fieldset");
      var correct = 0;
      Array.prototype.forEach.call(questions, function (question) {
        var chosen = question.querySelector("input:checked");
        var want = question.getAttribute("data-answer");
        var result = question.querySelector(".qresult");
        if (!result) {
          result = h("p", "qresult", "");
          question.appendChild(result);
        }
        if (chosen && chosen.value === want) {
          correct += 1;
          result.textContent = "Matches the page.";
        } else {
          var answer = question.querySelector('input[value="' + want + '"]');
          var label = answer ? answer.parentNode.textContent.trim() : want;
          result.textContent = "The page's answer is: " + label;
        }
      });
      var summary = form.querySelector(".quiz-score");
      if (!summary) {
        summary = h("p", "quiz-score", "");
        form.appendChild(summary);
      }
      summary.textContent = correct + " of " + questions.length + " match. The score locks nothing. If you already knew this, skip the quiz next time.";
    });
  }

  function button(label, onClick, className) {
    var node = h("button", className || "", label);
    node.type = "button";
    node.addEventListener("click", onClick);
    return node;
  }

  function markTried(id) {
    var progress = loadProgress();
    progress.visits[id] = { iteration: SITE.iteration, at: new Date().toISOString() };
    saveProgress(progress);
    render();
  }

  function resetProgress() {
    saveProgress({ visits: {} });
    render();
  }

  function copyNote(id) {
    var visit = visitOf(id, loadProgress());
    var text = [
      "section: " + id,
      "iteration: " + SITE.iteration,
      "tried_under_iteration: " + (visit ? visit.iteration : ""),
      "what I could follow:",
      "what got in the way:",
      "what seems reasonable to learn next:",
      "rewrite earlier sections:",
      ""
    ].join("\n");
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        flash("Experience note copied.");
      }, function () {
        flash(text);
      });
    } else {
      flash(text);
    }
  }

  function flash(message) {
    var node = h("p", "rule", message);
    app.appendChild(node);
  }

  window.addEventListener("hashchange", render);
  render();
})();
