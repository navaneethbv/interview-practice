class Solution:
    def spiralMatrixIII(self, rows, cols, rStart, cStart):
        row = rStart
        column = cStart
        coordinates = [[row, column]]
        directions = ((0, 1), (1, 0), (0, -1), (-1, 0))
        direction_index = 0
        step_length = 1
        while len(coordinates) < rows * cols:
            for _ in range(2):
                row_step, column_step = directions[direction_index % 4]
                for _ in range(step_length):
                    row += row_step
                    column += column_step
                    if 0 <= row < rows and 0 <= column < cols:
                        coordinates.append([row, column])
                direction_index += 1
            step_length += 1
        return coordinates
