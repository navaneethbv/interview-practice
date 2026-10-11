class Solution:
    def thirdMax(self, nums):
        top = sorted(set(nums), reverse=True)
        return top[2] if len(top) >= 3 else top[0]
