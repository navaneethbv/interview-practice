class Solution {
public boolean findRotation(int[][] mat,int[][] target){int n=mat.length;for(int r=0;r<4;r++){if(Arrays.deepEquals(mat,target))return true;int[][] b=new int[n][n];for(int i=0;i<n;i++)for(int j=0;j<n;j++)b[j][n-i-1]=mat[i][j];mat=b;}return false;}
}
