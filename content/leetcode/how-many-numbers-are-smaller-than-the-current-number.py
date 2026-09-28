class Solution:
    def smallerNumbersThanCurrent(self, nums):
        counts = [0] * 101
        for value in nums:
            counts[value] += 1
        numbers_smaller = 0
        for value, count in enumerate(counts):
            counts[value] = numbers_smaller
            numbers_smaller += count
        return [counts[value] for value in nums]
