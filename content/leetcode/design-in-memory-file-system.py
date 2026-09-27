class FileSystem:
    def __init__(self):
        self.dirs={'/'};self.files={}
    def ls(self, path):
        if path in self.files:return [path.rsplit('/',1)[1]]
        prefix=path.rstrip('/')+'/'
        return sorted({p[len(prefix):] for p in self.dirs|self.files.keys() if p.startswith(prefix) and p!=path and '/' not in p[len(prefix):]})
    def mkdir(self, path):
        current=''
        for part in path.strip('/').split('/'):
            current+='/'+part;self.dirs.add(current)
    def addContentToFile(self, filePath, content):
        self.files[filePath]=self.files.get(filePath,'')+content
    def readContentFromFile(self, filePath):
        return self.files[filePath]
