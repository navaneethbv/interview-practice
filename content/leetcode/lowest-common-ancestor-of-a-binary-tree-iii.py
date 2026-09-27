class Solution:
    def lowestCommonAncestor(self, p, q):
        a,b=p,q
        while a is not b:
            a=a.parent if a else q
            b=b.parent if b else p
        return a
