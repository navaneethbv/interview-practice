class Solution:

    def minMirrorPairDistance(self, nums):
        last = {}
        ans = len(nums) + 1
        for i, x in enumerate(nums):
            if x in last:
                ans = min(ans, i - last[x])
            last[int(str(x)[::-1])] = i
        return ans if ans <= len(nums) else -1
