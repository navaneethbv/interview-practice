class Solution:
    def numSubarraysWithSum(self, nums, goal):
        from collections import defaultdict
        counts=defaultdict(int); counts[0]=1; prefix=total=0
        for value in nums:
            prefix+=value; total+=counts[prefix-goal]; counts[prefix]+=1
        return total
