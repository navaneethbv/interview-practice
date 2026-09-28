class Solution:
    def buildTree(self, inorder, postorder):
        root = TreeNode(postorder[-1])
        stack = [root]
        inorder_index = len(inorder) - 1
        for postorder_index in range(len(postorder) - 2, -1, -1):
            node = TreeNode(postorder[postorder_index])
            if stack[-1].val != inorder[inorder_index]:
                stack[-1].right = node
            else:
                parent = None
                while (stack
                       and stack[-1].val == inorder[inorder_index]):
                    parent = stack.pop()
                    inorder_index -= 1
                parent.left=node
            stack.append(node)
        return root
