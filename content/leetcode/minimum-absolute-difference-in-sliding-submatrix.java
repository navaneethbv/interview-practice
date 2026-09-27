class Solution {
public int[][] minAbsDiff(int[][] grid,int k){int m=grid.length-k+1,n=grid[0].length-k+1;int[][] a=new int[m][n];for(int i=0;i<m;i++)for(int j=0;j<n;j++){TreeSet<Integer> s=new TreeSet<>();for(int r=i;r<i+k;r++)for(int c=j;c<j+k;c++)s.add(grid[r][c]);Integer prev=null;int best=Integer.MAX_VALUE;for(int v:s){if(prev!=null)best=Math.min(best,v-prev);prev=v;}a[i][j]=best==Integer.MAX_VALUE?0:best;}return a;}
}
