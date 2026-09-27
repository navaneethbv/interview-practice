class Solution:
    def intersection(self, nums1, nums2):
        return sorted(set(nums1)&set(nums2))
