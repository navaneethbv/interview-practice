from functools import lru_cache
class Solution:
    def wordBreak(self,s,wordDict):
        words=set(wordDict)
        @lru_cache(None)
        def solve(i):
            if i==len(s):return ['']
            result=[]
            for j in range(i+1,len(s)+1):
                if s[i:j] in words:
                    for tail in solve(j):result.append(s[i:j]+(' '+tail if tail else ''))
            return result
        return solve(0)
