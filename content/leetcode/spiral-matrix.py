class Solution:
    def spiralOrder(self, matrix):
        top,bottom,left,right = 0,len(matrix)-1,0,len(matrix[0])-1
        result = []
        while top <= bottom and left <= right:
            result.extend(matrix[top][left:right+1]); top += 1
            for r in range(top,bottom+1): result.append(matrix[r][right])
            right -= 1
            if top <= bottom:
                for c in range(right,left-1,-1): result.append(matrix[bottom][c])
                bottom -= 1
            if left <= right:
                for r in range(bottom,top-1,-1): result.append(matrix[r][left])
                left += 1
        return result
