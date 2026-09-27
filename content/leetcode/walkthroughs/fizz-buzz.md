## Intuition

Each number may contribute Fizz for divisibility by 3 and Buzz for divisibility by 5.
Concatenate every applicable word.
When neither applies, the decimal number itself is returned.

## Brute force

A repeated divisibility test with separate special-case loops adds unnecessary passes.
The direct loop tests each number once and constructs its output label.
There is no need to precompute multiples.

## Approach

1. Iterate values from 1 through n.
2. Start an empty text for the current value.
3. Append Fizz when divisible by 3 and Buzz when divisible by 5.
4. Append the decimal value when the text is still empty.
5. Add the text to the result list.

## Walkthrough

Example 1 runs through 5.
Values 1 and 2 produce their decimal text.
Value 3 produces Fizz, value 4 produces 4, and value 5 produces Buzz.
The returned list is [1,2,Fizz,4,Buzz].

## Complexity

The loop performs O(n) iterations and O(n log n) character work when decimal conversion cost is included.
The returned list and strings use O(n log n) output space in the same digit-count model.
Only one temporary text is built per value.
The returned values are strings even when they contain digits.

## Edge cases

A multiple of both 3 and 5 produces FizzBuzz.
A value divisible by neither produces its decimal representation.
n is positive under the local constraint, so the loop always emits values from 1 through n.
The sequence starts at one rather than zero.

## Common mistakes

- Using if-else for 3 and 5 prevents FizzBuzz.
- Appending the number after Fizz or Buzz produces extra text.
- Testing divisibility by 15 only misses individual words.
- Returning integers for ordinary values changes the output type.

## Language notes

Python builds the text incrementally.
Java uses the combined 15 test before the individual tests.
Both return a list of strings.
