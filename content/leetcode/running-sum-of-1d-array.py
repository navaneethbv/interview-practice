class Solution:
    def runningSum(self, nums):
        total = 0
        running_totals = []
        for value in nums:
            total += value
            running_totals.append(total)
        return running_totals
