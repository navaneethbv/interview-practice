from collections import Counter
class AutocompleteSystem:
    def __init__(self,sentences,times):self.counts=Counter(dict(zip(sentences,times)));self.prefix=''
    def input(self,c):
        if c=='#':self.counts[self.prefix]+=1;self.prefix='';return []
        self.prefix+=c
        return sorted((s for s in self.counts if s.startswith(self.prefix)),key=lambda s:(-self.counts[s],s))[:3]
