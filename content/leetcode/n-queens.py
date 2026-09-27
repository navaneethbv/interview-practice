class Solution:
    def solveNQueens(self, n):
        result = []
        def visit(cols, down, up, board):
            row = len(board)
            if row == n:
                result.append(board)
                return
            for col in range(n):
                if col not in cols and row-col not in down and row+col not in up:
                    visit(cols|{col}, down|{row-col}, up|{row+col}, board+['.'*col+'Q'+'.'*(n-col-1)])
        visit(set(), set(), set(), [])
        return result
