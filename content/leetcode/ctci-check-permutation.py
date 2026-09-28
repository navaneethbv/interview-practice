class Solution:
    def checkPermutation(self, first, second):
        if len(first) != len(second):
            return False
        counts = {}
        for char in first:
            counts[char] = counts.get(char, 0) + 1
        for char in second:
            if char not in counts:
                return False
            counts[char] -= 1
            if counts[char] < 0:
                return False
        return True
