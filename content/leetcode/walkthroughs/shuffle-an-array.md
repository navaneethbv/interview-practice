## Intuition

The original order must survive every shuffle, so the constructor keeps a private copy and each operation starts from a fresh copy.
Fisher-Yates chooses the final position for each suffix element from all still-unfixed positions, giving every permutation equal probability.

## Brute force

Repeatedly swapping arbitrary pairs can produce biased permutations because some permutations receive more swap sequences than others.
Generating every permutation and choosing one is also factorial in the array length and unnecessary.

## Approach

1. Copy the constructor input into `original`.
2. For `reset`, return a copy of `original` so callers cannot mutate future resets.
3. For `shuffle`, copy `original` into `values`.
4. Walk `index` backward and swap it with a uniformly selected index from zero through `index`.

## Walkthrough

For Example 1, the input is `[1, 2, 3]` and the operation sequence is shuffle, reset, shuffle.
One valid first shuffle can leave `[1, 2, 3]` after selecting each index itself.
`reset` reads the untouched `original` and returns `[1, 2, 3]`.
The second shuffle starts from that same original copy, so it may again return `[1, 2, 3]` or any of the other five permutations.

## Complexity

Each shuffle takes `O(n)` time and `O(n)` temporary space for its copy.
Each reset takes `O(n)` time and `O(n)` space for the returned copy, while the stored original uses `O(n)` space.

## Edge cases

A one-element array has only one permutation, so shuffle and reset both return that value.
Distinct signed integers can be negative without changing the algorithm.

## Common mistakes

- Shuffling the stored original makes reset return a later permutation.
- Returning the internal array lets callers corrupt future operations.
- Swapping with any index in the full array at every step does not give Fisher-Yates' uniform distribution.

## Language notes

Python uses a dedicated seeded `Random` instance and Java uses `Random`, keeping randomness local to the object.
The seed makes the local reference reproducible, but the validator accepts any valid permutation and does not prove statistical uniformity.
