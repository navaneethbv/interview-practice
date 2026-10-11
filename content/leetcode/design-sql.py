class SQL:
    def __init__(self, names, columns):
        self.tables = {name: {} for name in names}
        self.next_id = {name: 1 for name in names}

    def insertRow(self, name, row):
        self.tables[name][self.next_id[name]] = list(row)
        self.next_id[name] += 1

    def deleteRow(self, name, rowId):
        del self.tables[name][rowId]

    def selectCell(self, name, rowId, columnId):
        return self.tables[name][rowId][columnId - 1]
