class Solution:
    def evalRPN(self, tokens):
        stack = []
        for token in tokens:
            if token not in {"+", "-", "*", "/"}:
                stack.append(int(token))
                continue
            right = stack.pop()
            left = stack.pop()
            stack.append(self._apply(token, left, right))
        return stack.pop()

    def _apply(self, operator, left, right):
        if operator == "+":
            return left + right
        if operator == "-":
            return left - right
        if operator == "*":
            return left * right
        quotient = abs(left) // abs(right)
        return -quotient if (left < 0) != (right < 0) else quotient
