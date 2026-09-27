# Accounts Merge

Each account lists a name followed by email addresses.
Accounts sharing an email belong to the same person, including transitive connections.
Merge those accounts, placing the name first and the distinct emails in lexicographic order.
Different people may share a name, but connected accounts always have the same name.
Merged account groups may be returned in any order.

## Examples

### Example 1

```text
Input: accounts = [["Ana", "a@x.com", "b@x.com"], ["Ana", "b@x.com", "c@x.com"]]
Output: [["Ana", "a@x.com", "b@x.com", "c@x.com"]]
Explanation: The common email joins both records.
```

### Example 2

```text
Input: accounts = [["Ana", "a@x.com"], ["Ana", "z@x.com"]]
Output: [["Ana", "a@x.com"], ["Ana", "z@x.com"]]
Explanation: A matching name alone does not merge records.
```

## Constraints

- 1 <= accounts.length <= 1,000
- 2 <= accounts[i].length <= 10
- Names contain English letters and emails are valid nonempty addresses.
