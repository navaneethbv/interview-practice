class Solution:
    def sortArrayByParity(self, nums):
        result = []
        for value in nums:
            if value % 2 == 0:
                result.append(value)
        for value in nums:
            if value % 2 != 0:
                result.append(value)
        return result
