## Intuition

Each ticket needs valid lifecycle events, and each agent must avoid interrupting an open ticket with another ticket.
These are related but distinct invariants, so the reference tracks both ticket history and each agent's latest action.

## Brute force

Grouping events by ticket and rescanning each open-close interval for interference can take quadratic time.
A chronological scan detects the moment an agent switches away from unfinished work.

## Approach

`opened_by` remembers the first opener, `closed` records completed or attempted closes, and `bad` permanently records anomalies.
Before processing an event, inspect that agent's `last_ticket`.
If it is different and remains open, mark the previous ticket bad.
Record the new last ticket, then validate the event itself.
Repeated opens, closes before opens, repeated closes, and a different closing agent all mark the current ticket bad.
After the scan, mark every opened but unclosed ticket bad.
Using a set prevents duplicate anomaly entries.

## Walkthrough

```text
Input: agents = ["Drew", "Drew", "Drew"], actions = ["open", "close", "close"], tickets = [32, 2, 32]
Output: [2, 32]
```

Drew opens ticket 32, recording Drew as its opener.
Drew's next event is a close of ticket 2.
Switching away marks the still-open ticket 32 bad, and closing unopened ticket 2 marks 2 bad.
The final close of 32 does not erase its earlier interruption.
The result therefore contains both 2 and 32, in either order.

## Complexity

For n log entries, expected time is O(n) with hash tables.
Ticket and agent histories require O(n) extra space in the worst case.

## Edge cases

Actions by other agents do not interrupt a ticket unless they violate its own open-close rule.
An opening at the end is anomalous because it never closes.
An already-bad ticket stays bad.

## Common mistakes

Do not clear anomaly status after a later valid close.
Do not overwrite the first opener when a duplicate open arrives.

## Language notes

Python uses dictionaries and sets; Java uses their hash-based equivalents.
Neither implementation promises sorted output, matching the order-insensitive contract.
