## Intuition

Prefix sums turn an inclusive range into the difference of two boundaries.
prefix[k] stores the sum of the first k numbers, so the sum from left through right is prefix[right + 1] minus prefix[left].
The array is immutable, which makes this preprocessing safe for every later query.

## Brute force

A direct query could loop from left to right and add each selected value.
One query would cost O(n) in the worst case, and q queries could cost O(nq).
Repeated queries over the same immutable data are exactly the case where prefix preprocessing helps.

## Approach

1. Create prefix with an initial zero.
2. For each input value, append the previous prefix plus that value.
3. For sumRange, use the prefix entry just after right and subtract the entry before left.
4. The difference removes every element before left and leaves the inclusive range.

## Walkthrough

For Example 1, nums is [2,-1,4,3].
The prefix array becomes [0,2,1,5,8].
The query [0,2] returns prefix[3] minus prefix[0], which is 5.
The query [1,3] returns prefix[4] minus prefix[1], which is 6.
The same prefix array serves both queries without changing the input.

## Complexity

Construction takes O(n) time and stores O(n) prefix values.
Each sumRange query takes O(1) time.
The stated values and lengths keep every promised result within the Java int return range.

## Edge cases

A one-element array has two prefix boundaries and supports [0,0].
Negative values naturally subtract from the prefix.
A range containing zeros returns zero when appropriate.
The indices are inclusive and guaranteed valid.

## Common mistakes

Do not subtract prefix[right] instead of prefix[right + 1].
Do not forget the initial zero boundary.
Do not mutate the original array while answering queries.
Do not rebuild a prefix array inside sumRange.

## Language notes

Python stores prefix values in a list and returns the boundary difference.
Java stores them in an int array and uses the same indexing formula.
The design class remains NumArray with the required constructor and sumRange method.
