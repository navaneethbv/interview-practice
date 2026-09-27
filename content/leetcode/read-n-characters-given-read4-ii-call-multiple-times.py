from collections import deque
class Solution:
    def __init__(self):self.pending=deque()
    def read(self,buf,n):
        count=0
        while count<n:
            if not self.pending:
                block=['']*4
                got=read4(block)
                self.pending.extend(block[:got])
                if not got:break
            buf[count]=self.pending.popleft();count+=1
        return count
