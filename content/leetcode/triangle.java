class Solution {
public int minimumTotal(List<List<Integer>> triangle){int n=triangle.size();int[]dp=new int[n+1];for(int r=n-1;r>=0;r--)for(int i=0;i<=r;i++)dp[i]=triangle.get(r).get(i)+Math.min(dp[i],dp[i+1]);return dp[0];}
}
