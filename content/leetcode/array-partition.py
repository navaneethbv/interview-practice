class Solution:
    def arrayPairSum(self, nums):
        sorted_values = sorted(nums)
        pair_sum = 0
        for index in range(0, len(sorted_values), 2):
            pair_sum += sorted_values[index]
        return pair_sum
