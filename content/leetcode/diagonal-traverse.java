class Solution {
public int[] findDiagonalOrder(int[][] mat){int m=mat.length,n=mat[0].length,k=0;int[]out=new int[m*n];for(int d=0;d<m+n-1;d++){int low=Math.max(0,d-n+1),high=Math.min(m-1,d);if(d%2==0)for(int r=high;r>=low;r--)out[k++]=mat[r][d-r];else for(int r=low;r<=high;r++)out[k++]=mat[r][d-r];}return out;}
}
