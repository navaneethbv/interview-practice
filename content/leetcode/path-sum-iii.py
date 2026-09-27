from collections import Counter


class Solution:
    def pathSum(self, root, targetSum):
        prefix_counts = Counter({0: 1})
        answer = 0
        stack = [(root, 0, False)] if root else []
        while stack:
            node, prefix_sum, leaving = stack.pop()
            if leaving:
                prefix_counts[prefix_sum] -= 1
                continue
            prefix_sum += node.val
            answer += prefix_counts[prefix_sum - targetSum]
            prefix_counts[prefix_sum] += 1
            stack.append((node, prefix_sum, True))
            if node.right:
                stack.append((node.right, prefix_sum, False))
            if node.left:
                stack.append((node.left, prefix_sum, False))
        return answer
