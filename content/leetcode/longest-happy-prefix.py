class Solution:
    def longestPrefix(self, s):
        prefix=[0]*len(s)
        for i in range(1,len(s)):
            j=prefix[i-1]
            while j and s[i]!=s[j]:j=prefix[j-1]
            if s[i]==s[j]:j+=1
            prefix[i]=j
        return s[:prefix[-1]]
