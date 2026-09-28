class FileSystem:
    def __init__(self):
        self.values = {}

    def createPath(self, path, value):
        parent = path.rsplit("/", 1)[0]
        parent_missing = parent and parent not in self.values
        if path in self.values or parent_missing:
            return False
        self.values[path] = value
        return True

    def get(self, path):
        return self.values.get(path, -1)
