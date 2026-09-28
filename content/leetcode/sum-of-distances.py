class Solution:

    def distance(self, nums):
        ans = [0] * len(nums)
        for indices in (range(len(nums)), range(len(nums) - 1, -1, -1)):
            seen = {}
            for i in indices:
                count, total = seen.get(nums[i], (0, 0))
                ans[i] += abs(count * i - total)
                seen[nums[i]] = (count + 1, total + i)
        return ans
