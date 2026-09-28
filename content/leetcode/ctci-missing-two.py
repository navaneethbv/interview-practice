class Solution:
    def missingTwo(self, nums):
        n = len(nums) + 2
        missing_sum = n * (n + 1) // 2 - sum(nums)
        pivot = missing_sum // 2
        smaller = pivot * (pivot + 1) // 2 - sum(value for value in nums if value <= pivot)
        return [smaller, missing_sum - smaller]
