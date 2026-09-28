class Solution:
    def canMakeArithmeticProgression(self, arr):
        ordered = sorted(arr)
        difference = ordered[1] - ordered[0]
        for index in range(2, len(ordered)):
            if ordered[index] - ordered[index - 1] != difference:
                return False
        return True
