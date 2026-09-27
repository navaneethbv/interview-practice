class Solution:
    def maxDotProduct(self, nums1, nums2):
        previous=[float('-inf')]*(len(nums2)+1)
        for a in nums1:
            current=[float('-inf')]*(len(nums2)+1)
            for j,b in enumerate(nums2,1): current[j]=max(a*b+max(0,previous[j-1]),previous[j],current[j-1])
            previous=current
        return previous[-1]
