class Solution:
    def rob(self, root):
        if root is None:
            return 0

        results = {None: (0, 0)}
        stack = [(root, False)]
        while stack:
            node, finished = stack.pop()
            if finished:
                left_robbed, left_skipped = results[node.left]
                right_robbed, right_skipped = results[node.right]
                rob_current = node.val + left_skipped + right_skipped
                skip_current = max(left_robbed, left_skipped) + max(
                    right_robbed, right_skipped
                )
                results[node] = (rob_current, skip_current)
                continue

            stack.append((node, True))
            if node.right:
                stack.append((node.right, False))
            if node.left:
                stack.append((node.left, False))

        return max(results[root])
