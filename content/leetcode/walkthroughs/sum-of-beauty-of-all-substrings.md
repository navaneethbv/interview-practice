## Intuition
For a fixed starting position, extending the ending position adds just one character to the current frequency counts.
A fixed twenty-six-entry array can therefore describe every substring starting there.
Its beauty is the largest count minus the smallest positive count, because absent characters do not participate.

## Brute force
Enumerate every substring and count all its characters again from scratch.
There are O(n^2) substrings, each requiring up to O(n) recounting work, for O(n^3) time.
Incremental counts eliminate that repeated character scan.

## Approach
1. For each starting index, initialize a fresh array of twenty-six zero counts.
2. Extend the ending index from that start through the remainder of the string.
3. Increment the entry for the newly included character.
4. Scan the frequency array to find the largest and smallest positive counts.
5. Add their difference to the total and return the completed total.

After each extension, the count array represents exactly the current nonempty substring.
Every substring has a unique starting and ending pair, so these nested loops include each one once.
Ignoring zero entries implements the definition's restriction to characters that actually appear.

## Walkthrough
Example 1 is `s = "aab"`.
Starting at index zero produces a with beauty zero, aa with beauty zero, and aab with counts two and one, giving beauty one.
Starting at index one produces a and ab, both with beauty zero.
Starting at index two produces b, also with beauty zero.
Adding the six contributions gives 1.
Repeated occurrences of a alone do not create beauty because the highest and lowest present-character counts are equal.

## Complexity
There are n(n+1)/2 substrings and twenty-six count entries to inspect per substring.
Time is O(26*n^2), conventionally O(n^2) for the fixed lowercase alphabet.
The count array and temporary positive-count collection in Python contain at most twenty-six entries, so auxiliary space is O(26), or O(1) under this contract.

## Edge cases
Single-character substrings always contribute zero.
A string containing only one distinct letter has total beauty zero.
Counts must restart for every new starting index.

## Common mistakes
- Including zero frequencies makes missing letters incorrectly increase beauty.
- Maintaining one frequency array across unrelated starts counts characters outside the current substring.
- Computing beauty only for the full string omits the other intervals.

## Language notes
Python filters positive counts in its helper before applying `min` and `max`.
Java finds both extremes in a loop that skips zeros.
Both helpers receive nonempty substrings, and the five-hundred-character bound keeps Java's total within `int`.
