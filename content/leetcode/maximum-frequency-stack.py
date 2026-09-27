from collections import Counter,defaultdict
class FreqStack:
    def __init__(self):self.counts=Counter();self.groups=defaultdict(list);self.maximum=0
    def push(self,val):
        self.counts[val]+=1;f=self.counts[val];self.groups[f].append(val);self.maximum=max(self.maximum,f)
    def pop(self):
        val=self.groups[self.maximum].pop();self.counts[val]-=1
        if not self.groups[self.maximum]:self.maximum-=1
        return val
