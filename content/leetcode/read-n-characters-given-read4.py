class Solution:
    def read(self, buf, n):
        copied=0
        while copied<n:
            block=['']*4
            count=read4(block)
            for i in range(min(count,n-copied)):
                buf[copied]=block[i];copied+=1
            if count<4: break
        return copied
