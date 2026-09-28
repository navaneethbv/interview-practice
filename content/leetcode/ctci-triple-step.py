class Solution:
    MOD = 1_000_000_007

    def countWays(self, n):
        three_below, two_below, one_below = 0, 0, 1
        for _ in range(n):
            current = (three_below + two_below + one_below) % self.MOD
            three_below, two_below, one_below = two_below, one_below, current
        return one_below
