class Solution:
    def minFlips(self, s):
        length = len(s)
        mismatch = 0
        best = length
        doubled = s + s
        for index, character in enumerate(doubled):
            mismatch += int(character) != index % 2
            if index >= length:
                old_index = index - length
                mismatch -= int(s[old_index]) != old_index % 2
            if index >= length - 1:
                best = min(best, mismatch, length - mismatch)
        return best
