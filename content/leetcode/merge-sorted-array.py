class Solution:
    def merge(self, nums1, m, nums2, n):
        a,b,out=m-1,n-1,m+n-1
        while b>=0:
            if a>=0 and nums1[a]>nums2[b]: nums1[out]=nums1[a]; a-=1
            else: nums1[out]=nums2[b]; b-=1
            out-=1
