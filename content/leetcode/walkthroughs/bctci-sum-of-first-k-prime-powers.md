## Intuition

Each prime generates an increasing stream: p, p squared, p cubed, and so on.
The combined sequence is a multiway merge of those streams.
A min-heap needs only the next unused power from each prime to identify the next global value.

## Brute force

Generate many powers from every prime, sort them together, and take the first k.
Choosing a safe generation limit wastes work and can construct powers far beyond the needed range.

## Approach

Initialize the heap with one `(value, prime)` entry for every supplied prime, beginning at its first positive power.
Repeat k times: remove the smallest value, add it to the running total modulo 1,000,000,007, and push the next power obtained by multiplying by its prime.
Distinct primes cannot have equal positive powers, so this contract needs no deduplication step.
Apply the modulo only to the accumulated sum, never to values used for ordering the heap.
Java skips a successor multiplication if it would overflow `long`; such a value exceeds every required value under the promised kth-element bound.

## Walkthrough

Example 1 starts with heap values 2 and 3.
Removing 2 exposes 4; removing 3 exposes 9; removing 4 exposes 8.
Continuing the merge yields 8, 9, 16, and 27 for the next four values.
The seven selected powers sum to `2 + 3 + 4 + 8 + 9 + 16 + 27 = 69`.
The result remains 69 after taking the modulus.

## Complexity

For p input primes, Python heapifies in O(p) and performs O(k log p) merge work.
Java inserts initial entries individually, giving O((p + k) log p) worst-case time.
Both keep O(p) heap entries and constant additional accumulation state.

## Edge cases

For k equal to zero, no powers are consumed and the answer is zero.
One prime produces its successive powers directly.

## Common mistakes

Do not include one, since only positive exponents are allowed.
Reducing heap values modulo the answer modulus destroys numerical ordering.

## Language notes

Python supports arbitrary-precision successor products.
Java checks `Long.MAX_VALUE / prime` before multiplication and returns the reduced total as an integer.
