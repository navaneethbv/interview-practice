class Solution:
    def getMinimumDifference(self, root):
        stack = []
        previous_value = None
        answer = float('inf')
        node = root
        while node or stack:
            self._push_left(node, stack)
            node = stack.pop()
            if previous_value is not None:
                answer = min(answer, node.val - previous_value)
            previous_value = node.val
            node = node.right
        return answer

    def _push_left(self, node, stack):
        while node:
            stack.append(node)
            node = node.left
