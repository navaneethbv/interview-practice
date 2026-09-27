class Solution:
    def maxSumDivThree(self, nums):
        best=[0,float('-inf'),float('-inf')]
        for value in nums:
            following=best[:]
            for remainder,total in enumerate(best): following[(remainder+value)%3]=max(following[(remainder+value)%3],total+value)
            best=following
        return best[0]
