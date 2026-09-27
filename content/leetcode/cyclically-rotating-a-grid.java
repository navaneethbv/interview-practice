class Solution {
public int[][] rotateGrid(int[][] grid,int k){int m=grid.length,n=grid[0].length;int[][] out=new int[m][n];for(int d=0;d<Math.min(m,n)/2;d++){List<int[]> p=new ArrayList<>();for(int j=d;j<n-d;j++)p.add(new int[]{d,j});for(int i=d+1;i<m-d;i++)p.add(new int[]{i,n-d-1});for(int j=n-d-2;j>=d;j--)p.add(new int[]{m-d-1,j});for(int i=m-d-2;i>d;i--)p.add(new int[]{i,d});for(int t=0;t<p.size();t++){int[] a=p.get(t),b=p.get((int)(((long)t+k)%p.size()));out[a[0]][a[1]]=grid[b[0]][b[1]];}}return out;}
}
