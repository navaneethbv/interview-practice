class Solution:
    def exist(self, board, word):
        if len(word) > len(board) * len(board[0]):
            return False
        seen = set()
        for row in range(len(board)):
            for column in range(len(board[0])):
                if self._search(board, word, row, column, 0, seen):
                    return True
        return False

    def _search(self, board, word, row, column, index, seen):
        if not (0 <= row < len(board) and 0 <= column < len(board[0])):
            return False
        if (row, column) in seen or board[row][column] != word[index]:
            return False
        if index == len(word) - 1:
            return True
        seen.add((row, column))
        neighbors = ((row - 1, column), (row + 1, column),
                     (row, column - 1), (row, column + 1))
        found = any(self._search(board, word, next_row, next_column, index + 1, seen)
                    for next_row, next_column in neighbors)
        seen.remove((row, column))
        return found
