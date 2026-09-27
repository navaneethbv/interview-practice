from collections import deque
class Solution:
    def openLock(self, deadends, target):
        blocked = set(deadends)
        if '0000' in blocked:
            return -1
        queue = deque([('0000', 0)])
        blocked.add('0000')
        while queue:
            state, turns = queue.popleft()
            if state == target:
                return turns
            for next_state in self._neighbors(state):
                if next_state not in blocked:
                    blocked.add(next_state)
                    queue.append((next_state, turns + 1))
        return -1

    def _neighbors(self, state):
        for wheel in range(4):
            for delta in (-1, 1):
                digit = (int(state[wheel]) + delta) % 10
                yield state[:wheel] + str(digit) + state[wheel + 1:]
