class Solution:
    def candyCrush(self,board):
        while True:
            crush=self._crushable(board)
            if not crush:return board
            for r,c in crush:board[r][c]=0
            self._drop(board)

    def _crushable(self, board):
        m,n=len(board),len(board[0]);crush=set()
        for r in range(m):
            for c in range(n):
                v=board[r][c]
                if v and c+2<n and v==board[r][c+1]==board[r][c+2]:crush.update([(r,c),(r,c+1),(r,c+2)])
                if v and r+2<m and v==board[r+1][c]==board[r+2][c]:crush.update([(r,c),(r+1,c),(r+2,c)])
        return crush

    def _drop(self, board):
        m=len(board)
        for c in range(len(board[0])):
            values=[board[r][c] for r in range(m) if board[r][c]]
            for r,value in enumerate([0]*(m-len(values))+values):board[r][c]=value
