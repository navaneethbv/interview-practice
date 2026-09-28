class Solution:
    def collectClues(self, room):
        rows, cols = len(room), len(room[0])
        clues = sum(row.count(2) for row in room)
        best = [None]
        path = [[0, 0]]
        visited = {(0, 0)}

        def walk(r, c, found):
            if found == clues:
                if best[0] is None or len(path) < len(best[0]):
                    best[0] = [cell[:] for cell in path]
                return
            if best[0] is not None and len(path) + (clues - found) >= len(best[0]):
                return
            for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
                if 0 <= nr < rows and 0 <= nc < cols and room[nr][nc] != 1 and (nr, nc) not in visited:
                    visited.add((nr, nc))
                    path.append([nr, nc])
                    walk(nr, nc, found + (room[nr][nc] == 2))
                    path.pop()
                    visited.remove((nr, nc))

        walk(0, 0, 0)
        return best[0] or []
