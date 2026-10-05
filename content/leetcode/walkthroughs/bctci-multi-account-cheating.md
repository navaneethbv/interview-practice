## Intuition

IP order is irrelevant, but exact membership is essential.
Canonicalize each user's IP collection into one sorted sequence so equal sets become equal keys.
Then duplicate detection reduces to ordinary hash-set membership.

## Brute force

Compare every pair of users, checking whether their IP sets match.
For u users and up to m IPs each, this requires O(u²) pair checks plus the work of comparing each collection.

## Approach

For each user row, omit the username at position zero and copy the remaining IPs.
Sort that copy and use the complete ordered sequence as `key`.
If the key is already in `seen`, return true because a previous user has exactly the same IP collection.
Otherwise add the key and continue.
Return false after all users if no duplicate appears.
Distinct IPs within each user are guaranteed, so sorted sequences and mathematical sets have the same equality relation here.

## Walkthrough

Example 1 first stores mike's sorted pair of IPs.
Bob's pair is different and becomes another key.
Bob2 lists the same two addresses as bob, but in reverse order.
Sorting bob2's addresses produces exactly bob's stored key.
The lookup succeeds and the function returns true, regardless of the different usernames and original address order.

## Complexity

For u users with mᵢ addresses each, sorting costs O(sum(mᵢ log mᵢ)) comparisons and storage is O(sum(mᵢ)).
Hashing the full keys also scans their addresses.
The bound of ten IPs per user makes the collection-size contribution effectively linear in u.

## Edge cases

Empty input and a single user return false.
Two users sharing only some addresses are not suspicious unless their entire sets match.

## Common mistakes

Exclude the username from the key.
Do not build keys by ambiguous string concatenation without separators; a tuple or list preserves element boundaries.

## Language notes

Python converts the sorted addresses to a hashable tuple.
Java uses a copied `ArrayList`, whose content-based equality and hash code work as a set key as long as it is not mutated afterward.
