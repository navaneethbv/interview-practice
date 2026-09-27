from collections import Counter
class Solution:
    def lengthOfLongestSubstringKDistinct(self,s,k):
        counts=Counter();left=best=0
        for right,ch in enumerate(s):
            counts[ch]+=1
            while len(counts)>k:
                counts[s[left]]-=1
                if not counts[s[left]]:del counts[s[left]]
                left+=1
            best=max(best,right-left+1)
        return best
