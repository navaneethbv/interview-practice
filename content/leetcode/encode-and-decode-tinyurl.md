# Encode and Decode a URL

Implement a `Codec` with `encode(longUrl)` and `decode(shortUrl)`.
Encoding returns a string that your decoder can use to recover the original URL exactly.
You may keep an in-memory mapping inside the Codec object and choose your own encoding format.
The judge encodes a URL and decodes the result using that same object, then compares the recovered URL.
No network requests are involved.

## Examples

```text
Input: longUrl = "https://example.org/articles/trees"
Output: "https://example.org/articles/trees"
Explanation: Decoding the chosen short representation restores the complete URL.
```

```text
Input: longUrl = "https://a.test/x?tag=one&tag=two"
Output: "https://a.test/x?tag=one&tag=two"
Explanation: Query parameters and their order must survive the round trip.
```

## Constraints

- URLs are nonempty strings of at most 10,000 characters.
- Preserve every character, including query strings, escapes, and fragments.
- decode receives only strings produced by encode on the same object.
- There is no required encoding alphabet or exact short URL format.
