## Intuition

For each value in nums2, the first larger value to its right is determined when that larger value arrives.
A decreasing stack holds values whose answer is still unknown.
Popping smaller stack values assigns the current value as their next greater element.

## Brute force

For every nums1 value, scanning its position in nums2 and then searching right can take O(mn) time.
The monotonic stack computes every nums2 answer once and answers nums1 lookups afterward.

## Approach

1. Scan nums2 from left to right.
2. While the current value exceeds the stack top, pop that value and record the current value as its answer.
3. Push the current value onto the decreasing stack.
4. Values left in the stack have no greater value to their right and keep the default -1.
5. Build the result in nums1 order using the map.

## Walkthrough

Example 1 uses nums1 = [4,1,2] and nums2 = [1,3,4,2].

| current value | stack before | assignments |
| ---: | --- | --- |
| 1 | [] | none, push 1 |
| 3 | [1] | next[1] = 3, push 3 |
| 4 | [3] | next[3] = 4, next[1] already 3, push 4 |
| 2 | [4] | none, push 2 |
| lookup | [4,2] | 4 -> -1, 1 -> 3, 2 -> -1 |

The returned result is [-1,3,-1].

## Complexity

Let n be nums2 length and m be nums1 length.
Each nums2 value is pushed and popped at most once, so stack construction is O(n), and lookups add O(m) expected time.
The map, stack, and result use O(n + m) space.

## Edge cases

A value at the end of nums2 has no greater value.
A strictly equal value does not pop the stack.
The values are distinct under the statement contract, so each map key identifies one nums2 position.
A nums1 value can be answered even when it remains on the final stack by using -1.

## Common mistakes

- Popping on greater or equal changes the strict comparison.
- Scanning from the left without a stack can repeat work.
- Returning answers in nums2 order ignores nums1's requested order.
- Forgetting defaults leaves unresolved values absent from the result.

## Language notes

Python uses a list as a stack and a dictionary for next_values.
Java uses ArrayDeque and HashMap with the same monotonic invariant.
Both avoid sorting because the original right-to-left relationship matters.
