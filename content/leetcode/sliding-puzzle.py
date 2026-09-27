from collections import deque
class Solution:
    def slidingPuzzle(self, board):
        start = tuple(board[0] + board[1])
        target = (1, 2, 3, 4, 5, 0)
        queue = deque([(start, 0)])
        seen = {start}
        neighbors = [[1, 3], [0, 2, 4], [1, 5], [0, 4], [1, 3, 5], [2, 4]]
        while queue:
            state, steps = queue.popleft()
            if state == target:
                return steps
            blank = state.index(0)
            for neighbor in neighbors[blank]:
                values = list(state)
                values[blank], values[neighbor] = values[neighbor], values[blank]
                next_state = tuple(values)
                if next_state in seen:
                    continue
                seen.add(next_state)
                queue.append((next_state, steps + 1))
        return -1
