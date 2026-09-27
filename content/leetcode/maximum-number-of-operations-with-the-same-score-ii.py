from functools import lru_cache
class Solution:
    def maxOperations(self,nums):
        @lru_cache(None)
        def solve(left,right,score):
            if left>=right:return 0
            best=0
            if nums[left]+nums[left+1]==score:best=max(best,1+solve(left+2,right,score))
            if nums[right-1]+nums[right]==score:best=max(best,1+solve(left,right-2,score))
            if nums[left]+nums[right]==score:best=max(best,1+solve(left+1,right-1,score))
            return best
        n=len(nums);return max(solve(0,n-1,s) for s in {nums[0]+nums[1],nums[-1]+nums[-2],nums[0]+nums[-1]})
