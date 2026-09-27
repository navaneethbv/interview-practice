class Solution {
public int shortestPath(int[][] grid,int k){int m=grid.length,n=grid[0].length;int[][]best=new int[m][n];for(int[]row:best)Arrays.fill(row,-1);best[0][0]=k;Deque<int[]>q=new ArrayDeque<>();q.add(new int[]{0,0,k,0});int[]ds={-1,0,1,0,-1};while(!q.isEmpty()){int[]p=q.remove();if(p[0]==m-1&&p[1]==n-1)return p[3];for(int d=0;d<4;d++){int a=p[0]+ds[d],b=p[1]+ds[d+1];if(a>=0&&a<m&&b>=0&&b<n){int left=p[2]-grid[a][b];if(left>=0&&left>best[a][b]){best[a][b]=left;q.add(new int[]{a,b,left,p[3]+1});}}}}return -1;}
}
