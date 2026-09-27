class Solution:
    def largestSubmatrix(self, matrix):
        heights=[0]*len(matrix[0]);best=0
        for row in matrix:
            heights=[h+1 if v else 0 for h,v in zip(heights,row)]
            for width,height in enumerate(sorted(heights,reverse=True),1):best=max(best,width*height)
        return best
