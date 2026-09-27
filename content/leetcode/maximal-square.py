class Solution:
    def maximalSquare(self, matrix):
        previous=[0]*(len(matrix[0])+1);best=0
        for row in matrix:
            current=[0]
            for j,c in enumerate(row):
                value=1+min(previous[j],previous[j+1],current[-1]) if c=='1' else 0
                current.append(value);best=max(best,value)
            previous=current
        return best*best
