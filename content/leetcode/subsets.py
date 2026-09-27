class Solution:
    def subsets(self, nums):
        result = [[]]
        for value in nums:
            result += [subset+[value] for subset in result]
        return result
