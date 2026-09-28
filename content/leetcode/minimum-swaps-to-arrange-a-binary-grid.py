class Solution:
    def minSwaps(self, grid):
        size = len(grid)
        trailing_zeros = []
        for row in grid:
            count = 0
            for value in reversed(row):
                if value:
                    break
                count += 1
            trailing_zeros.append(count)

        swaps = 0
        for row in range(size):
            required = size - row - 1
            candidate = row
            while candidate < size and trailing_zeros[candidate] < required:
                candidate += 1
            if candidate == size:
                return -1
            swaps += candidate - row
            trailing_zeros.insert(row, trailing_zeros.pop(candidate))
        return swaps
