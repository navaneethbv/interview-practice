from collections import Counter
class Solution:
    def isNStraightHand(self, hand, groupSize):
        if len(hand) % groupSize:
            return False
        count = Counter(hand)
        for start in sorted(count):
            copies = count[start]
            if copies:
                for value in range(start,start+groupSize):
                    if count[value] < copies:
                        return False
                    count[value] -= copies
        return True
