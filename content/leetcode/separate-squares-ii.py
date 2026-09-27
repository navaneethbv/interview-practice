class _CoverTree:
    """Covered length of the x-axis under a multiset of intervals between compressed coordinates."""
    def __init__(self, xs):
        self.xs=xs; self.size=len(xs)-1; self.covers=[0]*(4*self.size); self.length=[0]*(4*self.size)

    def update(self, node, left, right, start, end, delta):
        if start<=left and right<=end: self.covers[node]+=delta
        else:
            middle=(left+right)//2
            if start<=middle: self.update(node*2,left,middle,start,end,delta)
            if end>middle: self.update(node*2+1,middle+1,right,start,end,delta)
        self._pull(node,left,right)

    def _pull(self, node, left, right):
        if self.covers[node]: self.length[node]=self.xs[right+1]-self.xs[left]
        elif left==right: self.length[node]=0
        else: self.length[node]=self.length[node*2]+self.length[node*2+1]

class Solution:
    def separateSquares(self, squares):
        xs=sorted({coordinate for x,y,side in squares for coordinate in (x,x+side)}); indexes={x:i for i,x in enumerate(xs)}
        events=sorted((y+offset,delta,indexes[x],indexes[x+side]-1) for x,y,side in squares for offset,delta in ((0,1),(side,-1)))
        strips,total=self._strips(events,_CoverTree(xs))
        return self._halfway(strips,total,events[-1][0])

    def _strips(self, events, tree):
        """Sweeps upward, returning horizontal strips of constant covered width and the union area."""
        previous=events[0][0]; total=0; strips=[]
        for y,delta,left,right in events:
            if y>previous:
                width=tree.length[1]; strips.append((previous,y,width)); total+=(y-previous)*width; previous=y
            tree.update(1,0,tree.size-1,left,right,delta)
        return strips,total

    def _halfway(self, strips, total, top):
        accumulated=0
        for bottom,upper,width in strips:
            area=(upper-bottom)*width
            if 2*(accumulated+area)>=total:
                if 2*accumulated==total: return float(bottom)
                return bottom+(total/2-accumulated)/width
            accumulated+=area
        return float(top)
