class Solution:
    def subArrayRanges(self, nums):
        total = 0
        for start in range(len(nums)):
            smallest = nums[start]
            largest = nums[start]
            for end in range(start + 1, len(nums)):
                smallest = min(smallest, nums[end])
                largest = max(largest, nums[end])
                total += largest - smallest
        return total
