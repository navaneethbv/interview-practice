## Intuition
Calls arrive in strictly increasing time order, so expired calls always form a prefix of the queue.
Append the new time and remove times older than the inclusive lower bound.

## Brute force
A naive list could retain every request and scan backward at each ping to count the current window.
With q calls, repeated scans take O(q^2) time.
A deque removes each expired request once.

## Approach
1. Append t to the request queue.
2. Remove from the front while the time is less than `t - 3000`.
3. Return the remaining queue size.

## Walkthrough
Example 1 pings at 1, 3001, and 3002.
After ping 1, the queue is `[1]` and the count is 1.
At 3001, the inclusive window starts at 1, so `[1,3001]` remains and the count is 2.
At 3002, the window starts at 2, so request 1 is removed.
The queue is `[3001,3002]`, and the result sequence is `[1,2,2]`.

## Complexity
Each timestamp is appended once and removed once, so total time is O(q), or amortized O(1) per ping.
The queue uses O(min(q, 3001)) space because strictly increasing integer timestamps leave at most 3001 calls in the inclusive window.

## Edge cases
A timestamp exactly at `t - 3000` remains included.
A large time jump removes all older requests.
The local contract guarantees strictly increasing times, which makes front removal sufficient.

## Common mistakes
Using `<=` instead of `<` incorrectly removes the inclusive lower endpoint.
Scanning from the back ignores expired calls that form a front prefix.
Forgetting to append the current call undercounts every response.

## Language notes
Python uses `collections.deque` for O(1) front removal.
Java uses `ArrayDeque<Integer>` and retains primitive values through boxing only at the collection boundary.
