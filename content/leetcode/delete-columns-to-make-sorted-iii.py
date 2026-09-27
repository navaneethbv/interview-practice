class Solution:
    def minDeletionSize(self, strs):
        columns = len(strs[0])
        longest = [1] * columns
        for right in range(columns):
            for left in range(right):
                if all(strs[row][left] <= strs[row][right] for row in range(len(strs))):
                    longest[right] = max(longest[right], longest[left] + 1)
        return columns-max(longest)
