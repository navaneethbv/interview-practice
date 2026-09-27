## Intuition

A building can see the ocean when every building to its right is shorter.
Scanning from the ocean side keeps the tallest height seen so far.
Whenever the current height exceeds that maximum, its index is visible.

## Brute force

A direct method could compare each building with every building to its right.
That takes O(n squared) time because each building may inspect nearly the whole suffix.
The right-to-left maximum scan shares those suffix comparisons and runs in linear time.

## Approach

1. Start with an empty list of visible indices and a tallest-to-right height of zero.
2. Visit buildings from the last index toward the first.
3. Record an index when its height exceeds the tallest height already seen.
4. Update the tallest height after recording a visible building.
5. Reverse the collected indices so the returned order matches the street order.

## Walkthrough

Example 1 has indexed heights [(3,1), (2,3), (1,2), (0,4)] when scanned from the ocean.
Index 3 is visible with tallest height 1, and index 2 is visible because height 3 exceeds 1.
Index 1 is hidden because height 2 does not exceed the right maximum 3.
Index 0 is visible because height 4 exceeds every height to its right.
The reverse scan collected [3,2,0], which becomes [0,2,3].

## Complexity

For n buildings, each height is inspected once, giving O(n) time.
The visible-index list can contain n entries, so output storage is O(n).
The scan uses O(1) scalar auxiliary state beyond that output.
The final reversal creates or rearranges O(n) result storage depending on language.

## Edge cases

The rightmost building is always visible under the positive-height constraints.
A strictly decreasing street makes every building visible.
Equal heights hide the building farther from the ocean because visibility requires strictly greater height.
A single building returns index zero.

## Common mistakes

- Scanning from the left compares against the wrong side of the ocean.
- Using greater-than-or-equal hides or admits equal-height buildings incorrectly.
- Forgetting to restore street order returns reversed indices.
- Returning heights rather than their original indices violates the contract.

## Language notes

Python reverses its collected list with slicing, which creates the returned list.
Java stores boxed indices while scanning and copies them into a primitive array in reverse order.
Both references keep the comparison strict.
