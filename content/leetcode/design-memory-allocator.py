class Allocator:
    def __init__(self,n):self.memory=[0]*n
    def allocate(self,size,mID):
        run=0
        for i,value in enumerate(self.memory):
            run=run+1 if value==0 else 0
            if run==size:
                start=i-size+1;self.memory[start:i+1]=[mID]*size;return start
        return -1
    def freeMemory(self,mID):
        count=0
        for i,value in enumerate(self.memory):
            if value==mID:self.memory[i]=0;count+=1
        return count
