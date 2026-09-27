class Solution:
    def nextGreaterElements(self, nums):
        length = len(nums)
        result = [-1] * length
        decreasing_indices = []

        for index in range(2 * length):
            value_index = index % length
            while (decreasing_indices
                   and nums[decreasing_indices[-1]] < nums[value_index]):
                result[decreasing_indices.pop()] = nums[value_index]
            if index < length:
                decreasing_indices.append(value_index)

        return result
