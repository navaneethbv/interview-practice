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
            left1 = self._before(nums1, cut1)
            right1 = self._after(nums1, cut1)
            left2 = self._before(nums2, cut2)
            right2 = self._after(nums2, cut2)
            if left1 <= right2 and left2 <= right1:
                if total % 2:
                    return max(left1, left2)
                return (max(left1, left2) + min(right1, right2)) / 2
            if left1 > right2:
                right = cut1 - 1
            else:
                left = cut1 + 1
        raise ValueError("Inputs must be sorted")

    def _before(self, values, cut):
        return values[cut - 1] if cut else float("-inf")

    def _after(self, values, cut):
        return values[cut] if cut < len(values) else float("inf")
