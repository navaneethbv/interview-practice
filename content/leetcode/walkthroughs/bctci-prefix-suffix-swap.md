## Intuition

Write the original array as A followed by B, where A is the first third and B the remaining two thirds.
The desired result is B followed by A with each block's internal order preserved.
Reversal moves blocks while a second reversal within each block restores their orientation.

## Brute force

Copy the suffix followed by the prefix into a new array and overwrite the input.
This is linear in time but uses O(n) additional space, violating the requested constant-space transformation.

## Approach

Reverse the entire array first.
This changes AB into reversed B followed by reversed A.
The first two thirds now hold reversed B, so reverse that segment to recover B.
Reverse the final third to recover A.
The helper swaps the two endpoint characters and moves inward until the segment is reversed.
All three reversals operate on the same array, and no temporary array is created.
The block boundaries are determined after the whole-array reversal, which explains why the first corrected segment has length two thirds rather than one third.

## Walkthrough

Example 1 spells `badreview`, with prefix `bad` and suffix `review`.
Reversing the whole array produces `weiverdab`.
Reversing its first six characters produces `reviewdab`.
Reversing the last three characters produces `reviewbad`, the required output.
The letters within both `review` and `bad` end in their original relative order.

## Complexity

The whole-array reversal takes O(n), and the two segment reversals together take another O(n).
Both references therefore use O(n) time and O(1) auxiliary space.
The method mutates the provided character array and does not return a replacement array.

## Edge cases

An empty array makes all reversal loops terminate immediately.
A three-character array rotates its first character to the end.
The divisible-by-three guarantee fixes an exact prefix size.

## Common mistakes

Reversing only the whole array reverses each block's contents incorrectly.
Use inclusive reversal endpoints consistently to avoid moving a boundary character into the wrong block.

## Language notes

Python swaps characters directly with tuple assignment.
Java uses a temporary `char`, and integer division gives the exact block boundaries under the length constraint.
