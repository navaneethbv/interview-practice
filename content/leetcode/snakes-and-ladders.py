from collections import deque


class Solution:
    def snakesAndLadders(self, board):
        size = len(board)

        def destination(square):
            row_from_bottom, offset = divmod(square - 1, size)
            column = offset if row_from_bottom % 2 == 0 else size - 1 - offset
            value = board[size - 1 - row_from_bottom][column]
            return square if value == -1 else value

        queue = deque([(1, 0)])
        visited = {1}
        while queue:
            square, turns = queue.popleft()
            if square == size * size:
                return turns
            for next_square in range(square + 1, min(size * size, square + 6) + 1):
                landing_square = destination(next_square)
                if landing_square not in visited:
                    visited.add(landing_square)
                    queue.append((landing_square, turns + 1))
        return -1
