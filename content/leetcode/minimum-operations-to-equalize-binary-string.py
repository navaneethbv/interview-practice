class Solution:
    def minOperations(self, s, k):
        length = len(s)
        zero_count = s.count("0")
        if zero_count == 0:
            return 0
        for moves in range(1, length + 1):
            flipped = moves * k
            required_capacity = length * moves - (
                zero_count if moves % 2 == 0 else length - zero_count
            )
            if flipped >= zero_count and (flipped - zero_count) % 2 == 0:
                if flipped <= required_capacity:
                    return moves
        return -1
