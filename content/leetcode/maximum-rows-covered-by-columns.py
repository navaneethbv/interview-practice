from itertools import combinations
class Solution:
    def maximumRows(self,matrix,numSelect):
        masks=[sum(v<<c for c,v in enumerate(row)) for row in matrix];best=0
        for cols in combinations(range(len(matrix[0])),numSelect):
            mask=sum(1<<c for c in cols);best=max(best,sum(row&mask==row for row in masks))
        return best
