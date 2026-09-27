from collections import deque
class Solution:
    def wallsAndGates(self, rooms):
        rows, cols = len(rooms), len(rooms[0])
        queue = deque((r,c) for r in range(rows) for c in range(cols) if rooms[r][c] == 0)
        while queue:
            r,c = queue.popleft()
            for a,b in ((r-1,c),(r+1,c),(r,c-1),(r,c+1)):
                if 0 <= a < rows and 0 <= b < cols and rooms[a][b] == 2147483647:
                    rooms[a][b] = rooms[r][c]+1
                    queue.append((a,b))
