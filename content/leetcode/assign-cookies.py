class Solution:
    def findContentChildren(self,g,s):
        g=sorted(g);i=0
        for size in sorted(s):
            if i<len(g) and size>=g[i]:i+=1
        return i
