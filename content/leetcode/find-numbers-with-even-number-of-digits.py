class Solution:
    def findNumbers(self, nums):
        count = 0
        for value in nums:
            if len(str(value)) % 2 == 0:
                count += 1
        return count
