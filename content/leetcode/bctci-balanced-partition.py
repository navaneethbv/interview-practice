class Solution:
    def maxBalancedPieces(self, s):
        depth = pieces = 0
        for character in s:
            depth += 1 if character == "(" else -1
            if depth == 0:
                pieces += 1
        return pieces
