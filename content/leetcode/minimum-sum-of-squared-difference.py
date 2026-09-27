class Solution:
    def minSumSquareDiff(self, nums1, nums2, k1, k2):
        differences=[abs(a-b) for a,b in zip(nums1,nums2)]; operations=k1+k2
        if operations>=sum(differences): return 0
        left,right=0,max(differences)
        while left<right:
            middle=(left+right)//2
            if sum(max(0,d-middle) for d in differences)<=operations: right=middle
            else: left=middle+1
        cap=left; spent=sum(max(0,d-cap) for d in differences)
        return sum(min(d,cap)**2 for d in differences)-(operations-spent)*(2*cap-1)
