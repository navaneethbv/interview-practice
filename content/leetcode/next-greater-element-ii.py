class Solution:
    def nextGreaterElements(self, nums):
        n=len(nums);out=[-1]*n;stack=[]
        for i in range(2*n):
            while stack and nums[stack[-1]]<nums[i%n]:out[stack.pop()]=nums[i%n]
            if i<n:stack.append(i)
        return out
