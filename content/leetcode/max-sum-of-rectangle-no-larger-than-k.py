from bisect import bisect_left,insort
class Solution:
    def maxSumSubmatrix(self, matrix, k):
        m,n=len(matrix),len(matrix[0]);best=-float('inf')
        for top in range(m):
            columns=[0]*n
            for bottom in range(top,m):
                columns=[a+b for a,b in zip(columns,matrix[bottom])];prefix=0;seen=[0]
                for value in columns:
                    prefix+=value;i=bisect_left(seen,prefix-k)
                    if i<len(seen):best=max(best,prefix-seen[i])
                    insort(seen,prefix)
        return best
