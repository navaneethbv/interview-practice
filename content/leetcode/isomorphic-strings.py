class Solution:
    def isIsomorphic(self, s, t):
        forward={}; backward={}
        for a,b in zip(s,t):
            if a in forward and forward[a]!=b or b in backward and backward[b]!=a: return False
            forward[a]=b; backward[b]=a
        return True
