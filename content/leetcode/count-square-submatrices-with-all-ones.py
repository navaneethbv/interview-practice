class Solution:
    def countSquares(self, matrix):
        previous=[0]*(len(matrix[0])+1);total=0
        for row in matrix:
            current=[0]
            for j,v in enumerate(row):
                count=1+min(previous[j],previous[j+1],current[-1]) if v else 0
                current.append(count);total+=count
            previous=current
        return total
