class Solution {
public int numMagicSquaresInside(int[][] grid) {int count=0;for(int r=0;r+2<grid.length;r++) for(int c=0;c+2<grid[0].length;c++) {boolean[] seen=new boolean[10];boolean ok=true;for(int i=0;i<3;i++) for(int j=0;j<3;j++) {int v=grid[r+i][c+j];if(v<1||v>9||seen[v]) ok=false;else seen[v]=true;}for(int i=0;i<3;i++) {int row=0,col=0;for(int j=0;j<3;j++) {row+=grid[r+i][c+j];col+=grid[r+j][c+i];}if(row!=15||col!=15) ok=false;}if(grid[r][c]+grid[r+1][c+1]+grid[r+2][c+2]!=15||grid[r][c+2]+grid[r+1][c+1]+grid[r+2][c]!=15) ok=false;if(ok) count++;}return count;}
}
