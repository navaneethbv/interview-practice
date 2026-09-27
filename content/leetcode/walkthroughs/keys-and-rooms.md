## Intuition
Room 0 is the only room available initially, so the problem is reachability from node 0.
Whenever a visited room exposes a key, add that room to a stack if it has not been visited.

## Brute force
A naive approach can repeatedly scan every discovered key list and revisit rooms until no new room appears.
With duplicate revisits, the same room contents may be scanned many times, reaching O(RK) or worse for R rooms and K total keys.
A visited set gives each room one expansion.

## Approach
1. Mark room 0 visited and push it on a stack.
2. Pop a room and inspect each key inside it.
3. Mark and push every newly discovered room.
4. Compare the visited count with the total room count.

## Walkthrough
Example 1 is `rooms = [[1], [2], []]`.
The stack starts with room 0 and the visited set contains 0.
Room 0 yields key 1, so room 1 is marked and pushed.
Room 1 yields key 2, so room 2 is marked and pushed.
Room 2 has no keys, and the stack becomes empty.
All three rooms are visited, so the result is `true`.

## Complexity
Let R be the number of rooms and K the total number of listed keys.
Each room and key is processed once, so time is O(R + K).
The visited set and stack use O(R) auxiliary space.

## Edge cases
A key to an already visited room is ignored.
A room with a self-key does not cause an infinite loop.
If a room is unreachable from room 0, the final count is smaller than R.

## Common mistakes
Starting with every room marks locked rooms as reachable.
Failing to mark before pushing can add the same room repeatedly.
Returning true after visiting only the last discovered room ignores other rooms.

## Language notes
Python stores room indices in a set and list stack.
Java uses a boolean array and an `ArrayDeque<Integer>` without copying the room lists.
