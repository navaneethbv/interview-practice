class Solution:
    def maxLevelSum(self, root):
        level = [root]
        depth = 0
        best = float("-inf")
        answer = 1
        while level:
            depth += 1
            total = sum(node.val for node in level)
            if total > best:
                best = total
                answer = depth
            level = [
                child
                for node in level
                for child in (node.left, node.right)
                if child
            ]
        return answer
