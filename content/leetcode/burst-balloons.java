class Solution {
public int maxCoins(int[] nums){int n=nums.length+2;int[]v=new int[n];v[0]=v[n-1]=1;System.arraycopy(nums,0,v,1,nums.length);int[][]dp=new int[n][n];for(int gap=2;gap<n;gap++)for(int l=0;l+gap<n;l++){int r=l+gap;for(int k=l+1;k<r;k++)dp[l][r]=Math.max(dp[l][r],dp[l][k]+dp[k][r]+v[l]*v[k]*v[r]);}return dp[0][n-1];}
}
