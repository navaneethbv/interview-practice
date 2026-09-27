class Allocator:
    def __init__(self, n):
        self.memory = [0] * n

    def allocate(self, size, mID):
        free_run = 0
        for index, value in enumerate(self.memory):
            if value == 0:
                free_run += 1
            else:
                free_run = 0
            if free_run == size:
                start = index - size + 1
                self.memory[start:index + 1] = [mID] * size
                return start
        return -1

    def freeMemory(self, mID):
        freed = 0
        for index, value in enumerate(self.memory):
            if value == mID:
                self.memory[index] = 0
                freed += 1
        return freed
