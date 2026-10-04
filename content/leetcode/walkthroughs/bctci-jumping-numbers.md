## Intuition

Once a jumping number's final digit is known, only two next digits are possible: one smaller or one larger.
Generating these valid extensions avoids examining ordinary integers whose digit differences already violate the rule.

## Brute force

Check every integer below n by converting it to digits and testing adjacent differences.
That costs O(n log n) digit work even when relatively few integers qualify.

## Approach

Start recursive `grow` calls from first digits 1 through 9, excluding leading zeros.
If a candidate reaches n, stop that branch.
Otherwise append it to `found`, inspect its last digit, and recurse with each valid neighboring digit.
Every generated child preserves the jumping property.
Conversely, removing the final digit of any multidigit jumping number gives a jumping parent, so every valid number is generated exactly once.
Sort the collected numbers because depth-first generation is not numerical order.

## Walkthrough

For Example 1, n is 34.
Single digits 1 through 9 qualify.
The branch beginning with 1 additionally produces 10 and 12; three-digit extensions exceed the limit.
Starting with 2 produces 21 and 23, and starting with 3 produces 32.
The candidate 34 is excluded because the bound is strict.
Sorting gives `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 21, 23, 32]`.

## Complexity

With J qualifying numbers, generation takes O(J + 1) calls up to a constant factor and sorting takes O(J log J).
Storage is O(J + log n), including results and recursion depth.

## Edge cases

When n is one, there are no positive qualifying numbers.
A last digit zero has only successor one; nine has only successor eight.

## Common mistakes

Do not include zero, allow leading zeros, or return an unsorted depth-first list.

## Language notes

Python integers naturally hold generated candidates.
Java uses `long` inside `grow` before comparing against n and casts only accepted numbers into the result.
