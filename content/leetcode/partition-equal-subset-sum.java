class Solution {
public boolean canPartition(int[] nums){int sum=Arrays.stream(nums).sum();if(sum%2!=0)return false;boolean[]dp=new boolean[sum/2+1];dp[0]=true;for(int x:nums)for(int j=dp.length-1;j>=x;j--)dp[j]|=dp[j-x];return dp[sum/2];}
}
