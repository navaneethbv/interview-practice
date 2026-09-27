class Solution:
    def countSubarrays(self, nums, k):
        from collections import Counter
        pivot=nums.index(k); counts=Counter({0:1}); balance=0
        for i in range(pivot-1,-1,-1):
            balance+=1 if nums[i]>k else -1; counts[balance]+=1
        result=counts[0]+counts[1]; balance=0
        for i in range(pivot+1,len(nums)):
            balance+=1 if nums[i]>k else -1; result+=counts[-balance]+counts[1-balance]
        return result
