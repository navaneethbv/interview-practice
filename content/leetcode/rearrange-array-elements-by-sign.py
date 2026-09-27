class Solution:
    def rearrangeArray(self, nums):
        result = [0] * len(nums)
        positive_index = 0
        negative_index = 1
        for value in nums:
            if value > 0:
                result[positive_index] = value
                positive_index += 2
            else:
                result[negative_index] = value
                negative_index += 2
        return result
