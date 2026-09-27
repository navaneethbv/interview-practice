## Intuition
A peek must reveal the next value without consuming it.
Store one optional value as a buffer, and let every operation consult that buffer first.

## Brute force
A naive design could copy every remaining iterator value whenever `peek` is called.
That costs O(r) time and O(r) temporary space for r remaining values per peek.
Repeated peeks can therefore make a long operation sequence quadratic.

## Approach
1. Keep `has_buffer` and `buffer` beside the supplied iterator.
2. `peek` fills the buffer once and returns it without changing the iterator again.
3. `next` consumes the buffer when present, otherwise delegates to the iterator.
4. `hasNext` reports a buffered value or asks the underlying iterator.

## Walkthrough
Example 1 constructs the iterator over `[1, 2, 3]`.
The first `peek` pulls `1` into the buffer and returns `1`.
The second `peek` sees the buffer and returns the same `1`.
The first `next` consumes that buffered value and returns `1`.
The second `next` has no buffered value, so it delegates and returns `2`.
`hasNext` then asks the underlying iterator and returns `true` because `3` remains.
The next `next` delegates and returns `3`.
The final `hasNext` sees no buffer and no remaining iterator value, so it returns `false`.

## Complexity
Each operation is O(1) time because a value is fetched from the underlying iterator at most once.
The wrapper uses O(1) auxiliary space beyond the iterator.

## Edge cases
An empty iterator reports false without filling the buffer.
Repeated peeks return the same value until next consumes it.
Duplicate values still represent separate iterator positions.

## Common mistakes
Calling `next` inside every `peek` loses the ability to repeat a peek.
Clearing the buffer before returning it can skip the buffered value.

## Language notes
Python stores one object reference, while Java stores one boxed `Integer` reference.
The Java class implements the harness supplied `Iterator<Integer>` contract.
