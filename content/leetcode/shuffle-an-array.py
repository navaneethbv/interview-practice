import random


class Solution:
    def __init__(self, nums):
        self.original = list(nums)
        self.rng = random.Random(429)

    def reset(self):
        return list(self.original)

    def shuffle(self):
        values = list(self.original)
        for index in range(len(values) - 1, 0, -1):
            swap_index = self.rng.randrange(index + 1)
            values[index], values[swap_index] = values[swap_index], values[index]
        return values
