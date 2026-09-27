class Solution:
    def longestValidParentheses(self, s):
        stack = [-1]
        longest = 0
        for index, character in enumerate(s):
            if character == '(':
                stack.append(index)
            else:
                stack.pop()
                if not stack:
                    stack.append(index)
                else:
                    longest = max(longest, index - stack[-1])
        return longest
