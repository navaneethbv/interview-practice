# HTTP Route Matching

Implement `Router()` with `register(pattern)` and `match(path)`.

A pattern consists of slash-separated segments. A segment is either a case-sensitive literal or a parameter such as `{id}` that matches exactly one nonempty segment. A path matches only if it has the same number of segments and all literals match.

Return the registered pattern with the most literal segments. Break ties by earliest registration. Registering the identical pattern twice is a no-op. Return the empty string if nothing matches. Return the pattern itself, not extracted parameter values.

## Constraints

- Up to 1,000 operations; each pattern or path has at most 20 segments of at most 50 characters.
- All strings start with `/`. Except for the root `/`, there are no empty segments or trailing slashes.
- Parameter syntax occupies a whole segment; names contain letters. Input paths contain no braces, query strings or URL encoding.

## Examples

### Example 1

Register `/users/{id}` and `/users/me`. Matching `/users/me`, `/users/42`, `/posts/42` yields `/users/me`, `/users/{id}`, `""`.

### Example 2

Register `/{x}/b`, then `/a/{y}`. Both match `/a/b` with one literal, so return `/{x}/b`.

## Follow-up

Use a trie to reduce scanning, while preserving the stated precedence rules.

## Source and scope

Original practice contract based on the public topic reported at [Hello Interview](https://www.hellointerview.com/community/questions/http-route-matching/cmou3jp0m13rl0cadz84s19xd), observed October 12, 2026. API choices and test cases are authored for this site; this is not a reproduction of the source question or a claim that every follow-up is covered.
