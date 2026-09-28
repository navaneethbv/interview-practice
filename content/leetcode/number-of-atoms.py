from collections import Counter
class Solution:
    def countOfAtoms(self, formula):
        scopes = [Counter()]
        index = 0
        while index < len(formula):
            character = formula[index]
            if character == "(":
                scopes.append(Counter())
                index += 1
            elif character == ")":
                multiplier, index = self._number(formula, index + 1)
                group = scopes.pop()
                for atom, count in group.items():
                    scopes[-1][atom] += count * multiplier
            else:
                atom, index = self._atom(formula, index)
                count, index = self._number(formula, index)
                scopes[-1][atom] += count
        return "".join(
            atom + (str(count) if count > 1 else "")
            for atom, count in sorted(scopes[0].items())
        )

    @staticmethod
    def _number(formula, i):
        """Reads an optional count at i (default 1); returns it and the index after it."""
        start = i
        while i < len(formula) and formula[i].isdigit():
            i += 1
        count = int(formula[start:i]) if i > start else 1
        return count, i

    @staticmethod
    def _atom(formula, i):
        start = i
        i += 1
        while i < len(formula) and formula[i].islower():
            i += 1
        return formula[start:i],i
