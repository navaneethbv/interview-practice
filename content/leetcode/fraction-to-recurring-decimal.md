# Fraction to Recurring Decimal

Express numerator divided by denominator as a decimal string.
Put the repeating part of a nonterminating fractional expansion in parentheses.
Omit the decimal point for an integer result, and place a minus sign only on a negative nonzero result.

## Examples

```text
Input: numerator = 1, denominator = 2
Output: "0.5"
Explanation: One half has a terminating expansion.
```

```text
Input: numerator = 2, denominator = 3
Output: "0.(6)"
Explanation: The digit 6 repeats forever.
```

## Constraints

- numerator and denominator are signed 32-bit integers.
- denominator is nonzero.
- The resulting representation has fewer than 10,000 characters.
