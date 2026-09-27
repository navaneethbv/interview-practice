class Solution:
    def distributeCoins(self, root):
        moves=0
        def visit(node):
            nonlocal moves
            if not node:return 0
            left,right=visit(node.left),visit(node.right);moves+=abs(left)+abs(right)
            return node.val+left+right-1
        visit(root);return moves
