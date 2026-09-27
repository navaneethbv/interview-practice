class Solution:
    def searchMatrix(self, matrix, target):
        columns = len(matrix[0]); left,right = 0,len(matrix)*columns-1
        while left <= right:
            mid = (left+right)//2; value = matrix[mid//columns][mid%columns]
            if value == target: return True
            if value < target: left = mid+1
            else: right = mid-1
        return False
