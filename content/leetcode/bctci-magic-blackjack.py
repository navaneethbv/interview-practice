from functools import cache


class Solution:
    def countBusts(self, stand, limit):
        @cache
        def busts(total):
            ways = 0
            for card in range(1, 11):
                new_total = total + card
                if new_total > limit:
                    ways += 1
                elif new_total < stand:
                    ways += busts(new_total)
            return ways

        return busts(0)
