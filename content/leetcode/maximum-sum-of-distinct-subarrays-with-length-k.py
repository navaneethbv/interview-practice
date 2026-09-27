class Solution:
    def maximumSubarraySum(self, nums, k):
        from collections import Counter
        counts=Counter(); total=best=0
        for i,value in enumerate(nums):
            counts[value]+=1; total+=value
            if i>=k:
                old=nums[i-k]; total-=old; counts[old]-=1
                if counts[old]==0: del counts[old]
            if i>=k-1 and len(counts)==k: best=max(best,total)
        return best
