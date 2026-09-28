/* Runtime site settings. Bump iteration when a rewrite should make older tries visible but not current. Keep the same number in iteration/CURRENT.md. */
window.SITE = {
  courseId: "ARTI",
  title: "Artificial Intelligence",
  githubUser: "ai-course-pages",
  iteration: 3,
  published: ["L1.C.1", "R.1", "R.2", "R.3", "R.3.1", "R.3.2", "R.3.3", "U1.0", "U1.E.1", "U1.B.1", "U1.B.2", "U1.B.3", "U1.S.1", "U1.S.2", "U1.S.3", "U1.K.1", "U1.K.2", "U1.9", "X.1", "X.2", "X.3"],
  host: "github-pages",
  /* Calendar dates, local to the browser. updatedDays: still "updated" when this many dates have passed, including 0 for today. newDays: same for "new". whileNew "both" keeps "new" and adds "updated" when the update date is later than the added date. */
  freshness: { updatedDays: 1, newDays: 7, whileNew: "both" }
};
