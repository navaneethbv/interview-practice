class Solution:
    def maxSubArrayLen(self, nums, k):
        first={0:-1}; total=best=0
        for i,value in enumerate(nums):
            total+=value
            if total-k in first: best=max(best,i-first[total-k])
            first.setdefault(total,i)
        return best
