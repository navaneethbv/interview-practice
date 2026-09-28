class Solution:
    def countAllRemainders(self, arr):
        last = [-1, -1, -1]
        total = 0
        for index, value in enumerate(arr):
            last[value % 3] = index
            total += min(last) + 1
        return total
