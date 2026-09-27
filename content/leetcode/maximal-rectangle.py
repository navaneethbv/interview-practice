class Solution:
    def maximalRectangle(self, matrix):
        height=[0]*len(matrix[0]); best=0
        for row in matrix:
            height=[h+1 if c=='1' else 0 for h,c in zip(height,row)]
            stack=[]
            for i,h in enumerate(height+[0]):
                start=i
                while stack and stack[-1][1]>h:
                    start,old=stack.pop(); best=max(best,old*(i-start))
                stack.append((start,h))
        return best
