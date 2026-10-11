import re


class Excel:
    def __init__(self, height, width):
        self.values = {}
        self.formulas = {}

    def set(self, row, column, val):
        self.formulas.pop((row, column), None)
        self.values[(row, column)] = val

    def get(self, row, column):
        refs = self.formulas.get((row, column))
        if refs is None:
            return self.values.get((row, column), 0)
        return sum(self.get(r, c) for r, c in refs)

    def sum(self, row, column, numbers):
        refs = []
        for item in numbers:
            first, _, last = item.partition(":")
            last = last or first
            c1, r1 = first[0], int(first[1:])
            c2, r2 = last[0], int(last[1:])
            refs += [(r, chr(c)) for r in range(r1, r2 + 1) for c in range(ord(c1), ord(c2) + 1)]
        self.formulas[(row, column)] = refs
        return self.get(row, column)
