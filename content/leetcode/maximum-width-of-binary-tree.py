from collections import deque
class Solution:
    def widthOfBinaryTree(self, root):
        pending = deque([(root, 0)])
        widest = 0
        while pending:
            offset = pending[0][1]
            last_index = 0
            for _ in range(len(pending)):
                node, index = pending.popleft()
                normalized_index = index - offset
                last_index = normalized_index
                if node.left:
                    pending.append((node.left, normalized_index * 2))
                if node.right:
                    pending.append((node.right, normalized_index * 2 + 1))
            widest = max(widest, last_index + 1)
        return widest
