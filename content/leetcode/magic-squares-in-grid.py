class Solution:
    def numMagicSquaresInside(self, grid):
        count = 0
        for row_start in range(len(grid) - 2):
            for column_start in range(len(grid[0]) - 2):
                square = [
                    row[column_start:column_start + 3]
                    for row in grid[row_start:row_start + 3]
                ]
                values = sorted(value for row in square for value in row)
                if values != list(range(1, 10)):
                    continue
                lines = [sum(row) for row in square]
                lines.extend(
                    sum(square[row][column] for row in range(3))
                    for column in range(3)
                )
                lines.append(sum(square[index][index] for index in range(3)))
                lines.append(sum(square[index][2 - index] for index in range(3)))
                count += all(total == 15 for total in lines)
        return count
