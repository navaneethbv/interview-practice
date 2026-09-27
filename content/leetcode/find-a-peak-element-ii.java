class Solution {
public int[] findPeakGrid(int[][] mat) {int l=0,r=mat[0].length-1;while(l<=r) {int c=(l+r)/2,row=0;for(int i=1;i<mat.length;i++) if(mat[i][c]>mat[row][c]) row=i;if(c>0&&mat[row][c-1]>mat[row][c]) r=c-1;else if(c+1<mat[0].length&&mat[row][c+1]>mat[row][c]) l=c+1;else return new int[]{row,c};}throw new IllegalStateException();}
}
