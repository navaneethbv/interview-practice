class Solution:
    def findMedianSortedArrays(self, nums1, nums2):
        if len(nums1) > len(nums2): nums1,nums2 = nums2,nums1
        m,n = len(nums1),len(nums2); left,right = 0,m
        while left <= right:
            i = (left+right)//2; j = (m+n+1)//2-i
            a,b = self._around(nums1,i)
            c,d = self._around(nums2,j)
            if a <= d and c <= b:
                if (m+n)%2: return float(max(a,c))
                return (max(a,c)+min(b,d))/2
            if a > d: right = i-1
            else: left = i+1

    @staticmethod
    def _around(nums, cut):
        """The values just left and right of a cut, padded with infinities at the ends."""
        before = nums[cut-1] if cut else float('-inf')
        after = nums[cut] if cut < len(nums) else float('inf')
        return before, after
