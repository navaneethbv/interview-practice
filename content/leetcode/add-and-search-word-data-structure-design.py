class WordDictionary:
    def __init__(self): self.root={}
    def addWord(self,word):
        node=self.root
        for ch in word: node=node.setdefault(ch,{})
        node['$']=True
    def search(self,word):
        nodes=[self.root]
        for ch in word:
            if ch=='.': nodes=[child for node in nodes for key,child in node.items() if key!='$']
            else: nodes=[node[ch] for node in nodes if ch in node]
        return any('$' in node for node in nodes)
