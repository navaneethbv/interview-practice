class Solution {
public int getFood(char[][] grid){int m=grid.length,n=grid[0].length;Deque<int[]>q=new ArrayDeque<>();boolean[][]seen=new boolean[m][n];for(int r=0;r<m;r++)for(int c=0;c<n;c++)if(grid[r][c]=='*'){q.add(new int[]{r,c,0});seen[r][c]=true;}int[]ds={-1,0,1,0,-1};while(!q.isEmpty()){int[]p=q.remove();if(grid[p[0]][p[1]]=='#')return p[2];for(int d=0;d<4;d++){int a=p[0]+ds[d],b=p[1]+ds[d+1];if(a>=0&&a<m&&b>=0&&b<n&&!seen[a][b]&&grid[a][b]!='X'){seen[a][b]=true;q.add(new int[]{a,b,p[2]+1});}}}return -1;}
}
