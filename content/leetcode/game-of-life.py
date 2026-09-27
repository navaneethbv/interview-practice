class Solution:
    def gameOfLife(self, board):
        rows,cols=len(board),len(board[0])
        for r in range(rows):
            for c in range(cols):
                neighbors=sum(board[a][b]&1 for a in range(max(0,r-1),min(rows,r+2)) for b in range(max(0,c-1),min(cols,c+2)) if (a,b)!=(r,c))
                if neighbors==3 or (board[r][c]&1 and neighbors==2): board[r][c]|=2
        for r in range(rows):
            for c in range(cols): board[r][c]>>=1
