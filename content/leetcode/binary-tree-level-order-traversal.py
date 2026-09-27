class Solution:
    def levelOrder(self,root):
        queue=[root] if root else []
        result=[]
        while queue:
            result.append([n.val for n in queue])
            queue=[c for n in queue for c in (n.left,n.right) if c]
        return result
