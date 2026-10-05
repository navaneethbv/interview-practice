## Intuition

Ticket validity depends on both its own lifecycle and the intervening activity of its agent.
A ticket can be invalid even when its open and close look correct in isolation.
Track lifecycle history permanently so duplicate actions cannot erase earlier evidence.

## Brute force

Group each ticket's actions, then scan the interval between its open and close for other actions by that agent.
Repeated interval scans can take O(n²) time.

## Approach

Maintain `opened_by`, `closed`, `last_ticket`, and the accumulating set `bad`.
Before processing an event, inspect the agent's previous ticket.
Switching away from an opened, unclosed ticket marks that previous ticket anomalous.
An open is invalid if the ticket was already opened or closed; preserve the first opener with `setdefault`.
A close is invalid when there was no open, a previous close, or a different opener.
Record every close regardless, because subsequent actions must still see that history.
Finally mark all opened tickets that never closed.

## Walkthrough

In Example 1, Drew opens ticket 32, so its opener and Drew's last ticket are recorded.
Drew next closes ticket 2.
The switch marks the still-open ticket 32 bad, and closing unopened ticket 2 marks 2 bad.
The last close of 32 matches its original opener, but cannot remove its earlier anomaly.
The returned set of ticket numbers is therefore `[2, 32]` in any order.

## Complexity

For n log entries, hash operations give O(n) expected time.
The ticket sets and maps plus the per-agent history use O(n) space.

## Edge cases

An empty log returns an empty list.
Interleaved work by different agents is allowed when neither agent switches away from their own active ticket.

## Common mistakes

Do not clear `bad` when a later event looks valid.
Do not overwrite the original opener on a repeated open.

## Language notes

Python returns a list converted from a set, and Java returns an `ArrayList` from a `HashSet`.
The spec compares outputs without requiring ticket order.
