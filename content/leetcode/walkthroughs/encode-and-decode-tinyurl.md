## Intuition
The local codec can use a stateful counter as a short identifier and a map to retain the original URL.
Decoding is a direct lookup in the same codec instance.

## Brute force
Returning the original URL would satisfy this local round-trip contract, but would not create a compact identifier for a long URL.
Alternatively, searching a list of identifier-URL pairs on every decode costs O(U) pair checks after U encodes.
A generated identifier plus a hash map supports direct lookup while preserving the complete original text.

## Approach
1. Use the current map size as the next numeric identifier.
2. Store the short URL to long URL mapping.
3. Return the short URL.
4. Decode by looking up the short URL in that same instance.

## Walkthrough
Example 1 uses the URL `https://example.org/articles/trees`.
The codec map is empty, so `encode` creates `https://tiny.local/0` and stores the original URL under it.
The round-trip validator then calls `decode` on that short key using the same codec object.
The map returns the original URL exactly, including its scheme and path.
The result of the round trip is therefore the original example URL.

## Complexity
After U encodes, creating and hashing a numeric short key takes O(log(U + 2)) character work.
Map access has expected constant probe count, with O(log(U + 2)) key-processing time for encode or decode.
Stored keys and original URL text use O(U log(U + 2) + L) space, where L is the total original text length.

## Edge cases
Repeated URLs receive new keys because each encode operation uses the next counter.
URL query strings, fragments, ports, and case are stored without parsing or normalization.
Decoding a key outside the codec's map is outside the local contract.

## Common mistakes
Creating a new map in `decode` loses state between operations.
Reusing an identifier for a different URL makes an older encoded value decode incorrectly.
Random identifiers require collision detection before inserting a new mapping.

## Language notes
Python uses a dictionary and string conversion for the counter.
Java uses `HashMap<String, String>` and the same stateful `Codec` contract without redefining helpers.
