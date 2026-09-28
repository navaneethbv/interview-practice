class Solution:
    DIRECTIONS = [(dr, dc) for dr in (-1, 0, 1) for dc in (-1, 0, 1) if dr or dc]

    def queensReach(self, board):
        n = len(board)
        unsafe = [row[:] for row in board]
        for r in range(n):
            for c in range(n):
                if board[r][c] != 1:
                    continue
                for dr, dc in self.DIRECTIONS:
                    row, col = r + dr, c + dc
                    while 0 <= row < n and 0 <= col < n and board[row][col] == 0:
                        unsafe[row][col] = 1
                        row, col = row + dr, col + dc
        return unsafe
