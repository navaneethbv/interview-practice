class Solution:
    def resultGrid(self,image,threshold):
        m,n=len(image),len(image[0]);totals=[[0]*n for _ in range(m)];counts=[[0]*n for _ in range(m)]
        for r in range(m-2):
            for c in range(n-2):
                valid=all(abs(image[a][b]-image[a+1][b])<=threshold for a in range(r,r+2) for b in range(c,c+3)) and all(abs(image[a][b]-image[a][b+1])<=threshold for a in range(r,r+3) for b in range(c,c+2))
                if not valid:continue
                average=sum(image[a][b] for a in range(r,r+3) for b in range(c,c+3))//9
                for a in range(r,r+3):
                    for b in range(c,c+3):totals[a][b]+=average;counts[a][b]+=1
        return [[totals[r][c]//counts[r][c] if counts[r][c] else image[r][c] for c in range(n)] for r in range(m)]
