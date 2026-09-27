## Intuition

The shared suffix has the same node identities in both lists.
The two private prefixes may have different lengths, so starting both pointers at their heads does not align the suffix.
When a pointer reaches the end, redirect it to the other head.
Each pointer then traverses its own prefix followed by the other prefix, making their total traveled lengths equal.

## Brute force

A brute-force method could compare every node in A with every node in B by identity.
For list lengths A and B, that takes O(A * B) time and still requires careful identity comparison.
Comparing node values would be incorrect because equal values can belong to separate nodes.
The pointer switch removes the nested comparison.

## Approach

1. Initialize pointer_a and pointer_b at the two heads.
2. Advance each pointer to its next node.
3. When one pointer is null, restart it at the other list's head.
4. Stop when the pointers are identical, including when both are null.
5. Identity is checked with is in Python and == in Java because both compare object references for this node type.

## Walkthrough

In Example 1, A is [2,5,8,9] and B is [7,8,9] after its separate prefix joins A at index 2.
Pointer A first traverses 2, 5, 8, and 9, then switches to B.
Pointer B traverses 7, 8, and 9, then switches to A.
After the unequal prefix lengths are canceled, both pointers reach the shared node 8 together.
The returned suffix is [8,9].
In Example 2, the values are equal in places but no node objects are shared, so both pointers eventually become null.

## Complexity

Each pointer traverses at most A plus B nodes, so the time complexity is O(A + B).
The algorithm uses O(1) extra space.
It does not mutate either list or allocate replacement nodes.

## Edge cases

Lists with equal lengths align immediately when they share a suffix.
A shared head is returned without traversing a separate prefix.
Two completely separate lists return null.
Equal values without shared identity do not count as an intersection.

## Common mistakes

Do not compare val fields instead of node identity.
Do not return the first equal-valued pair.
Do not alter links while trying to align lengths.
Do not forget to switch a pointer after it reaches null, or the loop will terminate incorrectly.

## Language notes

Python uses is to make the identity contract explicit.
Java's == compares the ListNode references supplied by the harness.
The local test builder attaches B's numeric tail to the actual nodes from A, so the reference comparison matches the specification.
