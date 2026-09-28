class Solution:
    def maxSumBST(self, root):
        info = {None: (True, float("inf"), float("-inf"), 0)}
        stack = [(root, False)]
        best = 0
        while stack:
            node, ready = stack.pop()
            if node is None:
                continue
            if not ready:
                stack.append((node, True))
                stack.append((node.right, False))
                stack.append((node.left, False))
                continue
            left_info = info[node.left]
            right_info = info[node.right]
            valid = (left_info[0] and right_info[0]
                     and left_info[2] < node.val < right_info[1])
            total = node.val + left_info[3] + right_info[3]
            info[node] = (valid, min(node.val, left_info[1]),
                          max(node.val, right_info[2]), total)
            if valid:
                best = max(best, total)
        return best
