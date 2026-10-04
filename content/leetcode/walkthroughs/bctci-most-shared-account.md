## Intuition

Because each IP appears only once, counting connections for a username also counts how many distinct IPs share that account.
The IP text itself does not need to be stored after reading the connection.
A frequency table of usernames contains all information needed for the result.

## Brute force

For every username encountered, scan all connections again to count its occurrences.
Repeated usernames cause repeated work, leading to quadratic time in the number of connections.

## Approach

Build `counts` by incrementing the second field of each connection.
Preserve usernames in first-encounter order.
Once all counts are complete, scan those entries and replace `best` only when a strictly greater frequency appears.
Because tied candidates are encountered in the order of their first connections, the earlier one remains the winner.
Separating counting from selection matters: a user who takes an early temporary lead need not be the earliest user among the final tied leaders.
If no entries exist, the initially empty `best` is the required answer.

## Walkthrough

Example 1 processes usernames mike, bob, mike, and bob2.
The frequency table ends with mike at two and each other account at one.
The winner scan selects mike first, then keeps that choice because neither later count is greater.
The returned username is `mike`.
The two different IP strings associated with mike require no separate deduplication under the distinct-IP contract.

## Complexity

With expected constant-time hash-table operations, both references take O(n) time for n connections.
They use O(u) auxiliary space for u distinct usernames.
String hashing and comparison additionally depend on username length when that length is treated as a variable.

## Edge cases

No connections returns an empty string.
If every username appears once, the first connection's username wins.

## Common mistakes

Do not group by IP instead of username.
An arbitrary map iteration order would fail the earliest-first-connection tie rule.

## Language notes

Python dictionaries preserve insertion order.
Java uses `LinkedHashMap` explicitly and `merge` to increment counts without a separate presence branch.
