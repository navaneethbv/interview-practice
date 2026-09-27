# Encode and Decode Strings

Implement `Codec.encode(strs)` to represent a list of strings as one string and `Codec.decode(s)` to recover the original list.
Preserve the order, duplicates, empty strings, and every character.
Choose any unambiguous encoding format.
Encoding and decoding use separate Codec instances, so the encoded string must contain all required information.
The judge displays the decoded list rather than the encoded text.

## Constraints

- `0 <= strs.length <= 200`.
- Each string has 0 to 200 characters.
- Strings may contain any ASCII characters, including digits and separators.

## Examples

### Example 1

```text
Input: strs = ["hi", "#", ""]
Output: ["hi", "#", ""]
Explanation: Separators and empty strings must survive decoding.
```

### Example 2

```text
Input: strs = []
Output: []
Explanation: An empty list differs from a list containing one empty string.
```
