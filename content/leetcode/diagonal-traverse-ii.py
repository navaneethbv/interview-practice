from collections import defaultdict
class Solution:
    def findDiagonalOrder(self, nums):
        diagonals=defaultdict(list)
        for r,row in enumerate(nums):
            for c,value in enumerate(row):diagonals[r+c].append(value)
        return [v for d in sorted(diagonals) for v in reversed(diagonals[d])]
