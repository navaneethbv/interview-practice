class Spreadsheet:
    def __init__(self, rows):
        self.cells = {}

    def setCell(self, cell, value):
        self.cells[cell] = value

    def resetCell(self, cell):
        self.cells.pop(cell, None)

    def getValue(self, formula):
        total = 0
        for term in formula[1:].split("+"):
            total += int(term) if term[0].isdigit() else self.cells.get(term, 0)
        return total
