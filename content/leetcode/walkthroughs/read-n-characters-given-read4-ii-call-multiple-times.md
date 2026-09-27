## Intuition

When reads can be called repeatedly, a four-character block may contain more data than one request consumes.
Keep those unread characters in a persistent buffer for the next call.

## Brute force

Discarding the remainder after each call loses file characters.
Re-reading from the file is impossible because read4 advances the shared file pointer.

## Approach

1. Maintain a pending character queue or fixed buffer with current bounds.
2. Refill it with read4 only when empty.
3. Move pending characters into buf until n is satisfied.
4. Preserve any remainder for the next invocation.

## Walkthrough

Example 1:

For file abcde, the first read asks for one character and returns a while buffering b,c,d.
The next read asks for three and consumes the buffered b,c,d without another read4 call.
The final read refills once for e and returns it.

## Complexity

Each file character is read and copied at most once, so character work is O(F) for F consumed characters, plus O(Q) call overhead for Q reads.
Persistent pending storage is O(1), bounded by four characters.
Output buffers are supplied by the caller and are not counted as internal state.

## Edge cases

An empty file leaves the pending buffer empty and returns zero.
A request larger than the remaining file returns only available characters.
Repeated one-character calls still preserve order.

## Common mistakes

Do not refill while pending characters remain.
Reset the pending index after each successful read4 call.
Stop cleanly when read4 returns zero.

## Language notes

Python uses deque for pending characters.
Java uses a four-character array with index and size fields and extends Reader4.
