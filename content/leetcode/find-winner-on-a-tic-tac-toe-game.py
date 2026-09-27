class Solution:
    def tictactoe(self,moves):
        board=[['']*3 for _ in range(3)]
        for i,(r,c) in enumerate(moves):board[r][c]='AB'[i%2]
        lines=board+[[board[r][c] for r in range(3)] for c in range(3)]+[[board[i][i] for i in range(3)],[board[i][2-i] for i in range(3)]]
        for line in lines:
            if line[0] and len(set(line))==1:return line[0]
        return 'Draw' if len(moves)==9 else 'Pending'
