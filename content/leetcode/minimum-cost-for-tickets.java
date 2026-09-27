class Solution {
public int mincostTickets(int[] days,int[] costs) {boolean[] travel=new boolean[366];for(int d:days) travel[d]=true;int[] dp=new int[366];int[] lengths={1,7,30};for(int d=1;d<=365;d++) {dp[d]=dp[d-1];if(travel[d]) {dp[d]=Integer.MAX_VALUE;for(int i=0;i<3;i++) dp[d]=Math.min(dp[d],dp[Math.max(0,d-lengths[i])]+costs[i]);}}return dp[365];}
}
