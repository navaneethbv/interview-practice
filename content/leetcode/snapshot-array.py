from bisect import bisect_right
class SnapshotArray:
    def __init__(self,length):self.history=[[(0,0)] for _ in range(length)];self.version=0
    def set(self,index,val):
        h=self.history[index]
        if h[-1][0]==self.version:h[-1]=(self.version,val)
        else:h.append((self.version,val))
    def snap(self):self.version+=1;return self.version-1
    def get(self,index,snap_id):
        h=self.history[index];return h[bisect_right(h,(snap_id,float('inf')))-1][1]
