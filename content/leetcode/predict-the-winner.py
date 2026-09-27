class Solution:
    def predictTheWinner(self,nums):
        dp=nums[:]
        for length in range(2,len(nums)+1):
            for left in range(len(nums)-length+1):
                right=left+length-1;dp[left]=max(nums[left]-dp[left+1],nums[right]-dp[left])
        return dp[0]>=0
