## Intuition

The answer depends on both frequency and original position.
A username becomes shared only after its complete frequency is known, but the required IP belongs to its earliest connection, not necessarily the connection that reveals the duplicate.

## Brute force

For each connection, scan the entire list to count its username and stop at the first shared one.
That preserves the required ordering but takes O(n squared) comparisons in the worst case.

## Approach

Build `counts` by visiting every connection and increasing its username's frequency.
Then traverse `connections` again in the original order.
The first entry whose user has a count greater than one provides the answer.
If that second pass finishes, return the empty string.
Separating counting from selection makes the earliest-position rule explicit and independent of hash-map iteration order.

## Walkthrough

Example 1 counts `mike` twice, `bob` once, and `bob2` once.
The second pass immediately encounters `["203.0.113.10", "mike"]`.
Because `counts["mike"]` is 2, its IP is returned.
The later address `192.0.2.5` proves sharing, but is not the earliest qualifying connection.

## Complexity

With n connections and u distinct usernames, expected time is O(n) and auxiliary space is O(u).
Username length is bounded by 30, so hashing and comparing these names has bounded cost under the stated constraints.

## Edge cases

An empty list or a list of unique usernames returns `""`.
More than two occurrences still qualify.
Distinct IPs do not mean distinct usernames, and several shared accounts can coexist.

## Common mistakes

Returning the IP of the first repeated occurrence answers a different question.
Iterating the frequency map to select an account can also lose the required list order.

## Language notes

Python destructures each pair into IP and username, ignoring the IP during counting.
Java reads positions zero and one from each connection list and uses `merge` to accumulate counts.
