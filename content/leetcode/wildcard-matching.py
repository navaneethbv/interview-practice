class Solution:
    def isMatch(self, s, p):
        i=j=0;star=-1;matched=0
        while i<len(s):
            if j<len(p) and p[j] in ('?',s[i]):i+=1;j+=1
            elif j<len(p) and p[j]=='*':star=j;matched=i;j+=1
            elif star>=0:matched+=1;i=matched;j=star+1
            else:return False
        return all(c=='*' for c in p[j:])
