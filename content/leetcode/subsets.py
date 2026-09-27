class Solution:
    def subsets(self, nums):
        result = [[]]

        for value in nums:
            existing_count = len(result)
            for index in range(existing_count):
                result.append(result[index] + [value])

        return result
