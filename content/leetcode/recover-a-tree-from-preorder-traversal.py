class Solution:
    def recoverFromPreorder(self, traversal):
        stack = []
        index = 0
        while index < len(traversal):
            depth, index = self._read_depth(traversal, index)
            value, index = self._read_value(traversal, index)
            node = TreeNode(value)
            while len(stack) > depth:
                stack.pop()
            if stack:
                if stack[-1].left is None:
                    stack[-1].left = node
                else:
                    stack[-1].right = node
            stack.append(node)
        return stack[0]

    def _read_depth(self, traversal, index):
        depth = 0
        while index < len(traversal) and traversal[index] == '-':
            depth += 1
            index += 1
        return depth, index

    def _read_value(self, traversal, index):
        value = 0
        while index < len(traversal) and traversal[index].isdigit():
            value = value * 10 + int(traversal[index])
            index += 1
        return value, index
