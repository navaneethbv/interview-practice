class Solution:
    def partitionLabels(self, s):
        last = {c:i for i,c in enumerate(s)}
        end = start = 0
        result = []
        for i,c in enumerate(s):
            end = max(end,last[c])
            if i == end:
                result.append(end-start+1)
                start = i+1
        return result
