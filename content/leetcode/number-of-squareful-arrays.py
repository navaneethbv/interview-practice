from collections import Counter
from math import isqrt
class Solution:
    def numSquarefulPerms(self,nums):
        counts=Counter(nums);neighbors={x:[y for y in counts if isqrt(x+y)**2==x+y] for x in counts}
        def search(previous,left):
            if left==0:return 1
            total=0
            for value in (counts if previous is None else neighbors[previous]):
                if counts[value]:counts[value]-=1;total+=search(value,left-1);counts[value]+=1
            return total
        return search(None,len(nums))
