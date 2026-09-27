# Number of Atoms

Parse a valid chemical formula containing atom names, optional positive counts, and nested parenthesized groups with optional multipliers.
Atom names begin with an uppercase letter followed by zero or more lowercase letters.
Return names in lexicographic order, followed by total counts only when greater than one.

## Examples

### Example 1

```text
Input: formula = "Mg(OH)2"
Output: "H2MgO2"
Explanation: The group contributes two O and two H atoms.
```

### Example 2

```text
Input: formula = "K4(ON(SO3)2)2"
Output: "K4N2O14S4"
Explanation: Apply each group multiplier before combining counts.
```

## Constraints

- 1 <= formula.length <= 1,000
- The formula is valid and every explicit count is greater than 1.
- Each total atom count fits a signed 32-bit integer.
