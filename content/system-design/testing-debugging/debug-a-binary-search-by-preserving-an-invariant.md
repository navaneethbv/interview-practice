## The faulty implementation

The contract is the same lower-bound search described in the previous chapter.
Find a failing input before reading the explanation.

```python
def first_at_least(values, target):
    low, high = 0, len(values)
    while low < high:
        middle = (low + high) // 2
        if values[middle] <= target:
            low = middle + 1
        else:
            high = middle
    return low
```

## Reproduce and explain

With `[1, 3, 3, 7]` and target 3, the function returns 3 rather than 1.
At `middle = 2`, the value equals the target, but the branch discards it and everything before it.
The code computes the first position strictly greater than the target.
That is a valid operation with a different contract.

## Correct the cause

```python
def first_at_least(values, target):
    low, high = 0, len(values)
    while low < high:
        middle = (low + high) // 2
        if values[middle] < target:
            low = middle + 1
        else:
            high = middle
    return low
```

Maintain a half-open candidate interval `[low, high)`.
Every excluded position before `low` has a value below the target.
Every excluded position at or beyond `high` has a value at least the target.
When the interval becomes empty, its boundary is the required insertion position.
The interval shrinks on every iteration, giving O(log n) time and O(1) extra space.

## Regression and follow-up

Keep the duplicate-equality case and the empty-array case.
Check a target larger than every value to ensure the answer can equal the array length.
For Java, use `low + (high - low) / 2` to avoid addition overflow in the midpoint expression.

Now change the contract to return the last index equal to the target, or -1 if absent.
Explain why subtracting one from an upper-bound result still requires an equality check.
The important skill is adapting the invariant when the contract changes.
