## Intuition

Whether an account is shared is a property of the complete connection list.
Which shared connection to return is a separate question about original list order.
Two passes keep these responsibilities simple.

## Brute force

For each connection, scanning the entire list to count its username would require O(n squared) comparisons.
Stopping when a duplicate is first encountered would answer a different question: the first repeated occurrence, rather than the earliest connection belonging to any shared account.

## Approach

Build `counts`, mapping each username to its total number of connections.
Then scan `connections` again from beginning to end.
Return the current IP as soon as its username has count greater than one.
If the second scan finishes, return the empty string.
The first pass establishes complete sharing information, and the second pass guarantees that no earlier qualifying connection was skipped.
IP values do not need to be parsed or sorted because their only role is identifying the selected connection.

## Walkthrough

```text
Input: connections = [["203.0.113.10", "mike"], ["198.51.100.25", "bob"], ["192.0.2.5", "mike"], ["203.0.113.15", "bob2"]]
Output: "203.0.113.10"
```

The first pass counts mike twice, bob once, and bob2 once.
The second pass begins at the connection with IP `203.0.113.10` and username mike.
Since mike's count is 2, this very first connection qualifies and is returned.
The later mike connection proves sharing but is not the desired output.

## Complexity

For n connections and u distinct usernames, expected time is O(n) and extra space is O(u), using hash-table operations.
Username lengths are bounded in the statement.
The input list is unchanged.

## Edge cases

An empty list returns an empty string.
If every username occurs once, there is no shared account.
Several shared usernames still require the earliest connection overall.

## Common mistakes

Returning the username instead of the IP violates the contract.
Do not infer sharing from similar IP prefixes.

## Language notes

Python uses a dictionary with a default count of zero.
Java's `Map.merge` performs the same increment, and string keys use value equality.
