class Solution:
    def countSubstrings(self,s):
        total=0
        for center in range(len(s)):
            for l,r in [(center,center),(center,center+1)]:
                while l>=0 and r<len(s) and s[l]==s[r]:
                    total+=1
                    l-=1
                    r+=1
        return total
