## Intuition

The magazine is a resource of individual letter occurrences.
Count what the ransom note needs, count what the magazine owns, and ensure every required count is available.
Subtracting counters directly expresses that containment check.

## Brute force

Removing or searching for each note character in the magazine can take O(n²) time.
A frequency table gives constant work per character for a fixed alphabet.

## Approach

1. Build required_letters from ransomNote.
2. Build available_letters from magazine.
3. Subtract the available counts from the required counts.
4. Return true when no positive requirement remains.

## Walkthrough

Example 1 uses ransomNote = "aab" and magazine = "baa".
The note requires two a characters and one b.
The magazine has two a characters and one b.
After subtraction, every required count is covered, so the result is true.

## Complexity

- Time: O(len(ransomNote) + len(magazine)), for the two frequency passes.
- Space: O(k), where k is the number of distinct letters.

## Edge cases

A note with exactly the magazine's letters succeeds.
A repeated letter with one missing occurrence fails.
Unused magazine letters do not affect the result.
The lowercase constraint allows Java to use a 26-entry array.

## Common mistakes

- Treating a letter as reusable after one magazine occurrence.
- Comparing only distinct letter sets and ignoring counts.
- Sorting both strings when a frequency table is linear.
- Mutating the magazine string conceptually without tracking each copy.

## Language notes

Python Counter subtraction keeps only positive requirements.
Java decrements an array while consuming each note character and returns early when a count becomes negative.
