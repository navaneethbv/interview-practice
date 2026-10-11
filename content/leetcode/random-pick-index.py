import random


class Solution:
    def __init__(self, nums):
        self.nums = nums

    def pick(self, target):
        chosen, seen = -1, 0
        for i, x in enumerate(self.nums):
            if x == target:
                seen += 1
                if random.randrange(seen) == 0:
                    chosen = i
        return chosen
