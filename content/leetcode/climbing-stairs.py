class Solution:
    def climbStairs(self, n):
        previous = 1
        current = 1
        for _ in range(2, n + 1):
            previous, current = current, previous + current
        return current
