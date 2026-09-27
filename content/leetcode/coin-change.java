class Solution {
public int coinChange(int[] coins,int amount){int[] dp=new int[amount+1];Arrays.fill(dp,amount+1);dp[0]=0;for(int v=1;v<=amount;v++)for(int c:coins)if(c<=v)dp[v]=Math.min(dp[v],dp[v-c]+1);return dp[amount]<=amount?dp[amount]:-1;}
}
