class Solution:
    def largestDivisibleSubset(self, nums):
        nums.sort();length=[1]*len(nums);parent=[-1]*len(nums);best=0
        for i in range(len(nums)):
            for j in range(i):
                if nums[i]%nums[j]==0 and length[j]+1>length[i]:length[i]=length[j]+1;parent[i]=j
            if length[i]>length[best]:best=i
        out=[]
        while best>=0:out.append(nums[best]);best=parent[best]
        return out
