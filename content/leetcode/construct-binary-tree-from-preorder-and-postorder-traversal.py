class Solution:
    def constructFromPrePost(self, preorder, postorder):
        root = TreeNode(preorder[0])
        stack = [root]
        postorder_index = 0
        for preorder_index in range(1, len(preorder)):
            value = preorder[preorder_index]
            while stack[-1].val == postorder[postorder_index]:
                stack.pop()
                postorder_index += 1
            node = TreeNode(value)
            if stack[-1].left is None:
                stack[-1].left = node
            else:
                stack[-1].right = node
            stack.append(node)
        return root
