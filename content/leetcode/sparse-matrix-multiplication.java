class Solution {
    public int[][] multiply(int[][] mat1,int[][] mat2){int[][] out=new int[mat1.length][mat2[0].length];for(int i=0;i<mat1.length;i++)for(int k=0;k<mat2.length;k++)if(mat1[i][k]!=0)for(int j=0;j<mat2[0].length;j++)if(mat2[k][j]!=0)out[i][j]+=mat1[i][k]*mat2[k][j];return out;}
}
