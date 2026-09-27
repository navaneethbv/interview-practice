from collections import Counter
class Solution:
    def bestHand(self,ranks,suits):
        if len(set(suits))==1:return 'Flush'
        count=max(Counter(ranks).values())
        return 'Three of a Kind' if count>=3 else 'Pair' if count>=2 else 'High Card'
