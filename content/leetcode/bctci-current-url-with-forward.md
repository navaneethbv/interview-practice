# Current URL with Forward

`actions` records browser actions, each `[type, value]`, where `type` is `"go"`, `"back"`, or `"forward"`.
A `"go"` action visits a URL and clears any forward history; the first action is always `"go"`.
`"back"` and `"forward"` move `value` steps, where `value` is a positive integer written as a string, stopping at the oldest or newest page available.
Return the URL shown after all actions.

## Examples

### Example 1

```text
Input: actions = [["go", "google.com"], ["go", "wikipedia.com"], ["back", "1"], ["forward", "1"], ["back", "3"], ["go", "netflix.com"], ["forward", "3"]]
Output: "netflix.com"
```

### Example 2

```text
Input: actions = [["go", "a.com"], ["go", "b.com"], ["back", "1"]]
Output: "a.com"
```

## Constraints

- `1 <= actions.length <= 10^5`
- `1 <= steps <= 10^9`
