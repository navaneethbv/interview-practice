class Solution:
    def treeToDoublyList(self, root):
        ordered_nodes = []
        stack = []
        current = root

        while current or stack:
            while current:
                stack.append(current)
                current = current.left
            current = stack.pop()
            ordered_nodes.append(current)
            current = current.right

        if not ordered_nodes:
            return None

        for index, node in enumerate(ordered_nodes):
            successor = ordered_nodes[(index + 1) % len(ordered_nodes)]
            predecessor = ordered_nodes[(index - 1) % len(ordered_nodes)]
            node.left = predecessor
            node.right = successor

        return ordered_nodes[0]
