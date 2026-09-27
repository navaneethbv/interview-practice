class Solution {
public int maximumAmount(int[][] coins){int m=coins.length,n=coins[0].length,neg=-1000000000;int[][][] d=new int[m][n][3];for(int[][] row:d)for(int[] cell:row)Arrays.fill(cell,neg);for(int i=0;i<m;i++)for(int j=0;j<n;j++)for(int u=0;u<3;u++){int p=i==0&&j==0&&u==0?0:Math.max(i>0?d[i-1][j][u]:neg,j>0?d[i][j-1][u]:neg);d[i][j][u]=Math.max(d[i][j][u],p+coins[i][j]);if(coins[i][j]<0&&u<2)d[i][j][u+1]=Math.max(d[i][j][u+1],p);}return Arrays.stream(d[m-1][n-1]).max().getAsInt();}
}
