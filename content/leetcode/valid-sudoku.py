class Solution:
    def isValidSudoku(self, board):
        seen = set()
        for r,row in enumerate(board):
            for c,value in enumerate(row):
                if value == '.': continue
                keys = [('r',r,value),('c',c,value),('b',r//3,c//3,value)]
                if any(key in seen for key in keys): return False
                seen.update(keys)
        return True
