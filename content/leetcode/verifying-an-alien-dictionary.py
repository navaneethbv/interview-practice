class Solution:
    def isAlienSorted(self,words,order):
        rank={c:i for i,c in enumerate(order)}
        keys=[tuple(rank[c] for c in w) for w in words]
        return all(a<=b for a,b in zip(keys,keys[1:]))
