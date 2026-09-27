class Solution {
public int change(int amount,int[] coins){long[]dp=new long[amount+1];dp[0]=1;for(int c:coins)for(int v=c;v<=amount;v++)dp[v]=Math.min(Integer.MAX_VALUE,dp[v]+dp[v-c]);return (int)dp[amount];}
}
