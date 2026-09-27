class Solution:
    def longestSubarray(self, nums, limit):
        from collections import deque
        minimum=deque(); maximum=deque(); left=best=0
        for right,value in enumerate(nums):
            while minimum and nums[minimum[-1]]>value: minimum.pop()
            while maximum and nums[maximum[-1]]<value: maximum.pop()
            minimum.append(right); maximum.append(right)
            while nums[maximum[0]]-nums[minimum[0]]>limit:
                if minimum[0]==left: minimum.popleft()
                if maximum[0]==left: maximum.popleft()
                left+=1
            best=max(best,right-left+1)
        return best
