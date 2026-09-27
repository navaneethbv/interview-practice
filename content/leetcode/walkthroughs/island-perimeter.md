## Intuition
Each land cell starts with four sides.
Every shared side between two adjacent land cells is counted twice, so subtract two for each shared edge.

## Brute force
A direct neighbor check can count exposed sides for every land cell.
That already runs in O(RC) time and O(1) extra space, so there is no slower practical brute force needed here.
The chosen edge-count form visits the same grid once.

## Approach
1. Count land cells.
2. Count horizontal shared edges within each row.
3. Count vertical shared edges between consecutive rows.
4. Return four times land minus twice shared edges.

## Walkthrough
Example 1 is a two by two block of ones.
There are four land cells, contributing 16 initial sides.
The top row has one shared edge and the bottom row has one.
The vertical scan finds one shared edge in each column, for four shared edges total.
Subtracting eight from 16 gives perimeter 8.

## Complexity
For R rows and C columns, the scan takes O(RC) time.
The algorithm uses O(1) auxiliary space beyond the input grid.
The returned perimeter uses an integer value and no output collection.

## Edge cases
A single land cell has perimeter four.
A single row or column is handled by the missing-neighbor loops naturally.
Water cells contribute neither land nor shared edges.

## Common mistakes
Subtracting one per shared edge leaves each shared side counted once.
Checking only horizontal neighbors misses vertical connections.
Assuming the island must be rectangular gives wrong results for bends.

## Language notes
Python's integer booleans contribute as zero or one in the arithmetic.
Java explicitly checks for land values and uses an integer perimeter.
