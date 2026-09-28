class Solution:
    def hasWon(self, board):
        n = len(board)
        lines = [board[row] for row in range(n)]
        lines += ["".join(board[row][col] for row in range(n)) for col in range(n)]
        lines.append("".join(board[i][i] for i in range(n)))
        lines.append("".join(board[i][n - 1 - i] for i in range(n)))
        for line in lines:
            if line[0] != " " and line == line[0] * n:
                return line[0]
        return ""
