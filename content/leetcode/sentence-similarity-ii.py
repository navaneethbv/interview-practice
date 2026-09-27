class Solution:
    def areSentencesSimilarTwo(self,sentence1,sentence2,similarPairs):
        parent={}
        def find(x):
            parent.setdefault(x,x)
            if parent[x]!=x:parent[x]=find(parent[x])
            return parent[x]
        for a,b in similarPairs:parent[find(a)]=find(b)
        return len(sentence1)==len(sentence2) and all(find(a)==find(b) for a,b in zip(sentence1,sentence2))
