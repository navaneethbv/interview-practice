from collections import Counter
class Solution:
    def countOfAtoms(self, formula):
        stack=[Counter()];i=0
        while i<len(formula):
            c=formula[i]
            if c=='(':
                stack.append(Counter());i+=1
            elif c==')':
                count,i=self._number(formula,i+1);group=stack.pop()
                for atom,n in group.items():stack[-1][atom]+=n*count
            else:
                atom,i=self._atom(formula,i);count,i=self._number(formula,i);stack[-1][atom]+=count
        return ''.join(atom+(str(n) if n>1 else '') for atom,n in sorted(stack[0].items()))

    @staticmethod
    def _number(formula, i):
        """Reads an optional count at i (default 1); returns it and the index after it."""
        start=i
        while i<len(formula) and formula[i].isdigit():i+=1
        return (int(formula[start:i]) if i>start else 1),i

    @staticmethod
    def _atom(formula, i):
        start=i;i+=1
        while i<len(formula) and formula[i].islower():i+=1
        return formula[start:i],i
