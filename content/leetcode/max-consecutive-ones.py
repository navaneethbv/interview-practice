class Solution:
    def findMaxConsecutiveOnes(self, nums):
        best_length = 0
        current_length = 0

        for value in nums:
            if value == 1:
                current_length += 1
                best_length = max(best_length, current_length)
            else:
                current_length = 0

        return best_length
