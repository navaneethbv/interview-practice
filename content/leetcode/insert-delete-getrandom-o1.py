import random
class RandomizedSet:
    def __init__(self):
        self.values=[];self.index={};self.random=random.Random(0)
    def insert(self,val):
        if val in self.index:return False
        self.index[val]=len(self.values);self.values.append(val);return True
    def remove(self,val):
        if val not in self.index:return False
        i=self.index.pop(val);last=self.values.pop()
        if i<len(self.values):self.values[i]=last;self.index[last]=i
        return True
    def getRandom(self):return self.random.choice(self.values)
