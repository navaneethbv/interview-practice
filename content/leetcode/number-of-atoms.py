from collections import Counter
class Solution:
    def countOfAtoms(self, formula):
        stack=[Counter()];i=0
        def number():
            nonlocal i
            start=i
            while i<len(formula) and formula[i].isdigit():i+=1
            return int(formula[start:i]) if i>start else 1
        while i<len(formula):
            c=formula[i]
            if c=='(':stack.append(Counter());i+=1
            elif c==')':
                i+=1;count=number();group=stack.pop()
                for atom,n in group.items():stack[-1][atom]+=n*count
            else:
                start=i;i+=1
                while i<len(formula) and formula[i].islower():i+=1
                atom=formula[start:i];stack[-1][atom]+=number()
        return ''.join(atom+(str(n) if n>1 else '') for atom,n in sorted(stack[0].items()))
