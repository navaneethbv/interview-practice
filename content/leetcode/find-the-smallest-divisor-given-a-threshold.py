class Solution:
    def smallestDivisor(self, nums, threshold):
        left = 1
        right = max(nums)
        while left<right:
            middle = (left + right) // 2
            rounded_sum = sum((value + middle - 1) // middle for value in nums)
            if rounded_sum <= threshold:
                right = middle
            else:
                left = middle + 1
        return left
