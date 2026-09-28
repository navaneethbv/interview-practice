# Current URL

`actions` records browser actions, each `[type, value]`.
A `"go"` action visits the URL `value`; the first action is always `"go"`.
A `"back"` action goes back `value` times, where `value` is a positive integer written as a string; going back past the first URL stays on it.
Return the URL the browser shows after all actions.

## Examples

### Example 1

```text
Input: actions = [["go", "google.com"], ["go", "wikipedia.com"], ["go", "amazon.com"], ["back", "4"], ["go", "youtube.com"], ["go", "netflix.com"], ["back", "1"]]
Output: "youtube.com"
```

### Example 2

```text
Input: actions = [["go", "a.com"]]
Output: "a.com"
```

## Constraints

- `1 <= actions.length <= 10^5`
