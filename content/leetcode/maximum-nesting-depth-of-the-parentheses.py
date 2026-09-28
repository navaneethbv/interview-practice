class Solution:
    def maxDepth(self, s):
        depth = 0
        greatest = 0
        for character in s:
            if character == '(':
                depth += 1
                greatest = max(greatest, depth)
            elif character == ')':
                depth -= 1
        return greatest
