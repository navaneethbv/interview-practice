class Solution:
    def longestPalindrome(self,s):
        start=end=0
        for center in range(len(s)):
            for l,r in [(center,center),(center,center+1)]:
                while l>=0 and r<len(s) and s[l]==s[r]:
                    if r-l>end-start: start,end=l,r
                    l-=1
                    r+=1
        return s[start:end+1]
