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
    var lists = [CATALOG.items, CATALOG.active || []];
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
    var match = /^\/item\/([A-Za-z0-9.]+)$/.exec(hash);
    if (match) return { name: "item", id: match[1] };
    return { name: "home" };
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
    else renderHome();
  }

  function renderHome() {
    var progress = loadProgress();
    var lede = h("p", "lede", "Every item is open. Trying one does not unlock or block another. A rewrite bumps the iteration, and tries from older iterations stay on the row without counting as current.");
    var rule = h("p", "rule", "This section runs from the welcome, U1.0, through the close, U1.9. The working pages stay in the order effort, thread, caps, pacing, CLI handoff, web seed, compression, then two pages on skills. Prompts meant to forward have a Copy button. The quiz is a first-reading check. Skip it if you already know the page.");
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
    app.appendChild(h("h2", null, item.id));
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

  function rowFor(item, progress) {
    var status = statusOf(item.id, progress);
    var link = h("a", "row");
    link.href = "/#/item/" + item.id;
    var top = h("div", "row-top");
    top.appendChild(h("span", "id", item.id + " · " + item.track));
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
