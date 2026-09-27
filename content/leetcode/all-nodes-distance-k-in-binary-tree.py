from collections import deque
class Solution:
    def distanceK(self, root, target, k):
        parents = {root: None}
        stack = [root]
        while stack:
            node = stack.pop()
            for child in (node.left, node.right):
                if child:
                    parents[child] = node
                    stack.append(child)
        pending = deque([(target, 0)])
        seen = {target}
        values = []
        while pending:
            node, distance = pending.popleft()
            if distance == k:
                values.append(node.val)
                continue
            neighbors = (node.left, node.right, parents[node])
            for neighbor in neighbors:
                if neighbor and neighbor not in seen:
                    seen.add(neighbor)
                    pending.append((neighbor, distance + 1))
        return values
