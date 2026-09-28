import heapq

class TaskManager:

    def __init__(self, tasks):
        self.tasks = {}
        self.heap = []
        for u, t, p in tasks:
            self.add(u, t, p)

    def add(self, userId, taskId, priority):
        self.tasks[taskId] = (userId, priority)
        heapq.heappush(self.heap, (-priority, -taskId, userId))

    def edit(self, taskId, newPriority):
        self.add(self.tasks[taskId][0], taskId, newPriority)

    def rmv(self, taskId):
        del self.tasks[taskId]

    def execTop(self):
        while self.heap:
            p, t, u = heapq.heappop(self.heap)
            t = -t
            p = -p
            if self.tasks.get(t) == (u, p):
                del self.tasks[t]
                return u
        return -1
