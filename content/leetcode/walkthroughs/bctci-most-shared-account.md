## Intuition

Each connection contributes one vote to its username because the IPs are already distinct.
The winner is the largest final frequency, with first appearance as the tie rule.
Preserving insertion order in the frequency map captures that tie information automatically.

## Brute force

For every username encountered, rescan the connection list to count its occurrences.
This can require O(n²) work and repeatedly recount the same account.

## Approach

Build `counts` by scanning connections in their original order and incrementing each user's total.
New usernames enter the map when first seen; updating an existing count must preserve its position.
Then scan map entries in insertion order.
Initialize `best` with the first encountered account and replace it only when another count is strictly larger.
Equal counts never displace the earlier entry.
If there were no connections, the initial empty result is returned.

## Walkthrough

Example 1 encounters mike first, bob second, and bob2 last.
The second mike connection increments mike's count without changing its position.
Final counts are mike 2, bob 1, and bob2 1.
The selection pass begins with mike and neither later account exceeds its total.
The returned username is `mike`.
In a tie, the same pass would retain whichever tied username first appeared in the connections.

## Complexity

For n connections and u usernames, expected time is O(n + u), or O(n).
The frequency map uses O(u) auxiliary space.
String hashing and comparison additionally depend on username length.

## Edge cases

No connections return the empty string.
If every account has exactly one connection, the account in the first row wins.

## Common mistakes

An ordinary unordered map does not preserve the tie rule during its entry scan.
Do not choose whichever account first reaches a temporary high count; only final counts determine the winner.

## Language notes

Python dictionaries preserve insertion order.
Java deliberately uses `LinkedHashMap` rather than `HashMap`.
The reference uses the empty string as its unset marker, following the examples' nonempty account names.
