class Solution:
    def isRobotBounded(self,instructions):
        x=y=d=0;directions=[(0,1),(1,0),(0,-1),(-1,0)]
        for c in instructions:
            if c=='L':d=(d-1)%4
            elif c=='R':d=(d+1)%4
            else:dx,dy=directions[d];x+=dx;y+=dy
        return (x,y)==(0,0) or d!=0
