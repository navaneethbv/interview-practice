## Intuition

Count how often each distinct value appears, then ensure those counts are themselves distinct.
A set detects a duplicate frequency immediately.

## Brute force

Counting each value by scanning the entire array repeatedly takes O(n squared) time.
The same occurrences are revisited for every candidate value.

## Approach

1. Build a frequency map for array values.
2. Extract the frequency values.
3. Return whether the number of frequencies equals the size of their set.

## Walkthrough

Example 1:

For [1,2,2,1,1,3], value 1 occurs three times, value 2 occurs twice, and value 3 occurs once.
The frequencies are [3,2,1], which contain no duplicate.
The answer is true.

## Complexity

The count pass and set construction take O(n) expected time.
The map and frequency set use O(u) space for u distinct values.
Python Counter and Java HashMap provide expected constant-time updates.

## Edge cases

An array with one distinct value always has one unique frequency.
Negative values are valid map keys.
Two values sharing one frequency make the answer false.
The frequency set is checked only after every map count is complete.
This ordering prevents a partially built frequency table from producing a false result.
The result is a boolean rather than the frequencies themselves.

## Common mistakes

Do not test whether the input values are unique.
Compare frequencies, not the keys of the map.
Keep all occurrences when incrementing a count.

## Language notes

Python obtains counts through Counter.
Java stores counts in HashMap and copies the values into a HashSet.
