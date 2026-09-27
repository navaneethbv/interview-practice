class Solution:
    def goodNodes(self, root):
        stack = [(root,root.val)]; count = 0
        while stack:
            node,maximum = stack.pop()
            count += node.val >= maximum
            maximum = max(maximum,node.val)
            if node.left: stack.append((node.left,maximum))
            if node.right: stack.append((node.right,maximum))
        return count
