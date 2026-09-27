class Solution:
    def numMatchingSubseq(self, s, words):
        from collections import defaultdict
        import bisect
        positions=defaultdict(list)
        for i,c in enumerate(s): positions[c].append(i)
        result=0
        for word in words:
            previous=-1
            for c in word:
                indexes=positions[c]; at=bisect.bisect_right(indexes,previous)
                if at==len(indexes): break
                previous=indexes[at]
            else: result+=1
        return result
