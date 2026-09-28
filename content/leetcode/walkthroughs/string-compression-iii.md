## Intuition
Only consecutive equal characters form a run, and each encoded group can contain at most nine characters.
A scan can consume up to nine matching characters, emit one count and character, then continue with the remainder of the run.
This also handles runs longer than nine without a special case.

## Brute force
One could count a full run first and then repeatedly split its length into groups of nine.
That still scans the input and adds bookkeeping for each run.
The bounded scan emits groups directly as it reads them.

## Approach
1. Set `start` to the first unencoded character.
2. Advance `end` while the character matches and the group length is below nine.
3. Append `end - start` followed by the run character.
4. Set `start = end` and repeat until the word is consumed.

## Walkthrough
Example 1 has word `"aaabb"`.
Starting at index 0, the first run ends at index 3, so the method appends `3a`.
The next run starts at index 3 and ends at index 5, appending `2b`.
Joining the groups gives `"3a2b"`.
For the second example, eleven `a` characters become a group of nine followed by a group of two.

## Complexity
Each character is consumed once, so time is O(N).
The output builder stores O(N) encoded characters, which is necessary for the returned string.
The scan itself uses O(1) additional state.

## Edge cases
A one-character word emits `1` and that character.
A run of exactly nine stays in one group.
A run of ten emits `9` and then `1`.
Alternating characters create one group per character.

## Common mistakes
Allowing a group count above nine violates the encoding format.
Continuing a run after the character changes merges unrelated groups.
Appending only counts without their characters loses the decodable output.

## Language notes
Python accumulates encoded fragments and joins them once.
Java uses `StringBuilder` to avoid repeatedly copying the growing result.
Both references use the same end-exclusive group boundary.
