class Solution:
    def compress(self, arr):
        stack = []
        for value in arr:
            while stack and stack[-1] == value:
                value += stack.pop()
            stack.append(value)
        return stack
