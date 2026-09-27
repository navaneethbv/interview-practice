class Solution:
    def exist(self, board, word):
        rows,cols = len(board),len(board[0])
        if len(word) > rows * cols:
            return False
        def search(r,c,i,seen):
            if not (0 <= r < rows and 0 <= c < cols) or (r,c) in seen or board[r][c] != word[i]:
                return False
            if i == len(word)-1:
                return True
            seen.add((r,c))
            found = any(search(x,y,i+1,seen) for x,y in ((r-1,c),(r+1,c),(r,c-1),(r,c+1)))
            seen.remove((r,c))
            return found
        return any(search(r,c,0,set()) for r in range(rows) for c in range(cols))
