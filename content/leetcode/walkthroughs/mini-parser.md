## Intuition
A bracketed value is a stack of open NestedInteger lists, and a number belongs to the list currently at the stack top.
Closing a bracket pops one completed list and returns it when the outermost list closes.

## Brute force
Recursive parsing can mirror the grammar, but each nested call consumes stack space proportional to nesting depth.
The explicit stack keeps the same linear scan and handles deep input without language recursion limits.

## Approach
1. Return a single integer directly when the text does not start with `[`.
2. Push a new empty list for every opening bracket and attach nested lists to their parent.
3. Read signed integer tokens and append them to the current list.
4. Pop on `]` and return the popped value when the stack becomes empty.

## Walkthrough
Example 1 is `[-2,[5,[]],7]`.
The outer bracket pushes a list, `-2` is appended, and the inner bracket pushes a child list containing 5.
The empty nested bracket pushes and immediately pops another empty list, then the child bracket closes while the outer list remains on the stack.
The parser appends 7 to that outer list before the final outer bracket closes, producing `[-2,[5,[]],7]`.

## Complexity
Every character is consumed once, so parsing takes O(L) time, plus substring allocation for number tokens in Java.
The explicit stack and output structure use O(L) space in the worst case.

## Edge cases
A scalar such as `-40` bypasses bracket parsing.
Empty lists return a NestedInteger containing no values.
Negative numbers are recognized because the number reader starts at the minus sign and scans following digits.

## Common mistakes
Failing to attach a new list before pushing it loses nested structure.
Returning every closed list instead of only the outermost one breaks nested inputs.
Ignoring the minus sign turns negative values into malformed positive tokens.

## Language notes
Python returns the parsed object after its list stack empties.
Java extracts number scanning into a helper so the main parser remains readable and below the cognitive-complexity limit.
