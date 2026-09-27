class Solution:
    def calculate(self, s):
        stack=[];number=0;operator='+'
        for c in s+'+':
            if c.isdigit():number=number*10+int(c)
            elif c!=' ':
                if operator=='+':stack.append(number)
                elif operator=='-':stack.append(-number)
                elif operator=='*':stack[-1]*=number
                else:
                    value=stack[-1];stack[-1]=(abs(value)//number)*(-1 if value<0 else 1)
                number=0;operator=c
        return sum(stack)
