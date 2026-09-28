from collections import Counter


class Solution:
    def minCost(self, basket1, basket2):
        first = Counter(basket1)
        second = Counter(basket2)
        extra = []
        for value in first.keys() | second.keys():
            difference = first[value] - second[value]
            if difference % 2:
                return -1
            extra.extend([value] * (abs(difference) // 2))
        extra.sort()
        cheapest = min(basket1 + basket2)
        return sum(min(value, 2 * cheapest) for value in extra[:len(extra) // 2])
