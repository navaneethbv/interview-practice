class Solution:
    def numTrees(self, n):
        counts=[1]+[0]*n
        for size in range(1,n+1):
            counts[size]=sum(counts[left]*counts[size-1-left] for left in range(size))
        return counts[n]
