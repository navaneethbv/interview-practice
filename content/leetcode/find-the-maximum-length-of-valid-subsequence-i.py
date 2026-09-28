class Solution:
    def maximumLength(self, nums):
        even_count = sum(value % 2 == 0 for value in nums)
        alternating_length = 1
        for previous, current in zip(nums, nums[1:]):
            if previous % 2 != current % 2:
                alternating_length += 1
        odd_count = len(nums) - even_count
        return max(even_count, odd_count, alternating_length)
