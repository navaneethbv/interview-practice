## Intuition

An absolute Unix path is a sequence of directory decisions separated by slashes.
Empty components and single dots do nothing, while two dots cancel the most recent directory when one exists.
A stack models those decisions and naturally prevents moving above the root.

## Brute force

A repeated string-replacement approach could remove double slashes, dot components, and parent pairs in several passes.
Those passes can repeatedly copy the path and make the work difficult to reason about.
One left-to-right component scan handles every rule once and stores only active directories.

## Approach

1. Split the path at slash separators.
2. Ignore empty components and single-dot components.
3. Pop the last directory for two dots when the stack is nonempty.
4. Push every ordinary directory component.
5. Join the remaining stack after one leading slash.

## Walkthrough

Example 1 is /a//b/./c/.
Splitting yields empty, a, empty, b, two dots, c, and empty components.
The stack becomes [a], then [a, b].
The two dots pop b, and c is pushed, leaving [a, c].
Joining with one leading slash returns /a/c.

## Complexity

Let n be the path length and d be the number of stored directory characters.
Splitting and scanning take O(n) time, and joining the result takes O(d), so total time is O(n).
The component stack uses O(n) space in the worst case.
The returned canonical path also uses O(d) output space.

## Edge cases

Multiple slashes create empty components that do not add directories.
A dot does not change the stack.
A two-dot component at root is ignored because no directory can be removed.
A trailing slash disappears from the canonical result.

## Common mistakes

- Treating a two-dot component at root as a literal directory is invalid for absolute paths.
- Joining with the original separators can preserve duplicate slashes.
- Popping an empty stack raises an error for leading parent components.
- Forgetting a leading slash returns a relative path instead of the required absolute form.

## Language notes

Python split creates a list of components and join creates the canonical string.
Java uses an ArrayDeque and String.join, with no helper imports added to the reference.
Both versions treat any ordinary component as a directory name.
