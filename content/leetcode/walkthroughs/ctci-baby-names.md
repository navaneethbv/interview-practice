## Intuition

Synonym pairs define connected groups of names.
Disjoint set union can join those groups while choosing the alphabetically smallest root as the representative.
Counts are added only after all synonym relationships are known.

## Brute force

Repeatedly walking synonym edges for every name can revisit the same group many times.
Building a graph and running a traversal from every name also needs visited bookkeeping to avoid duplicate work.

## Approach

Use parent to represent a disjoint set of names.
find creates unseen names as their own roots and applies path compression while following parent links.
For each synonym pair, find both roots and attach the lexicographically larger root below the smaller root.
Then find the root for every entry in names and add its count to totals.
Format only roots that receive a count, using the root itself as the required canonical name.

## Walkthrough

In Example 1, Jon joins John, and Johnny also joins that same John root.
Their counts become 15 plus 12, while Johnny contributes no count of its own.
Chris, Kris, and Christopher form a second group rooted at Chris, whose total is 13 plus 4 plus 19.
The result contains John:27 and Chris:36, and the unordered comparison accepts either output order.

## Complexity

Let N be the number of names and S the number of synonym pairs.
With path compression, the union and find work is near linear in N plus S for this input scale.
The parent and totals maps use O(N + S) space because synonym-only names must also be represented.

## Edge cases

A name appearing only in a synonym pair can become the canonical root but contributes zero unless it is listed in names.
Disconnected names each produce their own total.
Transitive chains are compressed through repeated find calls.
A self-synonym pair leaves its root unchanged.

## Common mistakes

Choosing the first synonym endpoint as root can violate the alphabetical canonical-name rule.
Adding synonym-only names as output groups creates entries with no provided count.
Summing before resolving all roots can split a transitive group.

## Language notes

Python sorts the two roots and assigns the larger one to the smaller.
Java compares roots directly and uses LinkedHashMap only to preserve insertion order for output.
The spec compares results unordered, so output order is not part of the contract.
