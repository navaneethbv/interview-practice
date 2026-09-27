class Solution {
public int swimInWater(int[][] grid){int n=grid.length;boolean[][]seen=new boolean[n][n];PriorityQueue<int[]>q=new PriorityQueue<>(Comparator.comparingInt(a->a[0]));q.add(new int[]{grid[0][0],0,0});int[]ds={-1,0,1,0,-1};while(!q.isEmpty()){int[]p=q.remove();int t=p[0],r=p[1],c=p[2];if(seen[r][c])continue;seen[r][c]=true;if(r==n-1&&c==n-1)return t;for(int d=0;d<4;d++){int a=r+ds[d],b=c+ds[d+1];if(a>=0&&a<n&&b>=0&&b<n&&!seen[a][b])q.add(new int[]{Math.max(t,grid[a][b]),a,b});}}return -1;}
}
