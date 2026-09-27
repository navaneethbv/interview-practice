class Solution {
public int minPathSum(int[][] grid){int[]dp=new int[grid[0].length];Arrays.fill(dp,1000000000);dp[0]=0;for(int[]row:grid)for(int c=0;c<row.length;c++)dp[c]=row[c]+Math.min(dp[c],c>0?dp[c-1]:1000000000);return dp[dp.length-1];}
}
