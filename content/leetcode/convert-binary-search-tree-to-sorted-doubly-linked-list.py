class Solution:
    def treeToDoublyList(self, root):
        nodes = []
        stack = []
        node = root
        while node or stack:
            while node:
                stack.append(node)
                node = node.left
            node = stack.pop()
            nodes.append(node)
            node = node.right
        if not nodes:
            return None
        for current, following in zip(nodes, nodes[1:] + nodes[:1]):
            current.right = following
            following.left = current
        return nodes[0]
