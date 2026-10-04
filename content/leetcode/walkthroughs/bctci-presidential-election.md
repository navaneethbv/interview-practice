## Intuition

Only the parties with the smallest vote counts participate in each merge.
A min-heap exposes those parties without sorting the entire collection after every round.
The total number of votes stays constant, so the majority threshold never needs recomputation.

## Brute force

Repeatedly sort all current parties, merge the qualifying prefix, and restart.
With many small merges, this can take quadratic-logarithmic time.

## Approach

First check whether an original party already owns strictly more than half the total.
Otherwise remove the two smallest heap entries and use the second entry's vote count as the cutoff.
Remove every remaining party tied at that cutoff too.
Sum all participating counts and select the candidate whose pre-merge count is largest, resolving equal counts lexicographically.
If the merged count is a strict majority, return that candidate.
Otherwise insert the new party and repeat.
Every round removes at least two entries and adds at most one, so the process must terminate.

## Walkthrough

Example 1 has Ada with 2 votes, Ben with 3, and Cy with 4, totaling 9.
No original party exceeds half.
The two smallest parties are Ada and Ben, giving cutoff 3 and a combined count of 5.
Ben supplies the new candidate because 3 is the larger pre-merge count.
Five exceeds half of nine, so Ben wins immediately.

## Complexity

Across all rounds, there are O(n) removals and insertions because each merge reduces the party count.
Heap work therefore takes O(n log n) time, with O(n) heap and temporary storage.
Candidate comparisons also depend on name length, bounded here by twenty letters.

## Edge cases

One initial party already has a majority.
Equal counts at the cutoff all participate, potentially merging more than two parties.
Exactly half is not a win.

## Common mistakes

Choose the retained candidate using pre-merge votes, not the new combined total.
Do not stop after removing only two parties when cutoff ties remain.

## Language notes

Python stores count/name tuples and creates merged tuples.
Java stores indices and mutates their backing vote/name entries only while the corresponding index is outside the heap.
