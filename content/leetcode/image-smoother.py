class Solution:
    def imageSmoother(self,img):
        m,n=len(img),len(img[0]);out=[[0]*n for _ in range(m)]
        for r in range(m):
            for c in range(n):
                values=[img[a][b] for a in range(max(0,r-1),min(m,r+2)) for b in range(max(0,c-1),min(n,c+2))]
                out[r][c]=sum(values)//len(values)
        return out
