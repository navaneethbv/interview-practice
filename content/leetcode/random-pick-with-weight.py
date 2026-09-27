import random,bisect,itertools
class Solution:
    def __init__(self,w):self.prefix=list(itertools.accumulate(w));self.random=random.Random(0)
    def pickIndex(self):return bisect.bisect_right(self.prefix,self.random.randrange(self.prefix[-1]))
