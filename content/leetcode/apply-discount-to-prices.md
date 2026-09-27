# Apply Discount to Prices

A price word is a dollar sign immediately followed by one or more decimal digits and nothing else.
Apply the given percentage discount to every price word, formatting each updated price with exactly two decimal places.
Leave other words unchanged and preserve their single-space separation.

## Examples

### Example 1

```text
Input: sentence = "pay $100 or $5 today", discount = 20
Output: "pay $80.00 or $4.00 today"
Explanation: Both valid price words receive a twenty-percent discount.
```

### Example 2

```text
Input: sentence = "$10 $x 10$ $", discount = 100
Output: "$0.00 $x 10$ $"
Explanation: Only the first word matches the price format.
```

## Constraints

- 1 <= sentence.length <= 100,000
- Words are separated by single spaces with no outer spaces.
- 0 <= discount <= 100
- Every valid price is at most 10^10.
