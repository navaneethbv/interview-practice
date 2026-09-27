class Solution:
    def intersection(self, nums1, nums2):
        common_values = set(nums1).intersection(nums2)
        return sorted(common_values)
