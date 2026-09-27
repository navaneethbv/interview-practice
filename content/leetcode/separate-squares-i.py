class Solution:
    def separateSquares(self, squares):
        target=sum(side*side for x,y,side in squares)/2; left=min(y for x,y,side in squares); right=max(y+side for x,y,side in squares)
        for _ in range(90):
            middle=(left+right)/2; below=sum(side*max(0,min(side,middle-y)) for x,y,side in squares)
            if below>=target: right=middle
            else: left=middle
        return right
