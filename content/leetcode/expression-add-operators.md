# Expression Add Operators

Insert binary +, -, or * operators between selected adjacent digits of num so the resulting expression equals target.
Digits must remain in their original order, and you may combine adjacent digits into an integer operand.
An operand cannot have a leading zero unless it is exactly 0.
Use normal multiplication precedence and return every valid expression, in any order.

## Examples

### Example 1

```text
Input: num = "123", target = 6
Output: ["1+2+3", "1*2*3"]
Explanation: Both addition and multiplication reach 6.
```

### Example 2

```text
Input: num = "105", target = 5
Output: ["1*0+5", "10-5"]
Explanation: The substring 05 cannot be used as one operand.
```

## Constraints

- 1 <= num.length <= 10.
- num contains decimal digits.
- target is a signed 32-bit integer.
