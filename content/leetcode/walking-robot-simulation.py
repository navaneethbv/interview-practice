class Solution:
    def robotSim(self, commands, obstacles):
        blocked = {tuple(position) for position in obstacles}
        directions = ((0, 1), (1, 0), (0, -1), (-1, 0))
        direction_index = 0
        row = 0
        column = 0
        best_distance = 0
        for command in commands:
            if command == -2:
                direction_index = (direction_index - 1) % 4
                continue
            if command == -1:
                direction_index = (direction_index + 1) % 4
                continue
            row_step, column_step = directions[direction_index]
            for _ in range(command):
                next_position = (row + row_step, column + column_step)
                if next_position in blocked:
                    break
                row, column = next_position
                best_distance = max(best_distance, row * row + column * column)
        return best_distance
