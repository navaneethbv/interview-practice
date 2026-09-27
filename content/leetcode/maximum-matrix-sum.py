class Solution:
    def maxMatrixSum(self, matrix):
        values=[value for row in matrix for value in row]; total=sum(abs(value) for value in values)
        return total-(2*min(abs(value) for value in values) if sum(value<0 for value in values)%2 else 0)
