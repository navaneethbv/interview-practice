class Solution:
    def calculate(self, s):
        total, sign, number = 0,1,0
        stack = []
        for c in s:
            if c.isdigit():
                number = number*10+int(c)
            elif c in '+-':
                total += sign*number
                number = 0
                sign = 1 if c == '+' else -1
            elif c == '(':
                stack.append((total,sign))
                total,sign = 0,1
            elif c == ')':
                total += sign*number
                number = 0
                previous,outer = stack.pop()
                total = previous+outer*total
        return total+sign*number
