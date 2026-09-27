## Intuition

When a value is popped, the minimum must revert to the minimum that existed before that value was pushed.
Store that history alongside every stack entry.
Each entry contains both its own value and the minimum of the stack prefix ending there.

## Brute force

Store ordinary values and scan them whenever `getMin()` is called.
That query takes O(n) time for n current entries and violates the constant-time requirement.
Caching a single global minimum without history does not solve the problem because popping it would still require a scan.

## Approach

1. Use an augmented stack whose entries contain a value and a prefix minimum.
2. On `push(val)`, compare val with the top entry's saved minimum, or use val itself when empty.
3. Push the pair containing val and the new minimum.
4. On `pop()`, remove the whole pair, automatically exposing the previous prefix minimum.
5. On `top()`, return the top pair's value.
6. On `getMin()`, return the top pair's saved minimum.

The invariant is established by the first push and preserved whenever a new pair summarizes the preceding prefix.
Popping does not invalidate earlier entries because their prefix contents have not changed.
No numeric sentinel or arithmetic encoding is needed.

## Walkthrough

Example 1 executes pushes of 3 and -1, two reads, a pop, and another minimum read.

| Operation | `stack` from bottom to top | Output |
| --- | --- | --- |
| `push(3)` | `[(3,3)]` | null |
| `push(-1)` | `[(3,3),(-1,-1)]` | null |
| `getMin()` | Unchanged | -1 |
| `top()` | Unchanged | -1 |
| `pop()` | `[(3,3)]` | null |
| `getMin()` | Unchanged | 3 |

The full output is `[null, null, -1, -1, null, 3]`.

## Complexity

- Time: O(1) for reads and removal, and amortized O(1) for push because the underlying dynamic storage can occasionally resize.
- Space: O(n), with one value/minimum pair per current stack entry.

## Edge cases

Repeated minimum values each store their own minimum snapshot, so popping one still leaves the other.
Negative values and signed integer extremes work without arithmetic overflow because the implementation only compares them.
The contract forbids reads and pops on an empty stack.

## Common mistakes

- Updating only one minimum variable loses the old value when popping.
- Storing a new minimum only for strict decreases mishandles duplicates unless counts are also tracked.
- Claiming worst-case constant-time dynamic-array insertion ignores occasional resizing.

## Language notes

Python stores tuples in a list; Java stores `Entry` records in an `ArrayDeque`.
Both implement the usual amortized constant-time stack contract.
For a strict worst-case push guarantee, a linked representation would avoid resizing, but that is not what these references use.
