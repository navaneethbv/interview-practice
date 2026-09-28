class Solution:
    def minOperations(self, s):
        mismatches = 0
        for index, character in enumerate(s):
            expected = index % 2
            if int(character) != expected:
                mismatches += 1
        return min(mismatches, len(s) - mismatches)
