class Solution:
    def subtreeWithAllDeepest(self, root):
        def visit(node):
            if not node:return 0,None
            a,left=visit(node.left);b,right=visit(node.right)
            if a==b:return a+1,node
            return (a+1,left) if a>b else (b+1,right)
        return visit(root)[1]
