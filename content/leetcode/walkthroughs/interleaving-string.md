## Intuition

An interleaving preserves the order inside s1 and inside s2.
At output position i + j, the next character must come from the next unused character of one of those strings.
Dynamic programming records whether each pair of consumed prefixes is reachable.

## Brute force

A recursive matcher branches whenever the next output character can come from either source, producing O(2^(m + n)) paths for source lengths m and n.
The dynamic program merges paths that consume the same pair of prefixes, reducing the work to O((m + 1) × (n + 1)).
## Approach

1. Reject immediately if the lengths of s1 and s2 do not sum to s3.
2. Let reachable[j] represent whether the current s1 prefix and the first j characters of s2 form the output prefix.
3. Initialize reachable[0] for two empty prefixes.
4. For every first_index and second_index, allow a transition from s1 or s2 when its next character matches s3.
5. Return the state for both complete strings.

The one-dimensional array is updated left to right.
Before writing reachable[second_index], it still represents the previous s1 row, while reachable[second_index - 1] is already the current row.

## Walkthrough

Example 1 uses s1 = ab, s2 = cd, and s3 = acbd.

| consumed from s1 | consumed from s2 | output prefix | decision |
| ---: | ---: | --- | --- |
| 1 | 0 | a | take a from s1 |
| 1 | 1 | ac | take c from s2 |
| 2 | 1 | acb | take b from s1 |
| 2 | 2 | acbd | take d from s2 |

The final state is true because every character matched while preserving both source orders.

## Complexity

Let m and n be the lengths of s1 and s2.
There are (m + 1)(n + 1) states with constant transition work, so time is O((m + 1) × (n + 1)), including initialization when either string is empty.
The rolling reachable array uses O(n) auxiliary space.

## Edge cases

An empty s1 or s2 reduces the check to the other string matching s3.
If lengths do not add up, no state processing is needed.
Repeated characters can create multiple valid paths to the same state.
The final state must consume both full strings.

## Common mistakes

- Taking a character from the middle of either source breaks its order.
- Using the just-updated current row for both transitions loses the previous-row state.
- Forgetting the length check permits indexing beyond s3.
- Returning any reachable prefix instead of the complete state accepts an incomplete interleaving.

## Language notes

Python uses reachable[second_index] for the rolling row.
Java mirrors the same array and reads characters with charAt.
Both compute the output index as first_index plus second_index minus one.
