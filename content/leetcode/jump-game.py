class Solution:
    def canJump(self, nums):
        farthest = 0
        for i, distance in enumerate(nums):
            if i > farthest:
                return False
            farthest = max(farthest, i+distance)
            if farthest >= len(nums)-1:
                return True
        return False
