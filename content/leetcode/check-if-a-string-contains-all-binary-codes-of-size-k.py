class Solution:
    def hasAllCodes(self, s, k):
        required = 1 << k
        if len(s) - k + 1 < required:
            return False
        seen = set()
        value = 0
        mask = required - 1
        for index, bit in enumerate(s):
            value = ((value << 1) | int(bit)) & mask
            if index >= k - 1:
                seen.add(value)
        return len(seen) == required
