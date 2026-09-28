# Baby Names

`names[i]` was given to `counts[i]` babies, and each name appears once in `names`.
`synonyms` lists pairs of names that are spelled differently but mean the same name; synonymy is transitive.
Combine the counts of names that are synonyms, directly or through other synonyms.

Return one string `"Name:total"` for every group that includes at least one entry of `names`, in any order.
Use the alphabetically smallest name in the group, including names that only appear in `synonyms`.

## Examples

### Example 1

```text
Input: names = ["John", "Jon", "Chris", "Kris", "Christopher"], counts = [15, 12, 13, 4, 19], synonyms = [["Jon", "John"], ["John", "Johnny"], ["Chris", "Kris"], ["Chris", "Christopher"]]
Output: ["John:27", "Chris:36"]
```

### Example 2

```text
Input: names = ["Ann"], counts = [3], synonyms = []
Output: ["Ann:3"]
```

## Constraints

- `1 <= names.length == counts.length <= 10,000`
- `0 <= synonyms.length <= 10,000`
- `1 <= counts[i] <= 100,000`
- Names contain English letters and are compared case-sensitively.
