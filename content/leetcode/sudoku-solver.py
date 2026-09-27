class Solution:
    def solveSudoku(self, board):
        rows,cols,boxes=[set() for _ in range(9)],[set() for _ in range(9)],[set() for _ in range(9)]
        empty=[]
        for r in range(9):
            for c in range(9):
                v=board[r][c]
                if v=='.':empty.append((r,c))
                else:rows[r].add(v);cols[c].add(v);boxes[r//3*3+c//3].add(v)
        self._board=board;self._empty=empty;self._used=(rows,cols,boxes)
        self._search(0)

    def _search(self, i):
        """Fills empty cells from index i by backtracking; returns True once the board is solved."""
        if i==len(self._empty):return True
        rows,cols,boxes=self._used
        r,c=self._empty[i];box=r//3*3+c//3
        for v in '123456789':
            if v in rows[r] or v in cols[c] or v in boxes[box]:continue
            self._board[r][c]=v;rows[r].add(v);cols[c].add(v);boxes[box].add(v)
            if self._search(i+1):return True
            rows[r].remove(v);cols[c].remove(v);boxes[box].remove(v)
        self._board[r][c]='.'
        return False
