class Solution:
    def missingNumber(self, nums):
        answer = len(nums)
        for i, value in enumerate(nums):
            answer ^= i ^ value
        return answer
