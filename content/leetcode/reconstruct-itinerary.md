# Reconstruct Itinerary

Each ticket [from, to] is a directed flight between three-letter airport codes.
Starting at JFK, use every ticket exactly once to build an itinerary.
When several itineraries work, return the lexicographically smallest airport sequence.
Duplicate tickets are separate tickets and must each be used.
At least one valid itinerary is guaranteed.

## Examples

### Example 1

```text
Input: tickets = [["JFK", "SFO"], ["SFO", "LAX"]]
Output: ["JFK", "SFO", "LAX"]
Explanation: Both tickets form a single route.
```

### Example 2

```text
Input: tickets = [["JFK", "KUL"], ["JFK", "NRT"], ["NRT", "JFK"]]
Output: ["JFK", "NRT", "JFK", "KUL"]
Explanation: Taking KUL first would leave unused tickets.
```

## Constraints

- 1 <= tickets.length <= 300
- Each airport code consists of three uppercase English letters.
- Every ticket connects different airports.
