## Intuition

The sort key comes from a fixed small interval of years rather than an unbounded domain.
Create one bucket per possible year and append books to those buckets in input order.
Reading the buckets chronologically gives a stable sorted result without comparison sorting.

## Brute force

Use a general stable comparison sort by parsed publication year.
That takes O(n log n) comparisons, while the bounded year domain permits a linear scan plus fixed bucket overhead.

## Approach

Allocate buckets for every year from `FIRST_YEAR` through `LAST_YEAR`, inclusive.
For each book, parse its fifth field as an integer and subtract FIRST_YEAR to obtain the bucket index.
Append the entire book record to that bucket.
After distributing all books, iterate buckets in increasing index order and append their records to the output.
Books sharing a year remain ordered by their original insertion sequence, giving the required stability.
Other fields are carried through unchanged and never used as tie breakers.
The algorithm rearranges references to book records rather than rebuilding their textual contents.

## Walkthrough

Example 1 places Shadow in the 2020 bucket.
Whispers enters the 2018 bucket first, then Echoes is appended behind it.
Reading buckets in chronological order emits Whispers, then Echoes, then Shadow.
Whispers remains before Echoes even though a different title or author ordering might suggest another arrangement.
Their shared publication year requires preserving their original order.

## Complexity

For n books and Y possible years, both references take O(n + Y) time and O(n + Y) space.
Here Y is 1026, so runtime is linear in the number of books with fixed domain overhead.
Year strings have bounded length under the contract.

## Edge cases

Empty input returns an empty result.
Books from the first and last allowed years map to the first and last valid buckets.

## Common mistakes

Include both endpoint years when allocating buckets.
Sorting same-year entries by another field would violate stability.

## Language notes

Python parses the year with `int` and flattens using a comprehension.
Java uses `Integer.parseInt` and `addAll`, preserving each bucket's insertion order in both languages.
