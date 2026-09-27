class Solution:
    def isValidSudoku(self, board):
        seen = set()
        for row, values in enumerate(board):
            for column, value in enumerate(values):
                if value == '.':
                    continue
                keys = [('row', row, value), ('column', column, value),
                        ('box', row // 3, column // 3, value)]
                if any(key in seen for key in keys):
                    return False
                seen.update(keys)
        return True
