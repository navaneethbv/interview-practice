class Solution:
    def numOfPairs(self, nums, target):
        pairs = 0
        for first, first_value in enumerate(nums):
            for second, second_value in enumerate(nums):
                if first != second and first_value + second_value == target:
                    pairs += 1
        return pairs
