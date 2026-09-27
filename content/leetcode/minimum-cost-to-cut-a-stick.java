class Solution {
public int minCost(int n,int[] cuts){Arrays.sort(cuts);int m=cuts.length+2;int[]p=new int[m];System.arraycopy(cuts,0,p,1,cuts.length);p[m-1]=n;int[][]dp=new int[m][m];for(int gap=2;gap<m;gap++)for(int l=0;l+gap<m;l++){int r=l+gap;dp[l][r]=Integer.MAX_VALUE;for(int k=l+1;k<r;k++)dp[l][r]=Math.min(dp[l][r],p[r]-p[l]+dp[l][k]+dp[k][r]);}return dp[0][m-1];}
}
