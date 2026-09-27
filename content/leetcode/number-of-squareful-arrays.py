from collections import Counter
from math import isqrt


class Solution:
    def numSquarefulPerms(self, nums):
        counts = Counter(nums)
        neighbors = {
            value: [other for other in counts if self._is_square(value + other)]
            for value in counts
        }

        def search(previous, remaining):
            if remaining == 0:
                return 1
            candidates = counts if previous is None else neighbors[previous]
            total = 0
            for value in candidates:
                if counts[value] == 0:
                    continue
                counts[value] -= 1
                total += search(value, remaining - 1)
                counts[value] += 1
            return total

        return search(None, len(nums))

    def _is_square(self, value):
        root = isqrt(value)
        return root * root == value
