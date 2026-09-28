class Solution:
    def smallestRange(self, arr, k):
        ordered = sorted(arr)
        best = None
        for start in range(len(ordered) - k + 1):
            candidate = [ordered[start], ordered[start + k - 1]]
            if best is None or candidate[1] - candidate[0] < best[1] - best[0]:
                best = candidate
        return best
