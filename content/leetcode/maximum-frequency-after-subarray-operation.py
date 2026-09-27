class Solution:
    def maxFrequency(self, nums, k):
        baseline=nums.count(k); best=0
        for source in set(nums)-{k}:
            gain=0
            for value in nums:
                gain=max(0,gain+(value==source)-(value==k)); best=max(best,gain)
        return baseline+best
