from collections import defaultdict,OrderedDict
class LFUCache:
    def __init__(self,capacity):self.capacity=capacity;self.values={};self.freq={};self.groups=defaultdict(OrderedDict);self.minimum=0
    def _touch(self,key):
        f=self.freq[key];del self.groups[f][key]
        if f==self.minimum and not self.groups[f]:self.minimum+=1
        self.freq[key]=f+1;self.groups[f+1][key]=None
    def get(self,key):
        if key not in self.values:return -1
        self._touch(key);return self.values[key]
    def put(self,key,value):
        if self.capacity==0:return
        if key in self.values:self.values[key]=value;self._touch(key);return
        if len(self.values)==self.capacity:
            old,_=self.groups[self.minimum].popitem(last=False);del self.values[old];del self.freq[old]
        self.values[key]=value;self.freq[key]=1;self.groups[1][key]=None;self.minimum=1
