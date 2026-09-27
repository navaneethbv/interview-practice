class Solution:
    def minAddToMakeValid(self, s):
        opening=missing=0
        for c in s:
            if c=='(':opening+=1
            elif opening:opening-=1
            else:missing+=1
        return opening+missing
