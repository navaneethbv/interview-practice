## Intuition
Every customer pays 5, so a 5-dollar bill creates change-making flexibility while a 10-dollar bill can only help with a 20-dollar payment.
For a 20-dollar bill, spend a 10 and a 5 when possible, preserving smaller bills for later 10-dollar customers.
If that combination is unavailable, three 5-dollar bills are the only alternative.

## Brute force
Tracking every individual bill and searching combinations for each customer adds unnecessary state.
The only useful denominations are 5 and 10, and the greedy preference for a 10 plus a 5 preserves more 5-dollar bills.

## Approach
1. Count available 5-dollar and 10-dollar bills.
2. For a 5, add one 5 bill.
3. For a 10, spend one 5 and receive one 10, failing if no 5 exists.
4. For a 20, spend a 10 and 5 when possible, otherwise spend three 5s.
5. Return false immediately when the 5-dollar count becomes negative.

## Walkthrough
Example 1 is `[5, 5, 5, 10, 20]`.
The first three customers leave three 5-dollar bills.
The 10-dollar customer spends one 5 and leaves two 5s plus one 10.
For the final 20, the cashier spends that 10 and one 5, so the sequence succeeds.

## Complexity
The bills are processed once, giving O(N) time.
Only two counters are stored, so extra space is O(1).

## Edge cases
A first bill of 10 or 20 cannot receive change and returns false.
A 20 can use three 5s when no 10 is available.
The method stops at the first impossible customer because later bills cannot repair an earlier failure.

## Common mistakes
Using three 5s before a 10 plus 5 leaves fewer small bills than necessary.
Treating a 20 as changeable with one 5 misunderstands the five-dollar price.
Checking only the total cash instead of denomination counts can accept impossible change.

## Language notes
Python uses named counters and branches directly on each bill value.
Java mirrors those counters with primitive integers and explicit braces.
No queue of bills is needed because bill order matters only through the available denominations.
