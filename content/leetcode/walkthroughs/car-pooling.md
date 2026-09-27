## Intuition

Each trip changes the passenger count at its pickup and drop-off locations.
A prefix sum over those changes reveals the occupancy after every location.

## Brute force

Simulating each trip across every location can take O(T times coordinate range) time.
It repeatedly updates positions that a difference array can summarize once.

## Approach

1. Add passengers at each start and subtract them at each end.
2. Scan locations from zero through 1000 while accumulating passengers.
3. Return false as soon as capacity is exceeded.

## Walkthrough

Example 1:

Trip [2,1,5] adds two passengers at 1 and removes them at 5.
Trip [3,3,7] adds three at 3.
The occupancy reaches five between locations 3 and 5, exceeding capacity four, so the answer is false.

## Complexity

For T trips, updates take O(T) time and the fixed coordinate scan takes O(1001) time.
The difference array uses O(1001) space.
Python and Java use the same bounded coordinate representation.

## Edge cases

Passengers leave before later passengers board at the same location because the end change is applied at that coordinate.
A capacity larger than every prefix occupancy is valid.
Trips with the same start or end are combined by the change array.

## Common mistakes

Do not subtract at end plus one because the trip excludes its end location.
Do not check only total passengers without considering overlap.
Use the constraint's maximum coordinate when sizing the array.

## Language notes

Python stores integer changes in a list.
Java uses a primitive int array because the maximum occupancy fits the stated constraints.
