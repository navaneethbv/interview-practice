from bisect import insort
class ExamRoom:
    def __init__(self,n):self.n=n;self.used=[]
    def seat(self):
        if not self.used:best=0
        else:
            best=0;distance=self.used[0]
            for a,b in zip(self.used,self.used[1:]):
                if (b-a)//2>distance:distance=(b-a)//2;best=(a+b)//2
            if self.n-1-self.used[-1]>distance:best=self.n-1
        insort(self.used,best);return best
    def leave(self,p):self.used.remove(p)
