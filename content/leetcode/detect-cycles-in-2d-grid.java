class Solution {
public boolean containsCycle(char[][] grid){int m=grid.length,n=grid[0].length;boolean[][]seen=new boolean[m][n];int[]ds={-1,0,1,0,-1};for(int r=0;r<m;r++)for(int c=0;c<n;c++)if(!seen[r][c]){Deque<int[]>q=new ArrayDeque<>();q.add(new int[]{r,c,-1,-1});seen[r][c]=true;while(!q.isEmpty()){int[]p=q.remove();for(int d=0;d<4;d++){int a=p[0]+ds[d],b=p[1]+ds[d+1];if(a>=0&&a<m&&b>=0&&b<n&&grid[a][b]==grid[p[0]][p[1]]&&(a!=p[2]||b!=p[3])){if(seen[a][b])return true;seen[a][b]=true;q.add(new int[]{a,b,p[0],p[1]});}}}}return false;}
}
