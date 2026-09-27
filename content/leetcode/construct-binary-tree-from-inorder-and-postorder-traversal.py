class Solution:
    def buildTree(self, inorder, postorder):
        root=TreeNode(postorder[-1]); stack=[root]; i=len(inorder)-1
        for value in reversed(postorder[:-1]):
            node=TreeNode(value)
            if stack[-1].val!=inorder[i]: stack[-1].right=node
            else:
                parent=None
                while stack and stack[-1].val==inorder[i]: parent=stack.pop(); i-=1
                parent.left=node
            stack.append(node)
        return root
