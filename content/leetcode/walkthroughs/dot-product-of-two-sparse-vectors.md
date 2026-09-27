## Intuition

Zero coordinates contribute nothing to a dot product, so storing them wastes space.
Each SparseVector keeps only nonzero values keyed by their indexes.
Iterating one sparse map and looking up matching indexes in the other computes exactly the nonzero contributions.

## Brute force

Multiplying every coordinate scans the full vector length L even when almost every value is zero.
That takes O(L) time and stores the dense input representation.
Sparse maps make work proportional to the nonzero entries that are actually examined.

## Approach

1. During construction, insert each nonzero value into values using its index.
2. For dotProduct, iterate the entries stored in this vector.
3. Look up the same index in vec and use zero when it is absent.
4. Add the product to total.
5. Return total.

## Walkthrough

Example 1 constructs [1,0,0,2,3] and compares it with [0,3,0,4,0].

| index visited | this value | other value | contribution |
| ---: | ---: | ---: | ---: |
| 0 | 1 | 0 | 0 |
| 3 | 2 | 4 | 8 |
| 4 | 3 | 0 | 0 |

The final dot product is 8.

## Complexity

Let a and b be the numbers of nonzero entries in the two vectors.
Construction takes O(L) time when the dense constructor input is scanned.
The dot product takes O(a) expected time for this vector's map lookups and uses O(a + b) stored space across both vectors.
The returned total is a scalar.

## Edge cases

A zero vector has an empty values map and returns zero.
Nonzero values at disjoint indexes contribute zero.
A vector with one shared index contributes one product.
The vectors have equal dense lengths under the contract, so indexes remain meaningful.

## Common mistakes

- Iterating dense coordinates defeats sparse storage.
- Counting an absent index as a missing error instead of zero is incorrect.
- Storing zero values increases space without changing the result.
- Allocating a new dense vector for every dot product wastes time.

## Language notes

Python uses a dictionary comprehension and dictionary get with a zero default.
Java uses `HashMap<Integer,Integer>` and getOrDefault for the same lookup behavior.
Both constructors still scan the dense input once because that is how the judge supplies vector data.
