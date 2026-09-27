class Solution:
    def separateSquares(self, squares):
        xs=sorted({coordinate for x,y,side in squares for coordinate in (x,x+side)}); indexes={x:i for i,x in enumerate(xs)}
        size=len(xs)-1; covers=[0]*(4*size); length=[0]*(4*size)
        def update(node,left,right,start,end,delta):
            if start<=left and right<=end: covers[node]+=delta
            else:
                middle=(left+right)//2
                if start<=middle: update(node*2,left,middle,start,end,delta)
                if end>middle: update(node*2+1,middle+1,right,start,end,delta)
            if covers[node]: length[node]=xs[right+1]-xs[left]
            elif left==right: length[node]=0
            else: length[node]=length[node*2]+length[node*2+1]
        events=sorted((y+offset,delta,indexes[x],indexes[x+side]-1) for x,y,side in squares for offset,delta in ((0,1),(side,-1)))
        previous=events[0][0]; total=0; strips=[]
        for y,delta,left,right in events:
            if y>previous:
                width=length[1]; strips.append((previous,y,width)); total+=(y-previous)*width; previous=y
            update(1,0,size-1,left,right,delta)
        accumulated=0
        for bottom,top,width in strips:
            area=(top-bottom)*width
            if 2*(accumulated+area)>=total:
                if 2*accumulated==total: return float(bottom)
                return bottom+(total/2-accumulated)/width
            accumulated+=area
        return float(events[-1][0])
