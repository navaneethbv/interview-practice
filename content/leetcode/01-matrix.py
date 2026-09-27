from collections import deque
class Solution:
    def updateMatrix(self, mat):
        m,n = len(mat),len(mat[0])
        dist = [[-1]*n for _ in range(m)]
        q = deque()
        for r in range(m):
            for c in range(n):
                if mat[r][c] == 0:
                    dist[r][c] = 0
                    q.append((r,c))
        while q:
            r,c = q.popleft()
            for a,b in ((r-1,c),(r+1,c),(r,c-1),(r,c+1)):
                if 0<=a<m and 0<=b<n and dist[a][b]<0:
                    dist[a][b] = dist[r][c]+1
                    q.append((a,b))
        return dist
