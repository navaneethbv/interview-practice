class Solution:
    def pondSizes(self, land):
        rows, cols = len(land), len(land[0])
        visited = [[False] * cols for _ in range(rows)]
        sizes = []
        for row in range(rows):
            for col in range(cols):
                if land[row][col] == 0 and not visited[row][col]:
                    sizes.append(self._fill(land, visited, row, col))
        return sorted(sizes)

    def _fill(self, land, visited, row, col):
        visited[row][col] = True
        stack = [(row, col)]
        size = 0
        while stack:
            r, c = stack.pop()
            size += 1
            for dr in (-1, 0, 1):
                for dc in (-1, 0, 1):
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < len(land) and 0 <= nc < len(land[0]) and land[nr][nc] == 0 and not visited[nr][nc]:
                        visited[nr][nc] = True
                        stack.append((nr, nc))
        return size
