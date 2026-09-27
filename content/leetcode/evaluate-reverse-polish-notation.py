class Solution:
    def evalRPN(self, tokens):
        stack = []
        for token in tokens:
            if token not in ('+','-','*','/'):
                stack.append(int(token)); continue
            b,a = stack.pop(),stack.pop()
            if token == '+': result = a+b
            elif token == '-': result = a-b
            elif token == '*': result = a*b
            else: result = (abs(a)//abs(b)) * (-1 if (a < 0) != (b < 0) else 1)
            stack.append(result)
        return stack[0]
