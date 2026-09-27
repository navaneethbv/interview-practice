class Solution:
    def maxSumMinProduct(self, nums):
        prefix=[0]
        for x in nums:prefix.append(prefix[-1]+x)
        stack=[];best=0
        for right in range(len(nums)+1):
            while stack and (right==len(nums) or nums[stack[-1]]>=nums[right]):
                middle=stack.pop();left=stack[-1]+1 if stack else 0;best=max(best,nums[middle]*(prefix[right]-prefix[left]))
            stack.append(right)
        return best%1000000007
