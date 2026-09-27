## Intuition

Each pair of input digits contributes to one decimal position in the product.
An array indexed by the two digit positions can accumulate those contributions before carries are propagated.
This performs grade-school multiplication without converting either string to a machine integer.

## Brute force

Converting both strings to integers and multiplying is unavailable for inputs longer than the integer range.
A repeated addition solution would take time proportional to one numeric operand rather than its digit count.
Digit multiplication uses O(mn) operations for lengths m and n.

## Approach

1. Allocate m plus n digit slots initialized to zero.
2. Multiply every digit pair and add the product to its low-position slot.
3. Sweep right to left, moving each slot's carry into the preceding slot.
4. Skip leading zero slots while preserving one zero for a zero product.
5. Join the remaining decimal digits.

## Walkthrough

Example 1 multiplies 12 by 34.
The pair 2 times 4 contributes 8 to the units slot.
The other pairs contribute 6 to the tens, 8 to the tens carry path, and 3 to the hundreds.
After carrying from right to left, the digits are 4, 0, and 8.
The returned product is 408.

## Complexity

For m and n input lengths, digit-pair multiplication takes O(mn) time.
Carry propagation and output construction take O(m plus n) additional time.
The digit array and returned string use O(m plus n) space.
The algorithm never allocates numeric values proportional to the represented product.

## Edge cases

A zero input produces the string 0.
Leading zeroes are removed from the result while one zero is retained when needed.
Unequal input lengths use the same position arithmetic.
The result can be much longer than either machine integer type.

## Common mistakes

- Carrying after each pair without accumulating all contributions can lose a previous carry.
- Keeping every leading zero returns a noncanonical product.
- Reversing the digit positions puts contributions in the wrong place.
- Parsing the entire input with int violates the arbitrary-length contract.

## Language notes

Python reads each digit with int and joins the normalized digit list.
Java reads characters with charAt and appends nonleading digits to StringBuilder.
Neither implementation converts the complete input into a built-in integer.
