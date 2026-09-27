from collections import deque
class StreamChecker:
    def __init__(self,words):
        self.root={};self.stream=deque(maxlen=max(map(len,words)))
        for word in words:
            node=self.root
            for c in reversed(word):node=node.setdefault(c,{})
            node['$']=True
    def query(self,letter):
        self.stream.append(letter);node=self.root
        for c in reversed(self.stream):
            if c not in node:return False
            node=node[c]
            if '$' in node:return True
        return False
