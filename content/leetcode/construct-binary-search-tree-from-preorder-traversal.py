class Solution:
    def bstFromPreorder(self, preorder):
        root = TreeNode(preorder[0])
        ancestors = [root]
        for value in preorder[1:]:
            node = TreeNode(value)
            if value < ancestors[-1].val:
                ancestors[-1].left = node
            else:
                parent = None
                while ancestors and ancestors[-1].val < value:
                    parent = ancestors.pop()
                parent.right = node
            ancestors.append(node)
        return root
