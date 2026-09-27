class Solution:
    def shortestDistance(self,wordsDict,word1,word2):
        a=b=-1;best=len(wordsDict)
        for i,w in enumerate(wordsDict):
            if w==word1:a=i
            if w==word2:b=i
            if a>=0 and b>=0:best=min(best,abs(a-b))
        return best
