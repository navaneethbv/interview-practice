def _leaf(node):
    return not node.left and not node.right

class Solution:
    def boundaryOfBinaryTree(self, root):
        if _leaf(root):return [root.val]
        return [root.val]+self._edge(root.left,True)+self._leaves(root)+self._edge(root.right,False)[::-1]

    def _edge(self, node, left):
        """Non-leaf nodes along the left (or right) boundary, top to bottom."""
        out=[]
        while node:
            if not _leaf(node):out.append(node.val)
            node=(node.left or node.right) if left else (node.right or node.left)
        return out

    def _leaves(self, root):
        out=[];stack=[root]
        while stack:
            node=stack.pop()
            if _leaf(node):out.append(node.val)
            if node.right:stack.append(node.right)
            if node.left:stack.append(node.left)
        return out
