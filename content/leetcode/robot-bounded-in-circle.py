class Solution:
    def isRobotBounded(self, instructions):
        x = 0
        y = 0
        direction = 0
        directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]
        for instruction in instructions:
            if instruction == 'L':
                direction = (direction - 1) % 4
            elif instruction == 'R':
                direction = (direction + 1) % 4
            else:
                dx, dy = directions[direction]
                x += dx
                y += dy
        return (x == 0 and y == 0) or direction != 0
