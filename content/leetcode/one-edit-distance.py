class Solution:
    def isOneEditDistance(self,s,t):
        if len(s)>len(t):s,t=t,s
        if len(t)-len(s)>1:return False
        for i,ch in enumerate(s):
            if ch!=t[i]:return s[i+1:]==t[i+1:] if len(s)==len(t) else s[i:]==t[i+1:]
        return len(t)==len(s)+1
