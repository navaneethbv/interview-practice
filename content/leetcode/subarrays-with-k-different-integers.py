class Solution:
    def subarraysWithKDistinct(self, nums, k):
        from collections import defaultdict
        def at_most(limit):
            counts=defaultdict(int); left=total=0
            for right,value in enumerate(nums):
                counts[value]+=1
                while len(counts)>limit:
                    old=nums[left]; counts[old]-=1
                    if counts[old]==0: del counts[old]
                    left+=1
                total+=right-left+1
            return total
        return at_most(k)-at_most(k-1)
