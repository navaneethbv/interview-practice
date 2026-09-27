class Solution:
    def boundaryOfBinaryTree(self, root):
        leaf=lambda n:not n.left and not n.right
        if leaf(root):return [root.val]
        out=[root.val];node=root.left
        while node:
            if not leaf(node):out.append(node.val)
            node=node.left or node.right
        stack=[root]
        while stack:
            node=stack.pop()
            if leaf(node):out.append(node.val)
            if node.right:stack.append(node.right)
            if node.left:stack.append(node.left)
        right=[];node=root.right
        while node:
            if not leaf(node):right.append(node.val)
            node=node.right or node.left
        return out+right[::-1]
