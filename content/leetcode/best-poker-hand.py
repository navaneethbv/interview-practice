from collections import Counter
class Solution:
    def bestHand(self,ranks,suits):
        if len(set(suits))==1:return 'Flush'
        count=max(Counter(ranks).values())
        if count>=3:return 'Three of a Kind'
        if count>=2:return 'Pair'
        return 'High Card'
