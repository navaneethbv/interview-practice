from collections import deque


class Solution:
    def amountOfTime(self, root, start):
        graph = self._build_graph(root)
        queue = deque([(start, 0)])
        seen = {start}
        minutes = 0
        while queue:
            node, distance = queue.popleft()
            minutes = max(minutes, distance)
            for neighbor in graph[node]:
                if neighbor in seen:
                    continue
                seen.add(neighbor)
                queue.append((neighbor, distance + 1))
        return minutes

    def _build_graph(self, root):
        graph = {}
        stack = [root]
        while stack:
            node = stack.pop()
            graph.setdefault(node.val, [])
            for child in (node.left, node.right):
                if child is None:
                    continue
                graph[node.val].append(child.val)
                graph.setdefault(child.val, []).append(node.val)
                stack.append(child)
        return graph
