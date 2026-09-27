from collections import Counter

class Solution:
    def isNStraightHand(self, hand, groupSize):
        if len(hand) % groupSize != 0:
            return False

        remaining_cards = Counter(hand)
        for first_value in sorted(remaining_cards):
            copies = remaining_cards[first_value]
            if copies == 0:
                continue
            for card_value in range(first_value, first_value + groupSize):
                if remaining_cards[card_value] < copies:
                    return False
                remaining_cards[card_value] -= copies
        return True
