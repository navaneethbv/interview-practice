class FileSystem:
    def __init__(self): self.values={}
    def createPath(self,path,value):
        parent=path.rsplit('/',1)[0]
        if path in self.values or parent and parent not in self.values: return False
        self.values[path]=value; return True
    def get(self,path): return self.values.get(path,-1)
