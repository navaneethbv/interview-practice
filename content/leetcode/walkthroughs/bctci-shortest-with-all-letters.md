## Intuition

A valid window must cover letter multiplicities, not merely include each distinct letter once.
Track how many more copies of each required letter are needed, and count how many distinct requirements are still unsatisfied.
This makes validity a constant-time check while the window moves.

## Brute force

Check every substring by counting its letters and comparing with the target frequencies.
This requires quadratic or worse work in the source length.

## Approach

Build `need` from s2 and initialize `missing` to its number of distinct letters.
When a required letter enters the window, decrement its need count.
If that count reaches zero, one previously unsatisfied requirement is now fulfilled.
Negative counts represent harmless surplus copies.
Whenever missing becomes zero, record the current length and repeatedly remove leftmost characters.
A required count rising from zero to one makes the window invalid again.
Continue extending until all source characters are processed, returning -1 if no valid length was recorded.

## Walkthrough

Example 1 requires w once, e once, and l twice from `helloworld`.
The window through the w at index five first contains every requirement.
Removing the initial h leaves `ellow`, length five, which still contains e, both l characters, and w.
Removing the e would break its requirement, so shrinking stops.
Later extensions cannot find a shorter valid window, and the answer is 5.

## Complexity

Both pointers traverse s1 only once, and building requirements scans s2 once.
Time is O(length(s1) + length(s2)).
Python stores at most 26 map entries, using O(1) alphabet-bounded auxiliary space.
Java also has fixed-size arrays, but its `s2.toCharArray()` calls temporarily allocate O(length(s2)) space.

## Edge cases

A repeated required letter needs every requested copy.
Unrequired source letters may be skipped during shrinking without affecting missing.

## Common mistakes

Do not count distinct letters as though multiplicities were irrelevant.
Only zero-crossing transitions change the number of unsatisfied requirements.

## Language notes

Python factors inclusion and exclusion into helpers.
Java separates the permanent `required` flags from mutable need counts so surplus and absent letters remain distinguishable.
