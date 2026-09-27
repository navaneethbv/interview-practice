# Design Browser History

Start at homepage.
`visit(url)` opens a new page and discards all forward history.
`back(steps)` and `forward(steps)` move as many available entries as possible up to steps and return the resulting URL.
Void operations display `null`.
Each test uses a fresh instance.

## Constraints

- URLs contain 1 to 20 lowercase letters or dots.
- Steps range from 1 to 100.
- At most 5000 operations occur.

## Examples

### Example 1

```text
Input: ctor = ["a.com"], ops = ["visit", "visit", "back", "visit", "forward"], args = [["b.com"], ["c.com"], [1], ["d.com"], [2]]
Output: [null, null, "b.com", null, "d.com"]
Explanation: Visiting d.com after going back discards c.com.
```

### Example 2

```text
Input: ctor = ["home"], ops = ["back", "forward"], args = [[9], [9]]
Output: ["home", "home"]
Explanation: Moves stop at the history boundaries.
```
