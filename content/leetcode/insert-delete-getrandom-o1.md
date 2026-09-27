# Insert Delete GetRandom O(1)

Implement `RandomizedSet` with insertion, removal, and random selection in average O(1) time.
`insert(val)` returns true only when it adds a previously absent value.
`remove(val)` returns true only when it deletes a present value.
`getRandom()` returns a uniformly selected value currently in the set.
There is always at least one value when `getRandom()` is called.
Every valid random result is accepted; longer repeated draws also receive a broad distribution check.

## Examples

```text
Input: operations = [insert,insert,getRandom,remove,getRandom], arguments = [[4],[9],[],[4],[]]
Output: [true,true,4,true,9]
Explanation: The first random result may instead be 9; after removing 4, only 9 remains.
```

```text
Input: operations = [insert,insert,remove,getRandom], arguments = [[-2],[-2],[7],[]]
Output: [true,false,false,-2]
Explanation: Duplicate insertion and removal of an absent value both return false.
```

## Constraints

- Values fit a signed 32-bit integer.
- There may be up to 200,000 operations; local hidden traces use modest operation counts.
- Random selection is called only on a nonempty set.
