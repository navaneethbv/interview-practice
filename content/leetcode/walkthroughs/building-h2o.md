## Intuition

Think of a molecule as a room with two hydrogen seats and one oxygen seat. Atoms enter only while their seat type is free; when all three seats are taken the molecule is released and the room empties for the next one.

## Approach

1. Count hydrogens and oxygens in the current molecule under one lock.
2. A hydrogen waits while two hydrogens are already in; an oxygen waits while one oxygen is in.
3. On entry, release the atom and increment its count.
4. When the counts reach two and one, reset both to zero and wake waiting atoms.

## Walkthrough

For `OOHHHH`, the first oxygen enters; the second waits. Two hydrogens enter, completing the molecule, which resets the counts. The second oxygen and the last two hydrogens form the second molecule.

## Complexity

- Time: O(1) per atom apart from waiting.
- Space: O(1).

## Edge cases

- Atoms may arrive in any order and still form molecules.
- Releasing inside the lock keeps one molecule's three releases together.

## Common mistakes

- Releasing an atom outside the lock, so atoms of the next molecule interleave.
- Resetting counts before the third atom has been released.
- Using two separate semaphores without a molecule boundary; a third hydrogen can slip into the next group early.

## Language notes

Java reference: two semaphores limit seats and a `CyclicBarrier` of 3 keeps a molecule together until all three have been released. C++ and Go: a mutex with a condition variable and two counters.
