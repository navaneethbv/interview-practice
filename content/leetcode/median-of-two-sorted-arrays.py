class Solution:
    def findMedianSortedArrays(self, nums1, nums2):
        if len(nums1) > len(nums2):
            return self.findMedianSortedArrays(nums2, nums1)
        total = len(nums1) + len(nums2)
        left = 0
        right = len(nums1)
        while left <= right:
            cut1 = left + (right - left) // 2
            cut2 = (total + 1) // 2 - cut1
            left1 = nums1[cut1 - 1] if cut1 else float("-inf")
            right1 = nums1[cut1] if cut1 < len(nums1) else float("inf")
            left2 = nums2[cut2 - 1] if cut2 else float("-inf")
            right2 = nums2[cut2] if cut2 < len(nums2) else float("inf")
            if left1 <= right2 and left2 <= right1:
                if total % 2:
                    return max(left1, left2)
                return (max(left1, left2) + min(right1, right2)) / 2
            if left1 > right2:
                right = cut1 - 1
            else:
                left = cut1 + 1
        raise ValueError("Inputs must be sorted")
