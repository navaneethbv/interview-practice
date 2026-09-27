class Solution:
    def minKnightMoves(self, x, y):
        x, y = sorted((abs(x), abs(y)), reverse=True)
        if (x, y) == (1, 0):
            return 3
        if (x, y) == (2, 2):
            return 4
        minimum_moves = max((x + 1) // 2, (x + y + 2) // 3)
        return minimum_moves + (minimum_moves + x + y) % 2
