## Intuition

The logger only needs the most recent accepted timestamp for each message.
A new copy is allowed when at least ten seconds have passed since that timestamp.
A map gives direct access to the message's last decision.

## Brute force

A list of every previously printed event could be scanned for the same message.
That grows with all history and makes each decision O(h) for h stored events.
Keeping one timestamp per message bounds each decision to expected constant time.

## Approach

1. Look up the last accepted time for the message.
2. Reject it when the time difference is less than ten.
3. Otherwise record the new timestamp.
4. Return the corresponding boolean.
5. Leave unrelated message timestamps unchanged.

## Walkthrough

Example 1 accepts hello at timestamp 1 and records 1.
At timestamp 2, only one second has passed, so the message is rejected.
At timestamp 11, the difference from 1 is exactly ten, so it is accepted and the stored time becomes 11.
The results are true, false, true.

## Complexity

Each lookup and update is expected O(1) time.
The map uses O(u) space for u distinct messages.
The method stores no event history beyond the latest accepted timestamp.
The return value is a boolean.

## Edge cases

A message seen for the first time is accepted.
Exactly ten seconds is allowed because the rejection interval is strictly less than ten.
Rejected messages do not update their stored accepted time.
Different messages are tracked independently.

## Common mistakes

- Recording rejected timestamps makes the waiting interval restart incorrectly.
- Using less than or equal rejects the message at exactly ten seconds.
- Tracking one global timestamp mixes unrelated messages.
- Scanning all previous events wastes the direct-map contract.

## Language notes

Python uses dict.get to distinguish a missing timestamp from a stored time.
Java uses Integer null for the same distinction.
Both classes retain state across input calls.
