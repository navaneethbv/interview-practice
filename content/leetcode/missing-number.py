class Solution:
    def missingNumber(self, nums):
        answer = len(nums)
        for index, value in enumerate(nums):
            answer ^= index ^ value
        return answer
