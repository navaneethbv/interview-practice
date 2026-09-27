class Solution {
public int maxAreaOfIsland(int[][] grid){int best=0,m=grid.length,n=grid[0].length;int[] ds={-1,0,1,0,-1};for(int r=0;r<m;r++)for(int c=0;c<n;c++)if(grid[r][c]==1){Deque<int[]> q=new ArrayDeque<>();q.add(new int[]{r,c});grid[r][c]=0;int area=0;while(!q.isEmpty()){int[] p=q.remove();area++;for(int d=0;d<4;d++){int a=p[0]+ds[d],b=p[1]+ds[d+1];if(a>=0&&a<m&&b>=0&&b<n&&grid[a][b]==1){grid[a][b]=0;q.add(new int[]{a,b});}}}best=Math.max(best,area);}return best;}
}
