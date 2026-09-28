## Intuition
The duplicate is the value seen twice, and the missing value is the only number from 1 through n never seen.
A frequency array indexed by value records both facts in one pass.
The input bounds make the array direct and avoid hash overhead.

## Brute force
Searching the array separately for every expected value costs O(N squared).
Counting occurrences once reduces the work to linear time and clearly distinguishes zero from two occurrences.

## Approach
1. Allocate counts for values 1 through n.
2. Increment the count for every input value.
3. Scan the count array and record the value with count two as duplicate.
4. Record the value with count zero as missing.

## Walkthrough
Example 1 is `[1, 2, 2, 4]`, so n is 4.
The counts for 1, 2, 3, and 4 are 1, 2, 0, and 1.
Value 2 is the duplicate and value 3 is absent.
The method returns `[2, 3]` in the required order.

## Complexity
Counting and scanning take O(N) time.
The count array uses O(N) auxiliary space, and the two-element result is constant size.

## Edge cases
The duplicate can be 1 or n.
The missing value can be 1 or n.
The guarantee of exactly one duplicate and missing value means both results are found.

## Common mistakes
Returning `[missing, duplicate]` reverses the contract.
Using a set loses the information that identifies the duplicate.
Indexing counts directly with a value of zero would shift all values incorrectly.

## Language notes
Python uses `Counter` and searches its entries plus the expected range.
Java uses an `int[]` whose index matches the input value directly.
Both preserve the integer result array shape expected by the judge.
