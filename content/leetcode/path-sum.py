class Solution:
    def hasPathSum(self, root, targetSum):
        stack=[(root,targetSum)] if root else []
        while stack:
            node,remaining=stack.pop();remaining-=node.val
            if not node.left and not node.right and remaining==0:return True
            if node.left:stack.append((node.left,remaining))
            if node.right:stack.append((node.right,remaining))
        return False
