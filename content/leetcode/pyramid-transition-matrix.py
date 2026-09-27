class Solution:
    def pyramidTransition(self, bottom, allowed):
        from collections import defaultdict
        from functools import lru_cache
        rules=defaultdict(list)
        for a,b,c in allowed: rules[a+b].append(c)
        @lru_cache(None)
        def build(row):
            if len(row)==1: return True
            def extend(index,next_row):
                if index==len(row)-1: return build(next_row)
                return any(extend(index+1,next_row+c) for c in rules[row[index:index+2]])
            return extend(0,'')
        return build(bottom)
