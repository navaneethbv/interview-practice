class Solution:
    def solveSudoku(self, board):
        rows,cols,boxes=[set() for _ in range(9)],[set() for _ in range(9)],[set() for _ in range(9)]
        empty=[]
        for r in range(9):
            for c in range(9):
                v=board[r][c]
                if v=='.':empty.append((r,c))
                else:
                    rows[r].add(v);cols[c].add(v);boxes[r//3*3+c//3].add(v)
        def search(i):
            if i==len(empty):return True
            r,c=empty[i];box=r//3*3+c//3
            for v in '123456789':
                if v not in rows[r] and v not in cols[c] and v not in boxes[box]:
                    board[r][c]=v;rows[r].add(v);cols[c].add(v);boxes[box].add(v)
                    if search(i+1):return True
                    rows[r].remove(v);cols[c].remove(v);boxes[box].remove(v)
            board[r][c]='.'
            return False
        search(0)
