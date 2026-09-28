"""Choose stub, table, or static for one course piece.

The learner page is content/R.2.html. The working card is curriculum/method.md.
Ask once per piece. A repeated listing and its explanation are two pieces.

  python tools/page_decision.py --easy yes --shared-frame no
  python tools/page_decision.py --demo
"""
import argparse
import sys


def choose(easy_to_say, many_share_a_frame):
    if not easy_to_say:
        return "stub"
    if many_share_a_frame:
        return "table"
    return "static"


REASONS = {
    "stub": "Leave a stub. The idea is not yet easy to say in one or two sentences.",
    "table": "Keep the items in a table and draw the listing from it. Write the lesson body as a static page until a second lesson would copy the same frame.",
    "static": "Write one static page.",
}


def parse_yes_no(value):
    text = value.strip().lower()
    if text in ("yes", "y", "true", "1"):
        return True
    if text in ("no", "n", "false", "0"):
        return False
    raise argparse.ArgumentTypeError("use yes or no")


def report(easy_to_say, many_share_a_frame):
    result = choose(easy_to_say, many_share_a_frame)
    return result, REASONS[result]


DEMO = (
    (True, False, "static"),
    (True, True, "table"),
    (False, False, "stub"),
    (False, True, "stub"),
)


def main(argv):
    parser = argparse.ArgumentParser(description="Decide stub, table, or static for one course piece.")
    parser.add_argument("--easy", type=parse_yes_no, help="yes if a newcomer could repeat the idea in one or two sentences")
    parser.add_argument("--shared-frame", type=parse_yes_no, help="yes if many items share this same frame")
    parser.add_argument("--demo", action="store_true", help="check the four worked answers and print them")
    args = parser.parse_args(argv)
    if args.demo:
        failed = False
        for easy, shared, expected in DEMO:
            got, reason = report(easy, shared)
            line = "easy=%s shared-frame=%s -> %s" % ("yes" if easy else "no", "yes" if shared else "no", got)
            print(line)
            print(reason)
            if got != expected:
                failed = True
                print("expected " + expected)
        return 1 if failed else 0
    if args.easy is None or args.shared_frame is None:
        parser.error("give --easy and --shared-frame, or pass --demo")
    result, reason = report(args.easy, args.shared_frame)
    print(result)
    print(reason)
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
