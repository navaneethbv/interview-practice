class Solution:
    def hasAlternatingBits(self, n):
        changed_bits = n ^ (n >> 1)
        return changed_bits & (changed_bits + 1) == 0
