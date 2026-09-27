import heapq


class Solution:
    def trapRainWater(self, heightMap):
        rows = len(heightMap)
        columns = len(heightMap[0])
        visited = set()
        boundary = []

        for row in range(rows):
            for column in range(columns):
                if row in (0, rows - 1) or column in (0, columns - 1):
                    visited.add((row, column))
                    boundary.append((heightMap[row][column], row, column))

        heapq.heapify(boundary)
        trapped = 0
        while boundary:
            level, row, column = heapq.heappop(boundary)
            for next_row, next_column in (
                    (row - 1, column), (row + 1, column),
                    (row, column - 1), (row, column + 1)):
                if (0 <= next_row < rows and 0 <= next_column < columns
                        and (next_row, next_column) not in visited):
                    visited.add((next_row, next_column))
                    neighbor_height = heightMap[next_row][next_column]
                    trapped += max(0, level - neighbor_height)
                    heapq.heappush(
                        boundary,
                        (max(level, neighbor_height), next_row, next_column),
                    )
        return trapped
