# Doubly Linked List Design

Implement `DoublyLinkedList` from scratch using your own node class with `val` and `prev` and `next` pointers.

- `push_front(v)` and `push_back(v)` add a value at the front or back.
- `pop_front()` and `pop_back()` remove and return the value at the front or back, or return `-1` when the list is empty.
- `size()` returns the number of nodes.
- `contains(v)` returns whether some node holds `v`.

Java method names are camelCase, such as `pushFront` and `popBack`.
Every operation except `contains` must take O(1) time.
Construct one instance per test and run the operations in order; methods without a result produce null.

## Examples

### Example 1

```text
Input: ops = ["push_front", "push_front", "push_back", "contains", "contains", "size", "pop_front", "pop_back"], args = [[1], [2], [3], [2], [4], [], [], []]
Output: [null, null, null, true, false, 3, 2, 3]
```

### Example 2

```text
Input: ops = ["pop_front", "pop_back", "size"], args = [[], [], []]
Output: [-1, -1, 0]
```

## Constraints

- At most `10^5` nodes.
- `0 <= v <= 10^9`
