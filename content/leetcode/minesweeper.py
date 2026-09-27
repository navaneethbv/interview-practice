from collections import deque
class Solution:
    def updateBoard(self, board, click):
        r,c=click
        if board[r][c]=='M':board[r][c]='X';return board
        m,n=len(board),len(board[0]);q=deque([(r,c)]);seen={(r,c)}
        while q:
            r,c=q.popleft()
            neighbors=[(a,b) for a in range(r-1,r+2) for b in range(c-1,c+2) if 0<=a<m and 0<=b<n and (a,b)!=(r,c)]
            mines=sum(board[a][b]=='M' for a,b in neighbors)
            board[r][c]=str(mines) if mines else 'B'
            if not mines:
                for a,b in neighbors:
                    if board[a][b]=='E' and (a,b) not in seen:seen.add((a,b));q.append((a,b))
        return board
