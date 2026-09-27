class Solution:
    def candyCrush(self,board):
        m,n=len(board),len(board[0])
        while True:
            crush=set()
            for r in range(m):
                for c in range(n):
                    if board[r][c]==0:continue
                    if c+2<n and board[r][c]==board[r][c+1]==board[r][c+2]:crush.update([(r,c),(r,c+1),(r,c+2)])
                    if r+2<m and board[r][c]==board[r+1][c]==board[r+2][c]:crush.update([(r,c),(r+1,c),(r+2,c)])
            if not crush:return board
            for r,c in crush:board[r][c]=0
            for c in range(n):
                values=[board[r][c] for r in range(m) if board[r][c]]
                for r,value in enumerate([0]*(m-len(values))+values):board[r][c]=value
