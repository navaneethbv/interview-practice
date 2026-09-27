## Intuition

Words with a shared prefix can share the same path of character nodes.
A trie records that path one letter at a time.
A separate terminal marker distinguishes a complete stored word from a prefix that merely reaches an existing node.

## Brute force

Store words in a list and scan them for every exact or prefix query.
Queries can inspect the total stored character count repeatedly.
A trie restricts the work to the characters of the requested word or prefix.

## Approach

1. Create an empty root node or dictionary.
2. For `insert`, follow each character, creating a child only when the path does not yet exist.
3. Mark the final node as a complete word.
4. In `walk` (`_walk` in Python), follow a requested path and return its final node, or null if any child is missing.
5. `search` requires both a successful walk and a terminal marker.
6. `startsWith` requires only a successful walk.

The root represents the empty prefix, not an inserted nonempty word.
Inserting a duplicate follows the same path and sets the already-set marker, leaving query results unchanged.

## Walkthrough

Example 1 performs the following operations:

| Operation | Trie observation | Output |
| --- | --- | --- |
| `insert("cloud")` | Create c, l, o, u, d path; mark d terminal | `null` |
| `search("cloud")` | Path exists and d is terminal | true |
| `search("clo")` | Path exists but o is not terminal | false |
| `startsWith("clo")` | Path exists | true |

The final two operations reach the same node but ask different questions about it.

## Complexity

- Time: O(L) expected per operation for an L-character argument, with constant-size alphabet lookups.
- Space: O(D) stored trie nodes for D total inserted characters in the worst case; queries use O(1) auxiliary state.

## Edge cases

A query before any insertion fails.
One word can be a prefix of another; both terminal markers remain meaningful.
Repeated insertions do not duplicate paths.
Long words are handled iteratively rather than recursively.

## Common mistakes

- Treating every existing path as a complete word makes prefix searches incorrectly succeed as exact searches.
- Replacing an existing child during insertion destroys previously stored words.
- Forgetting the terminal marker loses the distinction between a word and its prefix.

## Language notes

Python stores children in nested dictionaries and uses the reserved `$` key as a terminal marker.
Java uses a private `TrieNode` with a 26-child array and a boolean `word` flag.
The lowercase-only input contract makes both the marker choice and array indexing unambiguous.
