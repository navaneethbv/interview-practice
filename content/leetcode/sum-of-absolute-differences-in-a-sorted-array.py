class Solution:

    def getSumAbsoluteDifferences(self, nums):
        total = sum(nums)
        prefix = 0
        ans = []
        n = len(nums)
        for i, x in enumerate(nums):
            ans.append(x * i - prefix + total - prefix - x - x * (n - i - 1))
            prefix += x
        return ans
