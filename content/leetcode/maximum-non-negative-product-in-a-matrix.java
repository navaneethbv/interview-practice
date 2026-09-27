class Solution {
public int maxProductPath(int[][] grid){int m=grid.length,n=grid[0].length;long[][]lo=new long[m][n],hi=new long[m][n];for(int r=0;r<m;r++)for(int c=0;c<n;c++){long v=grid[r][c];if(r==0&&c==0){lo[r][c]=hi[r][c]=v;continue;}long low=Long.MAX_VALUE,high=Long.MIN_VALUE;if(r>0){low=Math.min(v*lo[r-1][c],v*hi[r-1][c]);high=Math.max(v*lo[r-1][c],v*hi[r-1][c]);}if(c>0){low=Math.min(low,Math.min(v*lo[r][c-1],v*hi[r][c-1]));high=Math.max(high,Math.max(v*lo[r][c-1],v*hi[r][c-1]));}lo[r][c]=low;hi[r][c]=high;}return hi[m-1][n-1]<0?-1:(int)(hi[m-1][n-1]%1000000007);}
}
