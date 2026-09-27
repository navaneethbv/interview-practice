class Solution:
    def robotSim(self,commands,obstacles):
        blocked={tuple(p) for p in obstacles};directions=[(0,1),(1,0),(0,-1),(-1,0)];d=x=y=best=0
        for command in commands:
            if command==-2:d=(d-1)%4
            elif command==-1:d=(d+1)%4
            else:
                dx,dy=directions[d]
                for _ in range(command):
                    if (x+dx,y+dy) in blocked:break
                    x+=dx;y+=dy;best=max(best,x*x+y*y)
        return best
