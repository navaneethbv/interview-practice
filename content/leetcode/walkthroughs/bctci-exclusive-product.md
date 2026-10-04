## Intuition

The elements other than position i split into a prefix before i and a suffix after i.
Multiplying those two products avoids division and works even when zeros are present.

## Brute force

Multiplying every other element separately for each output position takes O(n squared) time.
Dividing a total product is forbidden and also fails around zero values.

## Approach

Scan left to right with prefix initially one.
Store prefix in `result[i]` before incorporating `arr[i]`.
Then scan right to left with suffix initially one.
Multiply the stored prefix by suffix for each answer, then incorporate the current array value into suffix.
Reduce after each multiplication modulo `MOD`.
The update order ensures neither factor includes the excluded current element, and together they contain every other element exactly once.

## Walkthrough

```text
Input: arr = [1, 3, 2, 1]
Output: [6, 2, 3, 6]
```

Example 1 builds exclusive prefixes `[1, 1, 3, 6]`.
Scanning backward, the suffix before the last element is 1, producing 6.
The next position also has suffix 1, producing 3.
Then suffix becomes 2, producing 2 at index 1.
Finally suffix becomes 6, producing 6 at index 0.
The completed answer is `[6, 2, 3, 6]`.

## Complexity

Two scans take O(n) time.
Python reuses its O(n) result list, with O(1) additional working state.
Java retains an O(n) long prefix array and an O(n) integer answer array.

## Edge cases

Two or more zeros make every exclusive product zero.
With exactly one zero, only its own position can have a nonzero result.
Empty prefixes and suffixes have product one.

## Common mistakes

Updating prefix or suffix before writing the current answer accidentally includes arr[i].
Modulo arithmetic does not make ordinary division valid.

## Language notes

Python integers handle intermediate multiplication.
Java multiplies long values before taking the modulus, avoiding overflow from int multiplication.
