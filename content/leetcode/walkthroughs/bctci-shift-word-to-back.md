## Intuition

The letters selected for the earliest subsequence are already known in order: they spell `word`.
Rather than storing those removed letters, compact every unselected letter toward the front and append `word` afterward.
This preserves both required relative orders with constant working storage.

## Brute force

Repeatedly locate the next matched letter, remove it by shifting the remaining array, and save it for the end.
Repeated shifts can take O(n times m) time for word length m.

## Approach

Maintain `matched`, the next word position to find, and `write`, the next destination for an unselected letter.
Scan the original array using `read`.
If the current letter matches the next required word letter, increment matched and omit that occurrence from compaction.
Otherwise write the current letter at `arr[write]` and advance write.
Because write never exceeds read, this cannot overwrite unread input.
After the scan, copy word into the remaining suffix.
The guaranteed subsequence means exactly its length of positions were omitted, so that suffix fits precisely.

## Walkthrough

Example 1 starts with `[b, a, c, b]` and word `ab`.
The first b is retained because the next required letter is a.
The a is matched and skipped, then c is compacted into the next retained position.
The final b completes the matched subsequence and is skipped.
The retained prefix is now `[b, c]`; appending a then b gives `[b, c, a, b]`.

## Complexity

The scan costs O(n), followed by O(m) suffix writes with m at most n.
Both references use O(n) total time and O(1) auxiliary space, excluding the already supplied word.

## Edge cases

An empty word retains every array entry.
If word consumes the whole array, compaction retains nothing and the final copy restores that word.
Repeated letters require choosing the earliest available matching occurrence.

## Common mistakes

Do not remove all occurrences of a letter just because it appears in word.
Only the next unmatched word character can trigger selection.

## Language notes

Python enumerates word characters when appending.
Java uses `charAt` and a mutable `char[]`; both methods mutate the original array without returning a replacement.
