class Solution:
    def cleanRoom(self, robot):
        directions = [(-1, 0), (0, 1), (1, 0), (0, -1)]
        visited = {(0, 0)}
        robot.clean()
        frames = [[0, 0, 0, 0]]

        while frames:
            row, column, facing, offset = frames[-1]
            if offset == 4:
                frames.pop()
                if frames:
                    self._return_to_cell(robot)
                    robot.turnRight()
                continue

            frames[-1][3] += 1
            direction = (facing + offset) % 4
            next_row = row + directions[direction][0]
            next_column = column + directions[direction][1]
            next_cell = (next_row, next_column)

            if next_cell not in visited and robot.move():
                visited.add(next_cell)
                robot.clean()
                frames.append([next_row, next_column, direction, 0])
            else:
                robot.turnRight()

    @staticmethod
    def _return_to_cell(robot):
        robot.turnRight()
        robot.turnRight()
        robot.move()
        robot.turnRight()
        robot.turnRight()
