class Solution:
    def collectClues(self, room):
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
            for nr, nc in self._unvisited_neighbors(room, r, c, visited):
                visited.add((nr, nc))
                path.append([nr, nc])
                walk(nr, nc, found + (room[nr][nc] == 2))
                path.pop()
                visited.remove((nr, nc))

        walk(0, 0, 0)
        return best[0] or []

    @staticmethod
    def _unvisited_neighbors(room, row, col, visited):
        for nr, nc in ((row + 1, col), (row - 1, col), (row, col + 1), (row, col - 1)):
            if 0 <= nr < len(room) and 0 <= nc < len(room[0]) and room[nr][nc] != 1 and (nr, nc) not in visited:
                yield nr, nc
