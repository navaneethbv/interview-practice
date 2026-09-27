from collections import Counter,deque
class FirstUnique:
 def __init__(self,nums):self.count=Counter(nums);self.queue=deque(nums)
 def showFirstUnique(self):
  while self.queue and self.count[self.queue[0]]!=1:self.queue.popleft()
  return self.queue[0] if self.queue else -1
 def add(self,value):self.count[value]+=1;self.queue.append(value)
