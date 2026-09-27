## Intuition

The stack must prefer the value with the greatest frequency and break ties by most recent push.
Group values by their current frequency, with each group acting like a stack.
A separate frequency map tells where the next push belongs, while maximumFrequency identifies the group to pop.

## Brute force

A naive pop could scan every distinct value, compute its frequency, and remember the most recently pushed candidate.
That scan costs O(u) per pop for u distinct values and requires extra history bookkeeping.
Frequency groups preserve the tie order during every push, so a pop removes the correct value in constant expected time.

## Approach

1. Increment the selected value's frequency.
2. Append the value to the stack belonging to its new frequency.
3. Update maximumFrequency if this frequency is larger.
4. On pop, remove the top value from the maximum-frequency stack.
5. Decrement that value's frequency and lower maximumFrequency when its group becomes empty.

## Walkthrough

Example 1 pushes 5, 7, 5, 7, 4, and 5.
The frequency-three group ends with 5, so the first pop returns 5.
The frequency-two group then has 7 most recently pushed, so the second pop returns 7.
The next highest group contains 5, and the remaining value 4 wins the final tie by recency.
The returned sequence is therefore 5, 7, 5, 4.

## Complexity

Let p be the number of pushed values and u the number of distinct values.
Each push and pop performs expected O(1) hash-map and stack operations.
The data structure uses O(p) space because each push contributes one stored frequency-group entry.
The frequency map uses O(u) additional entries, within the same O(p) bound.

## Edge cases

A value pushed once belongs to frequency one.
Repeated pushes create successive entries in higher-frequency groups.
When the top group empties, maximumFrequency must move down immediately.
The judge only calls pop when the structure contains an element.

## Common mistakes

- Choosing the oldest tied value violates the recency rule.
- Looking only at the frequency map loses the order among equal frequencies.
- Forgetting to lower maximumFrequency leaves pop pointed at an empty group.
- Removing every copy of a value instead of one occurrence corrupts later frequencies.

## Language notes

Python uses Counter and defaultdict lists, whose list append and pop operations are constant time.
Java uses HashMap and ArrayDeque, with the harness supplying collection imports.
The class is FreqStack rather than Solution because this is a design-problem contract.
