class Solution:
    def repeatedNTimes(self, nums):
        seen = set()
        for value in nums:
            if value in seen:
                return value
            seen.add(value)
