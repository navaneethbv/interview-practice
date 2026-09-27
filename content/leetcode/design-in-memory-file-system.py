class FileSystem:
    def __init__(self):
        self.directories = {'/'}
        self.files = {}

    def ls(self, path):
        if path in self.files:
            return [path.rsplit('/', 1)[1]]
        prefix = path.rstrip('/') + '/'
        names = set()
        all_paths = self.directories | self.files.keys()
        for child_path in all_paths:
            if child_path == path or not child_path.startswith(prefix):
                continue
            relative_path = child_path[len(prefix):]
            if '/' not in relative_path:
                names.add(relative_path)
        return sorted(names)

    def mkdir(self, path):
        current_path = ''
        for part in path.strip('/').split('/'):
            current_path += '/' + part
            self.directories.add(current_path)

    def addContentToFile(self, filePath, content):
        self.files[filePath] = self.files.get(filePath, '') + content

    def readContentFromFile(self, filePath):
        return self.files[filePath]
