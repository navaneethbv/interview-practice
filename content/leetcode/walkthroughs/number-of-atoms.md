## Intuition
A formula is easiest to parse from left to right with a stack of count maps.
An opening parenthesis starts a new map, a closing parenthesis applies its multiplier to that map, and an atom adds its count to the current map.
Nested groups therefore resolve naturally from the inside out.

## Brute force
Repeatedly searching for matching parentheses and expanding text creates unnecessary copies and becomes difficult to reason about for nested groups.
A character-by-character parser avoids reparsing completed groups.

## Approach
1. Start a count map for the outer formula and scan atom names, counts, and parentheses.
2. On an opening parenthesis, start a nested group map; Python pushes it onto an explicit stack, while Java enters a recursive parser call.
3. On a closing parenthesis, read its multiplier and merge the multiplied group counts into the surrounding map.
4. Parse each atom's uppercase initial and lowercase suffix, then add its optional count, defaulting to one.
5. Sort the final atom names and append a numeric count only when it exceeds one.

## Walkthrough

For Example 1, `Mg(OH)2`, the outer map first receives `Mg:1`.
The parenthesized map receives `O:1` and `H:1`.
At `)2`, those entries become `O:2` and `H:2` in the outer map.
Sorting names gives `H`, then `Mg`, then `O`, so the output is `H2MgO2`.
For `K4(ON(SO3)2)2`, the inner `SO3` map is multiplied by 2, then combined with `N`, and the entire outer group is multiplied by 2 before joining `K4`.

## Complexity
Let n be the formula length, u its distinct atom count, A the maximum atom-name length, and M the total map entries merged at closing parentheses.
The scanner consumes O(n) characters, but nested group merging can revisit the same atom many times.
Allowing O(A) key comparisons and lexicographic comparisons, a conservative expected bound is O(n + AM + Au log(u + 1)).
The maps, tokens, parser stack, and output use O(n) space; parsing is not generally linear because of repeated group merges.

## Edge cases
A formula with one atom and no count contributes one.
Multi-digit counts must consume all consecutive digits.
Nested parentheses can be several levels deep, so each closing parenthesis must pop exactly one map.
The valid-input contract ensures parentheses and atom names are well formed.

## Common mistakes
Apply a group multiplier to every atom in the group, including atoms from nested groups already combined.
Do not emit a count of one.
Sort complete atom names lexicographically rather than sorting individual characters.

## Language notes
Python uses an explicit list of `Counter` objects and index-returning token helpers.
Java recursively parses groups using a shared position field and merges their maps on return.
Both preserve exact integer counts under the contract's signed-32-bit bound for final counts.
