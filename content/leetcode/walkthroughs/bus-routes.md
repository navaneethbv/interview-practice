## Intuition

The important distance is the number of buses boarded, not the number of stops traveled.
Build a stop-to-bus index, then run breadth-first search over reachable stops while marking each bus when it is used.
Every stop reached from a bus has distance one more than the stop that led to boarding it.

## Brute force

Enumerating every sequence of buses can be exponential because routes may be revisited in many orders.
Scanning every route for every stop also repeats membership work, while the index and `used_buses` set process each route once.

## Approach

1. Return zero when `source == target`.
2. Build `buses_at_stop` mapping each stop to the routes that serve it.
3. Queue `(source, 0)` and mark the source stop.
4. For each unvisited bus serving the current stop, scan its stops.
5. Return `buses_taken + 1` on `target`, enqueue unseen stops otherwise, and return -1 if none reaches the target.

## Walkthrough

Example 1 has routes `[1,2,7]` and `[3,6,7]`, source 1, target 6.

| queue state | bus boarded | newly reachable stops | result |
| --- | --- | --- | --- |
| `(1,0)` | route 0 | 2 and 7 at one bus | continue |
| `(2,1)` | none | none | continue |
| `(7,1)` | route 1 | 3 and target 6 | return 2 |

The traveler rides route 0 to stop 7, then route 1 to stop 6.

## Complexity

- Time: O(S + R), including index construction, where S is total route-stop entries and R is the number of routes; each stop membership and each bus route is scanned at most once.
- Space: O(S + R), for the stop index, queue, and visited sets.

## Edge cases

Source equal to target needs no bus.
An unreachable target returns -1 after the queue empties.
A route serving the target directly returns one.
Repeated stops on a route are harmless because visited stops and buses suppress repeated work.

## Common mistakes

- Counting stops instead of boarded buses gives the wrong metric.
- Marking a bus only after scanning it allows duplicate route work.
- Omitting the source stop from `seen_stops` can enqueue it again through a cycle.

## Language notes

Python uses `defaultdict(list)` and the `_ride` helper to enqueue unseen stops.
Java builds the same index and stores the bus count in `int[]` queue states.
Both references use the harness's integer route arrays and return only the minimum bus count.
