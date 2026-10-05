## Intuition

Close All Requests is organized around Update with Subquery.
The key is to preserve the information needed when the next input element or operation is processed.
The local contract and reference implementation define valid inputs, outputs, and mutation behavior.
A useful invariant is that every retained value or partial result already satisfies the part of the contract that cannot be repaired later.

## Brute force

A direct solution enumerates every candidate result or repeatedly rescans the input.
That approach is useful as a small oracle because it is easy to explain, but it repeats work.
Its cost grows with the number of candidates and the amount of input examined for each candidate.
Use it to validate small examples before relying on the optimized state transition.

## Approach

1. Read the arguments and identify boundary conditions before changing state.
2. Apply the Update with Subquery idea: Update Requests whose apartment belongs to building 11, found with a subquery on Apartments.
3. Keep only the state needed to distinguish the next valid transition from a rejected one.
4. Return the exact order, type, and mutation form declared by the spec.
5. Stop when the invariant proves that no later input can change the answer.

This is why the method named the solution method can make progress without enumerating every complete candidate.
When multiple answers are allowed, preserve the comparison rule from the spec instead of assuming one ordering.
When an empty input or boundary value appears, follow the explicit contract rather than the general loop.

## Walkthrough

Example 1 uses input {"tables": {"Apartments": [[1, "1A", 11], [2, "2A", 12]], "Requests": [[10, "Open", 1], [11, "Open", 2], [12, "Closed", 1]]}} and expects [[10, "Closed", 1], [11, "Open", 2], [12, "Closed", 1]].
Start with the initial state implied by the arguments.
Process the first meaningful value using the transition above, then update retained state before considering the next value.
At the point where the invariant is complete, the returned value is [[10, "Closed", 1], [11, "Open", 2], [12, "Closed", 1]].
The same reasoning handles hidden cases {"tables": {"Apartments": [], "Requests": []}}, {"tables": {"Apartments": [[1, "1", 11], [2, "2", 11]], "Requests": [[1, "Open", 1], [2, "Open", 2], [3, "Open", 2]]}}, {"tables": {"Apartments": [[1, "1", 1], [2, "2", 111]], "Requests": [[1, "Open", 1], [2, "Open", 2]]}}; they exercise a boundary, repeated value, or alternate branch rather than a new algorithm.

## Complexity

The imported workbook records the expected time bound as the reference solution bound.
The imported workbook records the expected space bound as the retained state.
Check those claims against actual loops, allocations, recursion, and helper structures.
A slower brute-force oracle remains useful in tests even though it is not the submitted approach.

## Edge cases

Check empty input when permitted, the smallest valid scalar, repeated values, and the largest valid input.
Check hidden cases {"tables": {"Apartments": [], "Requests": []}}, {"tables": {"Apartments": [[1, "1", 11], [2, "2", 11]], "Requests": [[1, "Open", 1], [2, "Open", 2], [3, "Open", 2]]}}, {"tables": {"Apartments": [[1, "1", 1], [2, "2", 111]], "Requests": [[1, "Open", 1], [2, "Open", 2]]}} independently instead of assuming the visible example is sufficient.
For mutation problems, verify both the returned object and the original structure required by the output contract.
For multiple valid answers, compare with the declared validator or unordered mode.

## Common mistakes

- Losing original indices, identities, or ordering when the contract requires them.
- Updating state before checking the condition that uses previous state.
- Claiming a stronger complexity bound than the reference actually provides.
- Treating an impossible case as if the statement guaranteed a result.
- Returning an equivalent value with the wrong serialized shape.

## SQLite notes

The Python reference is the expected-output source used by the judge.
The Java reference, when present, must preserve the same helper types, mutation rules, and comparison mode.
Keep integer bounds and string indexing rules explicit when translating the transition between languages.
The targeted judge is the final check for both references.
