from collections import Counter
class Solution:
    def findPairs(self,nums,k):
        counts=Counter(nums)
        return sum(v>1 for v in counts.values()) if k==0 else sum(x+k in counts for x in counts)
