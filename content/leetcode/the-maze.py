class Solution:
    def hasPath(self,maze,start,destination):
        m,n=len(maze),len(maze[0]);stack=[tuple(start)];seen={tuple(start)}
        while stack:
            r,c=stack.pop()
            if [r,c]==destination:return True
            for dr,dc in [(1,0),(-1,0),(0,1),(0,-1)]:
                a,b=r,c
                while 0<=a+dr<m and 0<=b+dc<n and maze[a+dr][b+dc]==0:a+=dr;b+=dc
                if (a,b) not in seen:seen.add((a,b));stack.append((a,b))
        return False
