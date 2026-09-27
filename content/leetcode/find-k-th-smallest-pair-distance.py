class Solution:
    def smallestDistancePair(self, nums, k):
        nums.sort()
        low = 0
        high = nums[-1] - nums[0]
        while low < high:
            distance = (low + high) // 2
            if self._count_at_most(nums, distance) >= k:
                high = distance
            else:
                low = distance + 1
        return low

    def _count_at_most(self, nums, distance):
        left = 0
        pairs = 0
        for right, value in enumerate(nums):
            while value - nums[left] > distance:
                left += 1
            pairs += right - left
        return pairs
