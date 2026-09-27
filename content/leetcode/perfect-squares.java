class Solution {
public int numSquares(int n){int[]dp=new int[n+1];Arrays.fill(dp,n);dp[0]=0;for(int value=1;value<=n;value++)for(int j=1;j*j<=value;j++)dp[value]=Math.min(dp[value],1+dp[value-j*j]);return dp[n];}
}
