# Cheater Detection

`answers` is the answer key of a multiple-choice test, one character per question.
Each entry of `students` is `[studentId, desk]`, and `responses[i]` holds that student's answers as a string of the same length.
Desks are numbered from 1 and arranged in rows of `m`: desks 1 to `m` form the first row, `m + 1` to `2m` the second, and so on; some desks may be empty.
Two students are suspect when they sit at adjacent desks in the same row and made exactly the same mistakes: the same questions wrong with the same wrong answers.
Students with no mistakes are never suspect.
Return every suspect pair as `[smaller id, larger id]`, in any order.

## Examples

### Example 1

```text
Input: answers = "abcc", m = 5, students = [[4, 10], [1, 6], [3, 8], [5, 11], [9, 7], [6, 16]], responses = ["abcd", "abcd", "abdd", "abcd", "abcd", "abdd"]
Output: [[1, 9]]
```

### Example 2

```text
Input: answers = "ab", m = 2, students = [[1, 1], [2, 2]], responses = ["ab", "ab"]
Output: []
```

## Constraints

- `1 <= answers.length <= 10^5` and `0 <= students.length <= 10^5`
- Student IDs and desks are distinct positive integers; `1 <= m < 10^5`.
