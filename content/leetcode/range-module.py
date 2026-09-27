class RangeModule:
    def __init__(self):self.ranges=[]
    def addRange(self,left,right):
        out=[]
        for a,b in self.ranges:
            if b<left:out.append((a,b))
            elif a>right:out.append((left,right));left,right=a,b
            else:left=min(left,a);right=max(right,b)
        out.append((left,right));self.ranges=out
    def queryRange(self,left,right):return any(a<=left and right<=b for a,b in self.ranges)
    def removeRange(self,left,right):
        out=[]
        for a,b in self.ranges:
            if b<=left or a>=right:out.append((a,b))
            else:
                if a<left:out.append((a,left))
                if b>right:out.append((right,b))
        self.ranges=out
