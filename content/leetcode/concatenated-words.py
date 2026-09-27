class Solution:
    def findAllConcatenatedWordsInADict(self, words):
        available=set(words);out=[]
        for word in words:
            dp=[False]*(len(word)+1);dp[0]=True
            for end in range(1,len(word)+1):
                dp[end]=any(dp[start] and (start>0 or end<len(word)) and word[start:end] in available for start in range(end))
            if dp[-1]:out.append(word)
        return out
