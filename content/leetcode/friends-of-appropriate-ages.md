# Friends Of Appropriate Ages

Person A sends a directed friend request to a different person B unless any of these conditions holds: B.age <= 0.5*A.age + 7, B.age > A.age, or B.age > 100 while A.age < 100.
Return the total number of requests.
People of the same age are still distinct people.

## Examples

### Example 1

```text
Input: ages = [16, 16]
Output: 2
Explanation: Each person may request the other.
```

### Example 2

```text
Input: ages = [16, 17, 18]
Output: 2
Explanation: The permitted requests are 17 to 16 and 18 to 17.
```

## Constraints

- 1 <= ages.length <= 20,000
- 1 <= ages[i] <= 120
