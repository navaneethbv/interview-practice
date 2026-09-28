class Solution:
    def findSwapValues(self, a, b):
        difference = sum(a) - sum(b)
        if difference % 2:
            return []
        shift = difference // 2
        b_values = set(b)
        for x in sorted(set(a)):
            if x - shift in b_values:
                return [x, x - shift]
        return []
