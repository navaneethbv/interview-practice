## Intuition

The two words are implicit subsequences of the same string.
One pointer can read lowercase letters forward while another reads uppercase letters backward, comparing corresponding letters without materializing either word.

## Brute force

Extracting the lowercase and uppercase words, reversing one, and comparing them takes linear extra space.
The reference obtains the same ordered comparisons by skipping unwanted characters directly in the original string.

## Approach

Initialize `lower` at zero and `upper` at the final index.
Repeat exactly half the string length times.
Advance `lower` until lowercase and retreat `upper` until uppercase.
Compare the lowercase letter with the normalized uppercase letter, then advance both for the next pair.

## Walkthrough

Example 1's lowercase sequence in `haDrRAHd` is h, a, r, d.
Reading uppercase letters backward yields H, A, R, D.
The comparisons h/H, a/A, r/R, and d/D all match after lowercasing the uppercase side, so the result is true.

## Complexity

Each pointer moves monotonically across at most n characters, giving O(n) total time even with inner skipping loops.
Only two indices and a loop counter are stored, so auxiliary space is O(1).

## Edge cases

The empty string produces zero comparisons and returns true.
Letters of the same case may form long adjacent groups.
The pointers may cross because they traverse separate filtered sequences; their relative positions do not determine when matching is complete.

## Common mistakes

Do not compare mirrored raw positions, since cases may be interleaved arbitrarily.
Do not stop when the pointers meet.
The guarantee that exactly half the characters have each case ensures each requested next lowercase and uppercase letter exists.

## Language notes

Python uses `islower`, `isupper`, and `lower` on characters.
Java uses `Character` case helpers on `charAt` results.
The English letter constraint keeps these operations aligned and avoids locale dependent or multi character case conversion questions.
