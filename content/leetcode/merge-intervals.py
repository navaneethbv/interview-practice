class Solution:
    def merge(self, intervals):
        result = []
        for a,b in sorted(intervals):
            if result and a <= result[-1][1]:
                result[-1][1] = max(result[-1][1],b)
            else:
                result.append([a,b])
        return result
