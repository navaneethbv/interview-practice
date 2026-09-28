class Solution:
    KING = [(dr, dc) for dr in (-1, 0, 1) for dc in (-1, 0, 1) if dr or dc]
    KNIGHT = [(-2, -1), (-2, 1), (-1, -2), (-1, 2), (1, -2), (1, 2), (2, -1), (2, 1)]

    def chessMoves(self, board, piece, r, c):
        n = len(board)

        def free(row, col):
            return 0 <= row < n and 0 <= col < n and board[row][col] == 0

        if piece == "knight":
            return [[r + dr, c + dc] for dr, dc in self.KNIGHT if free(r + dr, c + dc)]
        if piece == "king":
            return [[r + dr, c + dc] for dr, dc in self.KING if free(r + dr, c + dc)]
        moves = []
        for dr, dc in self.KING:
            row, col = r + dr, c + dc
            while free(row, col):
                moves.append([row, col])
                row, col = row + dr, col + dc
        return moves
