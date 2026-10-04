## Intuition

Without forward navigation, going back permanently removes the more recent pages from the useful history.
A stack therefore represents exactly the pages still available, with the current URL on top.

## Brute force

Searching earlier actions to reconstruct history after every back operation repeatedly processes the same navigation events.
Maintaining history as actions arrive avoids that reconstruction.

## Approach

For each go action, append its URL to `history`.
For a back action, remove at most the requested number of pages while keeping at least one page.
Return the final stack top.
The first action is guaranteed to be go, so the stack is nonempty whenever navigation or the final lookup needs it.
Each retained stack entry represents a visit rather than a unique URL; revisiting the same address still adds a new history position.

## Walkthrough

```text
Input: actions = [["go", "google.com"], ["go", "wikipedia.com"], ["go", "amazon.com"], ["back", "4"], ["go", "youtube.com"], ["go", "netflix.com"], ["back", "1"]]
Output: "youtube.com"
```

Example 1 first builds google, wikipedia, amazon.
Going back four steps can remove only amazon and wikipedia, leaving google.
Visiting youtube and netflix produces google, youtube, netflix.
The final back operation removes netflix and exposes youtube.
The result is therefore `youtube.com`.

## Complexity

For n actions, total stack pushes and pops are O(n), because a pushed page can be popped only once.
Thus total time is O(n), ignoring the bounded cost of parsing step strings.
History uses O(n) space in the worst case.

## Edge cases

Going back from the first page leaves it unchanged.
A requested count larger than the history depth is clamped.
Consecutive visits to the same URL remain separate entries.

## Common mistakes

Do not pop the final page.
Do not deduplicate history URLs or interpret the back count as an absolute index.

## Language notes

Python uses a list and explicitly clamps the pop loop.
Java uses an ArrayDeque and stops when one page remains; its reference parses counts with `Integer.parseInt`.
