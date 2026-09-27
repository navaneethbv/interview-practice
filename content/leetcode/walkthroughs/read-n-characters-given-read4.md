## Intuition

read4 returns up to four characters from the file.
Repeatedly read blocks and copy only the number still requested into buf.

## Brute force

Calling a one-character reader n times would perform unnecessary calls and does not use the supplied API.
Reading in blocks minimizes API calls while preserving order.

## Approach

1. Allocate a temporary four-character block.
2. Call read4 while fewer than n characters have been copied.
3. Copy the smaller of the block count and remaining request.
4. Stop when read4 returns fewer than four characters.

## Walkthrough

Example 1:

For file orbit and n 3, read4 returns o,r,b,i.
The method copies only o,r,b into the three-character buffer.
It returns 3 without copying the fourth character.

## Complexity

For n requested characters, the method takes O(n) copy time and uses O(1) temporary space.
Each read4 call handles up to four characters.
The caller's buffer is the output storage.

## Edge cases

An empty file returns zero.
If the file ends early, fewer than n characters are returned.
The method is single-use, so unread characters do not need persistent storage.

## Common mistakes

Do not copy beyond n or beyond buf.
Stop after a short read because it signals end of file.
Do not call an unavailable helper with a different signature.

## Language notes

Python calls the harness read4 function.
Java extends Reader4 and calls its supplied read4 method.
The temporary block is discarded only after its requested prefix has been copied.
The copied prefix always occupies the beginning of buf.
