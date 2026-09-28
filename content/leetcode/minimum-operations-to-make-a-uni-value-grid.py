class Solution:

    def minOperations(self, grid, x):
        a = sorted((v for row in grid for v in row))
        if any(((v - a[0]) % x for v in a)):
            return -1
        return sum((abs(v - a[len(a) // 2]) // x for v in a))
