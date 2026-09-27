class Solution:
    def searchRange(self, nums, target):
        import bisect
        left = bisect.bisect_left(nums,target)
        if left==len(nums) or nums[left]!=target: return [-1,-1]
        return [left,bisect.bisect_right(nums,target)-1]
