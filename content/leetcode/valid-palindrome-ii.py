class Solution:
    def validPalindrome(self, s):
        def pal(l,r):
            while l<r:
                if s[l]!=s[r]:return False
                l+=1;r-=1
            return True
        l,r=0,len(s)-1
        while l<r:
            if s[l]!=s[r]:return pal(l+1,r) or pal(l,r-1)
            l+=1;r-=1
        return True
