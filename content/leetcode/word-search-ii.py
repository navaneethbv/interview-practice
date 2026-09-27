class Solution:
    def findWords(self, board, words):
        trie = {}
        for word in words:
            node = trie
            for character in word:
                node = node.setdefault(character, {})
            node['$'] = word
        self._board = board
        self._result = []
        for row in range(len(board)):
            for column in range(len(board[0])):
                self._visit(row, column, trie)
        return self._result

    def _visit(self, row, column, parent):
        board = self._board
        character = board[row][column]
        if character not in parent:
            return
        node = parent[character]
        if '$' in node:
            self._result.append(node.pop('$'))
        board[row][column] = '#'
        neighbors = ((row - 1, column), (row + 1, column),
                     (row, column - 1), (row, column + 1))
        for next_row, next_column in neighbors:
            if 0 <= next_row < len(board) and 0 <= next_column < len(board[0]):
                self._visit(next_row, next_column, node)
        board[row][column] = character
        if not node:
            del parent[character]
