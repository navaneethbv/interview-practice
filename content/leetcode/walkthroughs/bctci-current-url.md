## Intuition

Only the retained backward history matters because the action set has no forward operation.
A new visit appends a current page, and going back removes later pages from consideration.
A stack therefore matches the browser history required by this contract.

## Brute force

One could rebuild a copied history array after every action.
Repeated copying can take O(n²) time for n actions, while a stack changes only its end.

## Approach

Keep the visited URLs in `history`, with the current URL at its top.
For each `go`, push the supplied URL.
For each `back`, parse its count and remove at most `len(history) - 1` URLs.
The cap preserves the first URL even when the requested backward distance is larger than the available history.
Return the top after all actions.
The first action is guaranteed to be `go`, so the stack is nonempty whenever a current URL is required.

## Walkthrough

Example 1 first visits `google.com`, `wikipedia.com`, and `amazon.com`.
The request to go back four times removes only the last two pages, leaving `google.com`.
Visiting `youtube.com` and then `netflix.com` creates a retained history of those three URLs.
The final back action removes `netflix.com`.
The top is now `youtube.com`, which is returned.
Discarded earlier pages never reappear during subsequent visits.

## Complexity

Across all actions, every pushed URL is popped at most once.
Thus processing takes O(n) stack operations and O(n) space in the worst case, plus the cost of parsing count strings.

## Edge cases

A single visit returns that URL.
Repeated oversized back actions stay on the first page and do not empty the history.

## Common mistakes

Do not loop the full requested count after reaching the first page.
Do not retain a separate forward branch that later visits accidentally reuse.

## Language notes

Python uses a list and caps its pop loop with `min`.
Java uses `ArrayDeque` and `Integer.parseInt`; backward counts must fit Java's integer parser in the provided runner.
