# Baseball Game

Process a sequence of scorekeeping operations.
An integer string appends that score; + appends the sum of the previous two scores; D appends twice the previous score; C removes the previous score.
Return the sum of scores still on the record after every operation.

## Examples

```text
Input: operations = ["5","2","C","D","+"]
Output: 30
Explanation: After removing 2, the remaining sequence becomes 5,10,15.
```

```text
Input: operations = ["-3","4","+"]
Output: 2
Explanation: The final score is -3+4 = 1, giving a total of 2.
```

## Constraints

- 1 <= operations.length <= 1000
- Numeric scores are between -30,000 and 30,000.
- Every operation has enough previous scores to be valid.
- The answer and intermediate scores fit signed 32-bit integers.
