class Solution {
public int[][] constructProductMatrix(int[][] grid){int m=grid.length,n=grid[0].length;int[][] a=new int[m][n];long p=1;for(int i=0;i<m*n;i++){int r=i/n,c=i%n;a[r][c]=(int)p;p=p*grid[r][c]%12345;}p=1;for(int i=m*n-1;i>=0;i--){int r=i/n,c=i%n;a[r][c]=(int)(a[r][c]*p%12345);p=p*grid[r][c]%12345;}return a;}
}
