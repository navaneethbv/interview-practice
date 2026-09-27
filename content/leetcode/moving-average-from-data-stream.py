from collections import deque
class MovingAverage:
    def __init__(self, size): self.size,self.queue,self.total=size,deque(),0
    def next(self, val):
        self.queue.append(val); self.total+=val
        if len(self.queue)>self.size: self.total-=self.queue.popleft()
        return self.total/len(self.queue)
