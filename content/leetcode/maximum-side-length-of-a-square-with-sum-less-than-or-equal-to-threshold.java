class Solution {
public int maxSideLength(int[][] mat,int threshold) {int rows=mat.length,cols=mat[0].length;int[][] p=new int[rows+1][cols+1];for(int r=0;r<rows;r++) for(int c=0;c<cols;c++) p[r+1][c+1]=mat[r][c]+p[r][c+1]+p[r+1][c]-p[r][c];int l=0,right=Math.min(rows,cols);while(l<right) {int size=(l+right+1)/2;boolean valid=false;for(int r=0;r+size<=rows&&!valid;r++) for(int c=0;c+size<=cols;c++) if(p[r+size][c+size]-p[r][c+size]-p[r+size][c]+p[r][c]<=threshold) {valid=true;break;}if(valid) l=size;else right=size-1;}return l;}
}
