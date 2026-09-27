## Intuition

Anagrams have identical letter frequencies even when their letter order differs.
Use the 26 counts as a canonical signature and group words sharing that signature.
The signature describes the complete multiset of letters, so repeated letters remain distinguishable from single occurrences.

## Brute force

Compare each word against existing groups by repeatedly counting or sorting candidate members.
This can require quadratic work in the number of words.
Computing one reusable signature per word lets a hash map select the group directly.

## Approach

1. Use frequency signatures and a hash map named `groups`.
2. For each `word`, initialize 26 zero counts and increment the position for each lowercase letter.
3. Convert the counts to an immutable key.
4. Append the original word to the list associated with that key.
5. Return the lists of grouped words.

Two words receive equal signatures exactly when every letter count matches.
Appending the original occurrence, rather than putting words in a set, preserves duplicates required by the output contract.
No sorting of input words or group members is necessary.

## Walkthrough

Example 1 uses `["ab", "ba", "cd"]`.

| Word | Nonzero signature entries | Group after insertion |
| --- | --- | --- |
| `ab` | a:1, b:1 | `["ab"]` |
| `ba` | a:1, b:1 | `["ab", "ba"]` |
| `cd` | c:1, d:1 | `["cd"]` |

The second word reuses the first signature, while the third creates a new group.
Return `[["ab", "ba"], ["cd"]]` in these implementations' first-seen group order.
The judge permits other group and member orders too.

## Complexity

Let D be the total number of input characters and m the number of words.

- Time: O(D + m), under the fixed 26-letter alphabet and expected constant-time hash operations.
- Space: O(m), for fixed-size group signatures and lists of references to the original words.

## Edge cases

Empty strings share the all-zero signature.
Repeated identical words remain repeated in their group.
Words containing the same distinct letters but different multiplicities do not group together.
A single input word forms one group.

## Common mistakes

- Using a set of letters discards frequency information.
- Deduplicating group members loses input occurrences.
- Using a mutable count array as a Java map key compares array identity instead of contents.

## Language notes

Python converts counts into a hashable tuple.
Java converts the complete array to a delimited string with `Arrays.toString`, giving equal keys for equal count vectors.
Java uses `LinkedHashMap` to retain first-seen group order, matching Python's dictionary insertion order.
