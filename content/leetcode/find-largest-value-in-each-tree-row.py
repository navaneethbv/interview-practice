class Solution:
    def largestValues(self,root):
        q=[root] if root else [];result=[]
        while q:
            result.append(max(n.val for n in q));q=[c for n in q for c in (n.left,n.right) if c]
        return result
