class Solution:
    def findMedianSortedArrays(self, nums1, nums2):
        if len(nums1) > len(nums2): nums1,nums2 = nums2,nums1
        m,n = len(nums1),len(nums2); left,right = 0,m
        while left <= right:
            i = (left+right)//2; j = (m+n+1)//2-i
            a = nums1[i-1] if i else float('-inf')
            b = nums1[i] if i < m else float('inf')
            c = nums2[j-1] if j else float('-inf')
            d = nums2[j] if j < n else float('inf')
            if a <= d and c <= b:
                if (m+n)%2: return float(max(a,c))
                return (max(a,c)+min(b,d))/2
            if a > d: right = i-1
            else: left = i+1
