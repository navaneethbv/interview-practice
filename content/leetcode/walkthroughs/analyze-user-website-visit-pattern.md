## Intuition

A pattern is scored once per user, even if that user followed it several times.
Sorting visits by timestamp gives each user chronological order, after which combinations of three visits can be counted with a per-user set.

## Brute force

Generating every three-website sequence across all records and repeatedly checking users can take O(m^3u) time.
The grouped approach enumerates only each user's chronological triples and counts each distinct pattern once for that user.

## Approach

1. Zip timestamps, users, and websites, then sort records by timestamp.
2. Append each website to its user's chronological visit list.
3. For each user, generate every index triple and add its website tuple to a set.
4. Increase the global score once for each pattern in that set, then choose the highest score and lexicographically smallest tie.

## Walkthrough

In Example 1, users `u` and `v` each have the chronological sites `a,b,c`.
Each user's triple set contains only `(a,b,c)`, so its global score becomes 2.
There are no competing patterns, and the returned list is `["a","b","c"]`.
The per-user set is essential when the same user repeats a pattern, because repetition must not increase the score.

## Complexity

For a user with v visits, triple generation takes O(v^3), and sorting all m records costs O(m log m).
The grouped visit lists, per-user sets, and global counter use O(m^3) worst-case space when many triples are distinct.

## Edge cases

A user with fewer than three visits contributes no patterns.
Timestamps are sorted independently of the input order, so chronological order is preserved even when records arrive shuffled.
The lexicographic tie rule is applied to complete three-site sequences.

## Common mistakes

Do not count duplicate triples from one user more than once.
Do not use input order instead of timestamp order.
When comparing ties, compare the full tuple lexicographically, not individual websites independently.

## Language notes

Python uses `itertools.combinations` and tuple keys, while Java encodes triples with spaces in a `TreeMap`.
Java's sorted map iteration supplies lexicographic order, so updating only on a strictly higher score keeps the first tied pattern.
