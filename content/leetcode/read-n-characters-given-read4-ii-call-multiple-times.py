from collections import deque
class Solution:
    def __init__(self):
        self.pending = deque()

    def read(self, buf, n):
        copied = 0
        while copied < n:
            if not self.pending:
                block = [''] * 4
                count = read4(block)
                self.pending.extend(block[:count])
                if count == 0:
                    break
            buf[copied] = self.pending.popleft()
            copied += 1
        return copied
