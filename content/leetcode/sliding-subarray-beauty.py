class Solution:

    def getSubarrayBeauty(self, nums, k, x):
        f = [0] * 101
        ans = []
        for i, v in enumerate(nums):
            f[v + 50] += 1
            if i >= k:
                f[nums[i - k] + 50] -= 1
            if i >= k - 1:
                left = x
                value = 0
                for j in range(50):
                    left -= f[j]
                    if left <= 0:
                        value = j - 50
                        break
                ans.append(value)
        return ans
