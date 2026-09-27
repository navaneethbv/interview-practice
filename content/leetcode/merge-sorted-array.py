class Solution:
    def merge(self, nums1, m, nums2, n):
        first = m - 1
        second = n - 1
        write_index = m + n - 1
        while second >= 0:
            if first >= 0 and nums1[first] > nums2[second]:
                nums1[write_index] = nums1[first]
                first -= 1
            else:
                nums1[write_index] = nums2[second]
                second -= 1
            write_index -= 1
