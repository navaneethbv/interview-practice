class Solution:
    def totalHammingDistance(self, nums):
        total_distance = 0
        for bit in range(30):
            ones = sum((number >> bit) & 1 for number in nums)
            zeros = len(nums) - ones
            total_distance += ones * zeros
        return total_distance
