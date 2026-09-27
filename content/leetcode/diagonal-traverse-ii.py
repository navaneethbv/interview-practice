from collections import defaultdict


class Solution:
    def findDiagonalOrder(self, nums):
        diagonals = defaultdict(list)
        for row_index, row in enumerate(nums):
            for column, value in enumerate(row):
                diagonals[row_index + column].append(value)

        result = []
        for diagonal in sorted(diagonals):
            result.extend(reversed(diagonals[diagonal]))
        return result
