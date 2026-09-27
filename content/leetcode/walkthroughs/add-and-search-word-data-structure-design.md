## Intuition

A trie still shares stored prefixes, but a dot in a query can follow any child edge.
Maintain the set of possible trie positions after each pattern character.
After consuming the entire pattern, a match exists only if one remaining position is a complete-word endpoint.

## Brute force

Store all words and compare every candidate of the right length against each query pattern.
This can scan the whole dictionary for every search.
A trie restricts exploration to prefixes compatible with the pattern so far.

## Approach

1. Insert words by following or creating character paths and marking the final node as a word.
2. Start a search with `nodes` containing only the root.
3. For a literal character, replace `nodes` with matching children of the current candidates.
4. For `.`, replace it with every character child of every candidate.
5. After the last character, return whether any candidate has a terminal word marker.

Each frontier represents exactly the stored prefixes matching the pattern prefix already consumed.
A dot advances one level, so it matches exactly one character rather than an arbitrary-length substring.

## Walkthrough

Example 1 first inserts `cat`.

| Query | Frontier path | Result |
| --- | --- | --- |
| `c.t` | Root to c, dot follows a, literal t reaches terminal | true |
| `ca` | Root to c to a, but a is not terminal | false |
| `d.t` | No root child d; frontier becomes empty | false |

Including the insertion's void result gives `[null, true, false, false]`.
The failed length-two search shows why an existing prefix is insufficient.

## Complexity

- Time: O(L) for insertion; O(L × 26^d) as a search upper bound for length L and d dots, limited further by actual trie paths.
- Space: O(D) for total stored characters, plus O(26^d) possible frontier nodes during a search.

The statement limits d to at most two, preventing unbounded wildcard branching.

## Edge cases

Searching an empty dictionary returns false.
Duplicate additions do not create duplicate words or paths.
A pattern without dots follows only one path.
A shorter pattern must still end at a stored word marker.

## Common mistakes

- Treating dot as zero or many characters changes its required meaning.
- Returning true when a prefix exists ignores full-word matching.
- Including Python's terminal marker among wildcard children corrupts the frontier.

## Language notes

Python builds frontier lists with comprehensions and excludes the `$` marker from wildcard expansion.
Java uses explicit `TrieNode` lists, a boolean terminal flag, and helpers to collect matching children.
Both references use iterative frontier expansion rather than recursive branching.
