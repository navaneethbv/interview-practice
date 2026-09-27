class Solution {
public int numDistinct(String s,String t){long[]dp=new long[t.length()+1];dp[0]=1;for(char c:s.toCharArray())for(int j=t.length()-1;j>=0;j--)if(c==t.charAt(j))dp[j+1]=Math.min(Integer.MAX_VALUE,dp[j+1]+dp[j]);return (int)dp[t.length()];}
}
