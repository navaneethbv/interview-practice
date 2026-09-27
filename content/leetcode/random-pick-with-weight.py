import bisect
import random


class Solution:
    def __init__(self, w):
        self.prefix_sums = []
        running_total = 0
        for weight in w:
            running_total += weight
            self.prefix_sums.append(running_total)
        self.random = random.Random(0)

    def pickIndex(self):
        target = self.random.randrange(self.prefix_sums[-1])
        return bisect.bisect_right(self.prefix_sums, target)
