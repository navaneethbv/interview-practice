class Solution:
    def equationsPossible(self, equations):
        parent=list(range(26))
        def find(x):
            while parent[x]!=x:parent[x]=parent[parent[x]];x=parent[x]
            return x
        for e in equations:
            if e[1]=='=':parent[find(ord(e[0])-97)]=find(ord(e[3])-97)
        return all(e[1]=='=' or find(ord(e[0])-97)!=find(ord(e[3])-97) for e in equations)
