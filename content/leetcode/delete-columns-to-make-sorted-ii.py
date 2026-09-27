class Solution:
    def minDeletionSize(self, strs):
        settled = [False] * (len(strs) - 1)
        removed = 0
        for column in range(len(strs[0])):
            causes_inversion = any(
                not settled[index] and strs[index][column] > strs[index + 1][column]
                for index in range(len(settled))
            )
            if causes_inversion:
                removed += 1
                continue
            for index in range(len(settled)):
                settled[index] |= strs[index][column] < strs[index + 1][column]
        return removed
