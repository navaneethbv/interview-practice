from collections import Counter
class Solution:
    def bestHand(self, ranks, suits):
        if len(set(suits)) == 1:
            return "Flush"
        largest_count = max(Counter(ranks).values())
        if largest_count >= 3:
            return "Three of a Kind"
        if largest_count >= 2:
            return "Pair"
        return "High Card"
