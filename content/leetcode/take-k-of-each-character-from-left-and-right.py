from collections import Counter
class Solution:
    def takeCharacters(self, s, k):
        remaining=Counter(s)
        if any(remaining[c]<k for c in 'abc'):return -1
        left=best=0
        for right,c in enumerate(s):
            remaining[c]-=1
            while remaining[c]<k:remaining[s[left]]+=1;left+=1
            best=max(best,right-left+1)
        return len(s)-best
