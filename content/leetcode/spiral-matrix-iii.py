class Solution:
    def spiralMatrixIII(self,rows,cols,rStart,cStart):
        r,c=rStart,cStart;result=[[r,c]];length=1;direction=0;dirs=[(0,1),(1,0),(0,-1),(-1,0)]
        while len(result)<rows*cols:
            for _ in range(2):
                dr,dc=dirs[direction%4]
                for _ in range(length):
                    r+=dr;c+=dc
                    if 0<=r<rows and 0<=c<cols:result.append([r,c])
                direction+=1
            length+=1
        return result
