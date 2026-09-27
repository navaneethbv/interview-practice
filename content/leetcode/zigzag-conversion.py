class Solution:
    def convert(self, s, numRows):
        if numRows == 1 or numRows >= len(s): return s
        rows = ['']*numRows; row = 0; step = 1
        for c in s:
            rows[row] += c
            if row == 0: step = 1
            elif row == numRows-1: step = -1
            row += step
        return ''.join(rows)
