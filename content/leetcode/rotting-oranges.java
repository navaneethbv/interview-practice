class Solution {
public int orangesRotting(int[][] grid){int m=grid.length,n=grid[0].length,fresh=0,time=0;Deque<int[]>q=new ArrayDeque<>();for(int r=0;r<m;r++)for(int c=0;c<n;c++){if(grid[r][c]==1)fresh++;if(grid[r][c]==2)q.add(new int[]{r,c,0});}int[]ds={-1,0,1,0,-1};while(!q.isEmpty()){int[]p=q.remove();time=p[2];for(int d=0;d<4;d++){int a=p[0]+ds[d],b=p[1]+ds[d+1];if(a>=0&&a<m&&b>=0&&b<n&&grid[a][b]==1){grid[a][b]=2;fresh--;q.add(new int[]{a,b,time+1});}}}return fresh==0?time:-1;}
}
