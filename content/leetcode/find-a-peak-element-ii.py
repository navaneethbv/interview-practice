class Solution:
    def findPeakGrid(self, mat):
        left,right=0,len(mat[0])-1
        while left<=right:
            column=(left+right)//2; row=max(range(len(mat)),key=lambda r:mat[r][column])
            if column>0 and mat[row][column-1]>mat[row][column]: right=column-1
            elif column+1<len(mat[0]) and mat[row][column+1]>mat[row][column]: left=column+1
            else: return [row,column]
