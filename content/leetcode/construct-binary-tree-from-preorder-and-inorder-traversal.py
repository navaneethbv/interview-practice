class Solution:
    def buildTree(self, preorder, inorder):
        root = TreeNode(preorder[0])
        stack = [root]
        inorder_index = 0
        for index in range(1, len(preorder)):
            node = TreeNode(preorder[index])
            if stack[-1].val != inorder[inorder_index]:
                stack[-1].left = node
            else:
                while stack and stack[-1].val == inorder[inorder_index]:
                    parent = stack.pop()
                    inorder_index += 1
                parent.right = node
            stack.append(node)
        return root
