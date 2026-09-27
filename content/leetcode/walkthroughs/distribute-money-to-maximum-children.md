## Intuition
Give every child one dollar first, then each additional block of seven dollars upgrades one child from one to eight.
That greedy upgrade maximizes the count of eight-dollar children.
The only repairs concern leftover dollars that would force a remaining child to receive four, or would leave money after everyone is already full.

## Brute force
Enumerating every distribution of up to 200 dollars among up to 30 children would be exponential in the number of children.
The fixed minimum of one dollar makes the useful choices depend only on seven-dollar upgrades and the small leftover adjustment.

## Approach
1. Return -1 if there is not one dollar for every child.
2. Let `extra = money - children` and take as many seven-dollar upgrades as possible, capped by `children`.
3. Compute the remaining children and dollars.
4. Reduce the upgrade count when all children are full but money remains, or exactly one child remains and its leftover would make four dollars.

## Walkthrough
Example 1 has 16 dollars and 2 children.
Give each child one dollar, leaving `extra = 14`.
Two seven-dollar upgrades are possible, so both children reach eight and no money remains.
The answer is 2.
For Example 2, 12 dollars leaves `extra = 10`, which initially suggests one full share and three leftover dollars.
The one remaining child would then receive four dollars, so the repair reduces the full-share count to zero.

## Complexity
The calculation uses O(1) time and O(1) space.
No distribution array is needed because only counts of upgraded and remaining children matter.

## Edge cases
Money below the child count is impossible.
Exactly one dollar per child gives zero eight-dollar shares.
A leftover amount after all children reach eight forces one upgrade back down.

## Common mistakes
Dividing total money by eight forgets that every child must receive at least one.
Ignoring the forbidden amount four accepts invalid distributions.
Allowing more upgrades than children invents nonexistent recipients.

## Language notes
Python and Java use integer division for seven-dollar upgrades.
Java keeps the intermediate counts in `int`, which is sufficient for the stated bounds.
Both references encode the same two special repair cases explicitly.
