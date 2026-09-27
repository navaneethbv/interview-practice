## Intuition

An email address is the identity that connects account records.
Union all emails listed in one account, then collect every email by its final disjoint-set root.
The person's name comes from the connected account, while sorting each group's emails gives the required presentation order.

## Brute force

For A accounts with at most M emails each, build an email set per account and compare every pair for overlap.
Those pair comparisons take O(A²M) expected time before collecting connected groups.
Building explicit account-to-account edges still requires a graph traversal and a separate mapping from emails to accounts.
Union-find records the same connectivity with less repeated comparison.

## Approach

1. Create `parent[email] = email` the first time an email appears and remember its account name in `account_names`.
2. For every account, union each email with its first email, attaching the smaller component to the larger one.
3. Apply iterative path compression through `find` while collecting every email under its final root in `groups`.
4. Sort each group's emails and prepend the name stored for the root.

## Walkthrough

Example 1 contains `a@x.com, b@x.com` and `b@x.com, c@x.com`.

| account processed | union | connected group |
| --- | --- | --- |
| first account | `a@x.com` with `b@x.com` | `a@x.com, b@x.com` |
| second account | `b@x.com` with `c@x.com` | `a@x.com, b@x.com, c@x.com` |

The root identifies one group, and sorting its emails produces `a@x.com`, `b@x.com`, `c@x.com` after the name `Ana`.

## Complexity

- Time: O(E log E) overall, because all E emails are grouped and each group's sorting costs at most O(E log E); union-find work with size and path compression is near-linear.
- Space: O(E), for parent links, names, groups, and the returned accounts.

## Edge cases

Accounts with the same name but no shared email stay separate.
An account with one email creates a one-element group.
Duplicate email entries are harmless because the same parent entry is reused.
Connections through several intermediate accounts are handled transitively.

## Common mistakes

- Unioning by name merges unrelated people who happen to share a name.
- Forgetting to compress or follow the root can split one connected component in the output.
- Sorting accounts globally instead of sorting each email group changes the required grouping semantics.
- Recursive parent chasing can overflow the call stack on a long valid chain, so the references use iterative path compression.

## Language notes

Python uses dictionaries and `defaultdict(list)` for the parent, component-size, and group maps.
Java uses `HashMap`, `ArrayList`, and `Collections.sort`, with iterative `find` and a private union-by-size helper.
The result order between distinct groups is intentionally unspecified by the spec.
