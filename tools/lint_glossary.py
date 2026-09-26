"""Report glossary coverage in lesson HTML.

Fails when a dotted term names a missing entry, a link is mistyped, or the
file-type list and its entries disagree. Unmarked repeats are printed and do
not fail the run. Prompts and code are skipped.
"""
import re
import sys
from pathlib import Path

root = Path(__file__).resolve().parents[1]
glossary_path = root / "curriculum" / "glossary.tsv"
content = root / "content"

TERM_RE = re.compile(
    r'<a\s+class="term"\s+data-term="([^"]+)"\s+href="([^"]+)"\s+target="([^"]+)"\s+rel="([^"]+)"[^>]*>(.*?)</a>',
    re.I | re.S,
)
PRE_RE = re.compile(r"<pre\b[^>]*>.*?</pre>", re.I | re.S)
CODE_RE = re.compile(r"<code\b[^>]*>.*?</code>", re.I | re.S)


def load_rows():
    lines = glossary_path.read_text(encoding="utf-8").splitlines()
    header = lines[0].split("\t")
    rows = []
    for line in lines[1:]:
        if not line.strip():
            continue
        cells = line.split("\t")
        if len(cells) < len(header):
            cells += [""] * (len(header) - len(cells))
        rows.append(dict(zip(header, cells[: len(header)])))
    return rows


def parts(value):
    return [part.strip() for part in value.split(";") if part.strip()]


def phrase_pattern(phrase):
    escaped = re.escape(phrase)
    if re.fullmatch(r"[\w][\w ._-]*", phrase):
        return re.compile(r"\b" + escaped + r"\b", re.I)
    return re.compile(r"(?<![\w])" + escaped + r"(?![\w])", re.I)


def main():
    rows = load_rows()
    by_id = {row["id"]: row for row in rows}
    errors = []
    if len(by_id) != len(rows):
        errors.append("duplicate glossary id")

    phrases = []
    for row in rows:
        phrases.append((row["term"], row["id"]))
        for alias in parts(row.get("aliases", "")):
            phrases.append((alias, row["id"]))
    phrases.sort(key=lambda item: len(item[0]), reverse=True)

    file_type_ids = set()
    listed = parts(by_id.get("file-types", {}).get("also", ""))
    for row in rows:
        see = row.get("see", "").strip()
        if see and see not in by_id:
            errors.append(row["id"] + " see missing: " + see)
        for other in parts(row.get("also", "")):
            if other not in by_id:
                errors.append(row["id"] + " also missing: " + other)
        if see == "file-types":
            file_type_ids.add(row["id"])
            if row["id"] not in listed:
                errors.append("file-types also omits " + row["id"])
        if row.get("stub", "").strip().lower() not in ("yes", "no"):
            errors.append(row["id"] + " stub must be yes or no")
        if not row.get("brief", "").strip():
            errors.append(row["id"] + " needs a brief")

    for entry_id in listed:
        if entry_id not in by_id:
            errors.append("file-types also missing id " + entry_id)
        elif by_id[entry_id].get("see", "").strip() != "file-types":
            errors.append(entry_id + " is listed under file types but its see is not file-types")

    unmarked = {row["id"]: 0 for row in rows}
    marked = {row["id"]: 0 for row in rows}
    for path in sorted(content.glob("*.html")):
        text = path.read_text(encoding="utf-8")
        for match in TERM_RE.finditer(text):
            term_id, href, target, rel, _label = match.groups()
            if term_id not in by_id:
                errors.append(path.name + " unknown term " + term_id)
                continue
            marked[term_id] += 1
            if href != "/#/glossary/" + term_id:
                errors.append(path.name + " href for " + term_id + " is " + href)
            if target != "_blank" or rel != "noopener":
                errors.append(path.name + " " + term_id + " should open in a new tab")
        plain = TERM_RE.sub(" ", text)
        plain = PRE_RE.sub(" ", plain)
        plain = CODE_RE.sub(" ", plain)
        for phrase, term_id in phrases:
            pattern = phrase_pattern(phrase)
            found = pattern.findall(plain)
            unmarked[term_id] += len(found)
            plain = pattern.sub(" ", plain)

    stubs = [row["term"] for row in rows if row.get("stub", "").strip().lower() == "yes"]
    print("glossary: %s entries, %s stubs (%s)" % (len(rows), len(stubs), ", ".join(stubs)))
    print("marked introductions: %s" % sum(marked.values()))
    print("unmarked repeats in lesson prose, prompts and code skipped:")
    for row in sorted(rows, key=lambda item: (-unmarked[item["id"]], item["term"].lower())):
        if unmarked[row["id"]]:
            print("  %-22s unmarked %3s   marked %s" % (row["term"], unmarked[row["id"]], marked[row["id"]]))
    quiet = [row["term"] for row in rows if unmarked[row["id"]] == 0]
    if quiet:
        print("no unmarked prose: " + ", ".join(quiet))
    if errors:
        print("errors:")
        for error in errors:
            print("  " + error)
        return 1
    print("file-type links: ok")
    return 0


if __name__ == "__main__":
    sys.exit(main())
