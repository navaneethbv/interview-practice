class Solution:
    def isValidBST(self,root):
        stack=[(root,float('-inf'),float('inf'))]
        while stack:
            node,lo,hi=stack.pop()
            if not node: continue
            if not lo<node.val<hi: return False
            stack.extend([(node.left,lo,node.val),(node.right,node.val,hi)])
        return True
