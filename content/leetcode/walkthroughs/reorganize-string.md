## Intuition

The most frequent character is the hardest one to place without creating equal neighbors.
A max heap lets each step choose the most frequent character that is different from the one just placed.

## Brute force

Trying every permutation is factorial in the string length.
Checking each permutation for adjacent duplicates still leaves exponential or factorial search.

## Approach

1. Count each character and put the counts into a max heap.
2. Keep the previously emitted character temporarily out of the heap.
3. Pop the next most frequent available character, append it, decrement it, and return the previous character when safe.
4. Return an empty string if no different character is available before all input characters are used.

## Walkthrough

Example 1:

For aab, counts are a:2 and b:1.
The first pop chooses a and leaves a:1.
The next choice must differ from a, so b is emitted.
The saved a is released and emitted last, producing aba.

## Complexity

With n characters and σ distinct characters, heap operations take O(n log σ) time.
The heap and output require O(n) space in both references.
Python heap entries are tuples, and Java stores boxed count-character pairs in a priority queue.

## Edge cases

An empty input returns an empty result.
A string with one character is already valid.
If one count exceeds the other counts by more than one, rearrangement is impossible.

## Common mistakes

Do not immediately push the emitted character back before selecting the next one.
Do not test only the final result after constructing a string that already has adjacent duplicates.
Remember to account for every occurrence, not only distinct letters.

## Language notes

Python heapq is a min heap, so the reference stores negative counts.
Java uses a comparator that orders larger counts first.
