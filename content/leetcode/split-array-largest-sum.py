class Solution:
    def splitArray(self, nums, k):
        left = max(nums)
        right = sum(nums)

        while left < right:
            limit = (left + right) // 2
            parts = self._required_parts(nums, limit)

            if parts <= k:
                right = limit
            else:
                left = limit + 1

        return left

    @staticmethod
    def _required_parts(nums, limit):
        parts = 1
        current_sum = 0

        for value in nums:
            if current_sum + value > limit:
                parts += 1
                current_sum = 0
            current_sum += value

        return parts
