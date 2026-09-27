class Solution:
    def subtreeWithAllDeepest(self, root):
        def visit(node):
            if not node:return 0,None
            a,left=visit(node.left);b,right=visit(node.right)
            return max(a,b)+1,node if a==b else left if a>b else right
        return visit(root)[1]
