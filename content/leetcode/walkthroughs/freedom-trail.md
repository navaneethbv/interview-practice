## Intuition

The ring may contain the same character at multiple positions, so each key character can leave the pointer in several possible states.
Dynamic programming records the least cost to finish the processed prefix at each matching ring position.

## Brute force

A recursive search can choose every occurrence of each key character and calculate rotations between consecutive choices.
With repeated characters, that branching repeats the same suffix states exponentially.

## Approach

1. Build `positions`, listing every ring index for each character.
2. Start `costs` with position zero at cost zero.
3. For each character in `key`, compute every matching `next_position` from every prior state.
4. Add one button press plus the shorter clockwise or counterclockwise rotation.
5. Return the smallest cost among positions for the final character.

## Walkthrough

For Example 1, `ring = "abc"` and `key = "ca"`.
The initial state is position 0, character `a`, at cost 0.
For `c`, position 2 is two steps counterclockwise or one step clockwise, so its cost is `1 + 1 = 2`.
For `a`, position 0 is one rotation from position 2 around the circle, plus one press, giving total 4.
The result is `4`.

## Complexity

If a key character has `r` occurrences and the previous state has `q` positions, that transition costs `O(rq)`.
Across the key, time is `O(sum(r_i q_i))`, with worst-case `O(|ring|^2 |key|)` for highly repeated characters.
The position lists and one DP map use `O(|ring|)` space.

## Edge cases

Repeated ring characters create multiple candidate states, while a repeated key character can be pressed without rotating.
Every key character is guaranteed to occur, so the final cost map is nonempty.

## Common mistakes

- Counting a button press only once for the whole key undercounts the answer.
- Using only the first occurrence of a character can miss a shorter future rotation.
- Choosing clockwise distance without comparing the reverse direction is incorrect on a circle.

## Language notes

Python uses dictionaries of costs and `defaultdict(list)`, while Java stores character positions in an array of lists.
Both references use integer distances because the ring length is at most 100.
