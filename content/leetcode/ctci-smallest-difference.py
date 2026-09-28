class Solution:
    def smallestDifference(self, a, b):
        first, second = sorted(a), sorted(b)
        i = j = 0
        best = abs(first[0] - second[0])
        while i < len(first) and j < len(second):
            best = min(best, abs(first[i] - second[j]))
            if first[i] < second[j]:
                i += 1
            else:
                j += 1
        return best
