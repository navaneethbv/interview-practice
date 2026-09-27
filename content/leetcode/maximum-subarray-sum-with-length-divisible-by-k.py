class Solution:
    def maxSubarraySum(self, nums, k):
        minimum=[float('inf')]*k; minimum[0]=0; prefix=0; best=float('-inf')
        for i,value in enumerate(nums,1):
            prefix+=value; remainder=i%k; best=max(best,prefix-minimum[remainder]); minimum[remainder]=min(minimum[remainder],prefix)
        return best
