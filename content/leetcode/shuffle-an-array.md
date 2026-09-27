# Shuffle an Array

Create a `Solution(nums)` object for an array of distinct integers.
`reset()` returns the original order.
`shuffle()` returns a randomly selected permutation, with each permutation equally likely.
Calls must preserve the original array used by future resets.
The judge accepts any valid permutation on a shuffle call and checks repeated calls for variety.
The outputs below show possible results; another permutation is valid.

## Examples

```text
Input: ctor = [[1,2,3]], ops = ["shuffle","reset","shuffle"], args = [[],[],[]]
Output: [[1,2,3],[1,2,3],[1,2,3]]
Explanation: The original permutation is possible on either shuffle; reset always restores it.
```

```text
Input: ctor = [[7]], ops = ["shuffle","reset","shuffle"], args = [[],[],[]]
Output: [[7],[7],[7]]
Explanation: A one-element array has only one permutation.
```

## Constraints

- The array contains between 1 and 200 distinct signed 32-bit integers.
- At most 50,000 method calls occur.
- reset must restore the exact initial order.
- Use a uniform shuffle algorithm; the local judge's repeated checks do not prove statistical uniformity.
