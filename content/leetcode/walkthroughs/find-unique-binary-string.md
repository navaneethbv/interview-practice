## Intuition
There are N input strings of length N, so diagonalization can construct one string that differs from the ith input at position i.
It therefore cannot equal any input string.

## Brute force
Enumerating all `2^N` binary strings and checking membership is exponential.
Changing each diagonal bit produces a valid missing string in O(N).

## Approach
1. For each index i, inspect bit i of `nums[i]`.
2. Append the opposite bit to the answer.
3. Return the resulting length-N string.

## Walkthrough
Example 1 contains `"01"` and `"10"`.
At index 0, the first string has 0, so choose 1.
At index 1, the second string has 0, so choose 1 again.
The result is `"11"`, differing from the first string at position 0 and the second at position 1.

## Complexity
The diagonal scan takes O(N) time and the result uses O(N) output space.
The Python list of characters and Java `StringBuilder` both hold the constructed string.

## Edge cases
For the single input `"0"`, flipping its diagonal bit returns `"1"`.
The method does not need to know which strings are duplicates because the contract supplies distinct values.
Every result position remains binary.

## Common mistakes
Flipping every bit of one input does not guarantee avoiding the other inputs.
Using position N at the final string index is an off-by-one error.
Returning a set or integer breaks the required string contract.

## Language notes
Python appends characters and joins once at the end.
Java appends the opposite `char` directly to a `StringBuilder`.
