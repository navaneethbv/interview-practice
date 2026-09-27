class Solution:
    def searchInsert(self, nums, target):
        import bisect
        return bisect.bisect_left(nums,target)
