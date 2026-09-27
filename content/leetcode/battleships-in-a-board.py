class Solution:
    def countBattleships(self, board):
        return sum(board[r][c]=='X' and (r==0 or board[r-1][c]!='X') and (c==0 or board[r][c-1]!='X') for r in range(len(board)) for c in range(len(board[0])))
