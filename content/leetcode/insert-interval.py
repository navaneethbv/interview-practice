class Solution:
    def insert(self, intervals, newInterval):
        result = []
        start,end = newInterval
        placed = False
        for a,b in intervals:
            if b < start:
                result.append([a,b])
            elif a > end:
                if not placed:
                    result.append([start,end]); placed = True
                result.append([a,b])
            else:
                start,end = min(start,a),max(end,b)
        if not placed:
            result.append([start,end])
        return result
