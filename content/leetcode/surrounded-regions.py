class Solution:
    def solve(self, board):
        rows, cols = len(board), len(board[0])
        stack = [(r,c) for r in range(rows) for c in range(cols) if (r in (0,rows-1) or c in (0,cols-1)) and board[r][c] == 'O']
        while stack:
            r,c = stack.pop()
            if not (0 <= r < rows and 0 <= c < cols) or board[r][c] != 'O':
                continue
            board[r][c] = '#'
            stack.extend(((r-1,c),(r+1,c),(r,c-1),(r,c+1)))
        for r in range(rows):
            for c in range(cols):
                board[r][c] = 'O' if board[r][c] == '#' else 'X'
