from collections import Counter
class Solution:
    def findLonely(self,nums):
        counts=Counter(nums)
        return [x for x,c in counts.items() if c==1 and x-1 not in counts and x+1 not in counts]
