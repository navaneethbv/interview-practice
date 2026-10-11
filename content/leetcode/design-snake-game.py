from collections import deque


class SnakeGame:
    def __init__(self, width, height, food):
        self.width, self.height = width, height
        self.food = food
        self.eaten = 0
        self.body = deque([(0, 0)])
        self.cells = {(0, 0)}

    def move(self, direction):
        dr, dc = {"U": (-1, 0), "D": (1, 0), "L": (0, -1), "R": (0, 1)}[direction]
        r, c = self.body[0][0] + dr, self.body[0][1] + dc
        if not (0 <= r < self.height and 0 <= c < self.width):
            return -1
        if self.eaten < len(self.food) and [r, c] == self.food[self.eaten]:
            self.eaten += 1
        else:
            self.cells.discard(self.body.pop())
            if (r, c) in self.cells:
                return -1
        self.body.appendleft((r, c))
        self.cells.add((r, c))
        return self.eaten
