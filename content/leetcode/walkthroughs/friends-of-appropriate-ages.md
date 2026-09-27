## Intuition

Request eligibility depends only on the sender's and recipient's ages, so people of the same age can be counted together.
For an eligible pair of ages, multiply the number of possible senders by the number of possible recipients.
When both ages are equal, each sender must exclude themself.

## Brute force

Test every ordered pair of distinct people against the rejection rules.
This costs O(n²) time for n people, even though there are only 120 possible ages.
Grouping people by age replaces person-pair checks with a much smaller set of age-pair checks.

## Approach

1. Build `counts`, the frequency of each age.
2. Examine each sender age and recipient age.
3. Require `2 * recipient_age > sender_age + 14` and `recipient_age <= sender_age`.
4. For equal ages, subtract one from the available recipients per sender.
5. Add `sender_count * eligible` to `total` for every eligible age pair.

The rule rejecting a recipient over 100 with a sender under 100 is already implied by requiring the recipient to be no older than the sender.
Multiplying the half-age inequality by two makes the strict comparison entirely integral.

## Walkthrough

Example 1 has `ages = [16,16]`, giving `counts[16] = 2`.
The age pair `(16,16)` passes because `32 > 30` and the recipient is no older than the sender.
For each sender there are `2 - 1 = 1` eligible recipients.
The contribution is `2 * 1 = 2`, and the result is 2.
These are two directed requests, one in each direction, rather than a single undirected friendship.

## Complexity

- Time: Python O(n + D²) for D distinct ages; Java O(n + A²) for A = 120 possible ages.
- Space: Python O(D) for its frequency map; Java O(A) for its fixed array.

Both are O(n) time and O(1) auxiliary space when the bounded age domain is treated as a constant.

## Edge cases

Ages below 15 cannot send an eligible request under the strict lower bound.
One person cannot request themself.
Equal-age groups contribute `count * (count - 1)` when that age is eligible.
Eligibility need not hold in both directions for different ages.

## Common mistakes

- Counting unordered pairs loses the direction of a request.
- Using a non-strict lower-bound comparison accepts forbidden recipients.
- Subtracting only one request per equal-age group fails to remove every self-request.

## Language notes

Python uses `Counter` and visits only observed ages.
Java scans a fixed frequency array, including zero-count ages whose contributions remain zero.
At most `20000 * 19999` requests are possible, so the Java total fits in `int`.
