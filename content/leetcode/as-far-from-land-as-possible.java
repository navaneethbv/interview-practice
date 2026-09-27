class Solution {
public int maxDistance(int[][] grid){int n=grid.length;boolean[][]seen=new boolean[n][n];Deque<int[]>q=new ArrayDeque<>();for(int r=0;r<n;r++)for(int c=0;c<n;c++)if(grid[r][c]==1){seen[r][c]=true;q.add(new int[]{r,c});}if(q.isEmpty()||q.size()==n*n)return -1;int distance=-1;int[]ds={-1,0,1,0,-1};while(!q.isEmpty()){distance++;for(int size=q.size();size>0;size--){int[]p=q.remove();for(int d=0;d<4;d++){int a=p[0]+ds[d],b=p[1]+ds[d+1];if(a>=0&&a<n&&b>=0&&b<n&&!seen[a][b]){seen[a][b]=true;q.add(new int[]{a,b});}}}}return distance;}
}
