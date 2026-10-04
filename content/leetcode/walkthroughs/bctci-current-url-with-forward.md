## Intuition

Forward navigation requires retaining pages after the current position.
Represent history as an array plus a cursor, and discard its forward suffix only when a new go action branches away from that history.

## Brute force

Moving pages between stacks one step at a time can waste time on very large navigation counts.
Arithmetic on a cursor jumps directly to the clamped destination.

## Approach

Maintain `pages` and zero-based `current`.
For back, subtract the requested steps and clamp to zero.
For forward, add the steps and clamp to the last stored position.
For go, advance current once, delete the existing suffix beginning there, and append the new URL.
The prefix through current remains valid back history, while the suffix after current is exactly the available forward history.
Return `pages[current]` after all actions.

## Walkthrough

```text
Input: actions = [["go", "google.com"], ["go", "wikipedia.com"], ["back", "1"], ["forward", "1"], ["back", "3"], ["go", "netflix.com"], ["forward", "3"]]
Output: "netflix.com"
```

Example 1 visits google and wikipedia, then goes back to google and forward to wikipedia.
Going back three steps clamps at google.
The new netflix visit deletes wikipedia from the forward branch and places netflix after google.
The final forward request cannot recover the deleted wikipedia visit or move beyond netflix.
The returned URL is `netflix.com`.

## Complexity

Navigation arithmetic takes O(1) per action.
Each appended page is deleted at most once, so suffix deletion costs O(n) over n actions.
Total time and history storage are O(n).

## Edge cases

Forward at the newest page and back at the oldest page are no-ops.
A go after back must clear every forward page.
Repeated URLs are still distinct visits.

## Common mistakes

Do not truncate history during back itself.
Do not retain old forward pages after appending a new branch.

## Language notes

Python deletes a list slice.
Java clears an ArrayList sublist and parses step counts as long before clamping, preventing large-step addition from overflowing the cursor calculation.
