# Number of Students Unable to Eat Lunch

The first student takes the top sandwich if its binary type matches their preference; otherwise that student moves to the back.
Stop when no remaining student wants the top sandwich.
Return the number of students left hungry.
The sandwich array lists the stack from top to bottom.

## Examples

### Example 1

```text
Input: students = [1, 1, 0, 0], sandwiches = [0, 1, 0, 1]
Output: 0
Explanation: After rotating the queue as needed, every student eats.
```

### Example 2

```text
Input: students = [1, 1, 1, 0, 0, 1], sandwiches = [1, 0, 0, 0, 1, 1]
Output: 3
Explanation: Three remaining students want type 1 when type 0 is on top.
```

## Constraints

- 1 <= students.length == sandwiches.length <= 100
- Both arrays contain only 0 and 1.
