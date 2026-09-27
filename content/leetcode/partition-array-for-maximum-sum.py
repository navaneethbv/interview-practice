class Solution:
    def maxSumAfterPartitioning(self, arr, k):
        dp=[0]*(len(arr)+1)
        for end in range(1,len(arr)+1):
            maximum=0
            for size in range(1,min(k,end)+1):maximum=max(maximum,arr[end-size]);dp[end]=max(dp[end],dp[end-size]+maximum*size)
        return dp[-1]
