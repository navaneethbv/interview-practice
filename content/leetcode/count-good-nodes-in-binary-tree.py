class Solution:
    def goodNodes(self, root):
        pending = [(root, root.val)]
        count = 0
        while pending:
            node, maximum = pending.pop()
            if node.val >= maximum:
                count += 1
            maximum = max(maximum, node.val)
            if node.left:
                pending.append((node.left, maximum))
            if node.right:
                pending.append((node.right, maximum))
        return count
