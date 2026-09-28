class Solution:
    def countSubarrays(self, nums, k):
        from collections import Counter
        pivot = nums.index(k)
        left_balances = Counter({0: 1})
        balance = 0
        for index in range(pivot - 1, -1, -1):
            balance += 1 if nums[index] > k else -1
            left_balances[balance] += 1
        result = left_balances[0] + left_balances[1]
        balance = 0
        for index in range(pivot + 1, len(nums)):
            balance += 1 if nums[index] > k else -1
            result += left_balances[-balance] + left_balances[1 - balance]
        return result
