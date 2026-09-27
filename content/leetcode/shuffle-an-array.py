import random
class Solution:
    def __init__(self, nums): self.original=list(nums); self.rng=random.Random(429)
    def reset(self): return list(self.original)
    def shuffle(self):
        values=list(self.original)
        for i in range(len(values)-1,0,-1):
            j=self.rng.randrange(i+1); values[i],values[j]=values[j],values[i]
        return values
