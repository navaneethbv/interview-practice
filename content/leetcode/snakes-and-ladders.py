from collections import deque
class Solution:
    def snakesAndLadders(self,board):
        n=len(board)
        def jump(square):
            row,col=divmod(square-1,n)
            if row%2:col=n-1-col
            value=board[n-1-row][col]
            return square if value==-1 else value
        q=deque([(1,0)]);seen={1}
        while q:
            square,turns=q.popleft()
            if square==n*n:return turns
            for next_square in range(square+1,min(n*n,square+6)+1):
                end=jump(next_square)
                if end not in seen:seen.add(end);q.append((end,turns+1))
        return -1
