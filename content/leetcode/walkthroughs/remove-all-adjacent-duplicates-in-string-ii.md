## Intuition

A deletion can make two runs touch, so local decisions must preserve each run's current length.
A stack of `[character, count]` groups records the surviving prefix, and popping a group immediately exposes the previous group for future merges.

## Brute force

Repeatedly scanning for a removable group and rebuilding the string can take O(n^2) time.
Each deletion may force a fresh scan over nearly the whole remaining string.

## Approach

1. Read characters from left to right and extend the top stack group when the character matches.
2. Otherwise push a new group with count one.
3. Pop the group as soon as its count reaches k.
4. Expand the remaining groups into the final string.

## Walkthrough

For Example 1, `s = "deeedbbcccbdaa"` and `k = 3`, reading `d` then `eee` creates and removes the `eee` group.
The following `d` characters meet the earlier `d` group, and the same process records the neighboring runs.
When `ccc` reaches count 3 it is popped, exposing adjacent `b` groups that combine and can be removed.
The resulting exposed `d` groups also combine and disappear, leaving the two final `a` characters.
The returned string is `"aa"`.

## Complexity

Each input character is pushed into or increments one stack group once, so processing is O(n).
Building the final string copies the surviving characters, making total time O(n), with O(n) stack and output space.

## Edge cases

If no run reaches k, all groups are expanded unchanged.
A deletion can expose a new run across several earlier groups, which the stack handles automatically.
When k is larger than every possible run, no group is removed.

## Common mistakes

Do not delete only the original runs, because deletions can create new adjacent groups.
Keep counts per run instead of storing one count for the whole character.
Pop exactly when the count reaches k, since larger runs are removed in successive groups as they form.

## Language notes

Python stores mutable pairs in a list, while Java uses parallel character and count arrays as a stack.
Java's final `StringBuilder` expands each surviving run and avoids repeated string concatenation.
