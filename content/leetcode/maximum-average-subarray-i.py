class Solution:
    def findMaxAverage(self, nums, k):
        total=best=sum(nums[:k])
        for i in range(k,len(nums)):total+=nums[i]-nums[i-k];best=max(best,total)
        return best/k
