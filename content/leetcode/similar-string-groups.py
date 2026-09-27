class Solution:
    def numSimilarGroups(self,strs):
        parent=list(range(len(strs)))
        def find(i):
            while parent[i]!=i:parent[i]=parent[parent[i]];i=parent[i]
            return i
        for i in range(len(strs)):
            for j in range(i):
                if sum(a!=b for a,b in zip(strs[i],strs[j]))<=2:parent[find(i)]=find(j)
        return len({find(i) for i in range(len(strs))})
